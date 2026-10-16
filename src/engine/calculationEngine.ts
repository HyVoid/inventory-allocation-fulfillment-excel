/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OFIAState,
  UnifiedSupplyEntry,
  AllocationEngineRow,
  EchelonAllocationDetail,
  ProcurementSummaryRow,
  AuditIssue,
  SalesDemand,
} from '../types/ofia.ts';

// Helper date utilities
export function addDays(dateStr: string, days: number): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
}

export function diffDays(dateA: string, dateB: string): number {
  try {
    const a = new Date(dateA).getTime();
    const b = new Date(dateB).getTime();
    if (isNaN(a) || isNaN(b)) return 0;
    return Math.round((a - b) / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

export function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Step 1: Calculate Unified Supply Ledger (Sheet 08)
 */
export function computeUnifiedSupplyLedger(state: OFIAState): UnifiedSupplyEntry[] {
  const { config, inventory, pos, inTransit, reservations } = state;
  const entries: UnifiedSupplyEntry[] = [];
  const today = getTodayStr();

  // 1. QOH Physical Inventory
  for (const inv of inventory) {
    const effectiveProtected = (inv.minSafetyStock * config.safetyStockProtectRatio) + (inv.fmdReserveQty * config.fmdProtectEnabled);
    const netTransferable = Math.max(0, inv.physicalQOH - inv.systemCommittedQty - effectiveProtected);
    if (netTransferable > 0 || inv.physicalQOH > 0) {
      const supplyUid = `QOH|${inv.locationCode}|${inv.skuCode}`;
      entries.push({
        supplyUid,
        supplyType: 'QOH',
        supplyLocation: inv.locationCode,
        skuCode: inv.skuCode,
        supplyReadyDate: today,
        grossAvailableQty: netTransferable,
        activeReservedQty: 0, // Computed below
        netAvailableForAlloc: netTransferable,
        healthStatus: 'Adequate',
      });
    }
  }

  // 2. OTW Maritime In-Transit
  for (const otw of inTransit) {
    if (otw.inTransitQty > 0) {
      const readyDate = addDays(otw.portETA, config.customsPortBufferDays);
      const supplyUid = `OTW|${otw.containerId}|${otw.skuCode}`;
      entries.push({
        supplyUid,
        supplyType: 'OTW',
        supplyLocation: otw.destLocation,
        skuCode: otw.skuCode,
        supplyReadyDate: readyDate,
        grossAvailableQty: otw.inTransitQty,
        activeReservedQty: 0,
        netAvailableForAlloc: otw.inTransitQty,
        healthStatus: 'Adequate',
      });
    }
  }

  // 3. PO Pipeline (Deduplicated with linked OTW!)
  for (const po of pos) {
    // Sum in-transit quantities linked to this PO line
    const linkedOTWQty = inTransit
      .filter((o) => o.refPoNumber === po.poNumber && o.refPoLineId === po.poLineId)
      .reduce((sum, o) => sum + o.inTransitQty, 0);

    const netPendingMfg = Math.max(0, po.poOpenQty - linkedOTWQty);
    if (netPendingMfg > 0) {
      const supplyUid = `PO|${po.poNumber}|${po.poLineId}|${po.skuCode}`;
      entries.push({
        supplyUid,
        supplyType: 'PO',
        supplyLocation: po.poDestLocation,
        skuCode: po.skuCode,
        supplyReadyDate: po.poPromisedDate,
        grossAvailableQty: netPendingMfg,
        activeReservedQty: 0,
        netAvailableForAlloc: netPendingMfg,
        healthStatus: 'Adequate',
      });
    }
  }

  // Calculate active reservations against each supply UID
  for (const entry of entries) {
    const activeReserved = reservations
      .filter((r) => r.assignedSupplyUid === entry.supplyUid && r.reservationStatus === 'Active')
      .reduce((sum, r) => sum + r.reservedQty, 0);

    entry.activeReservedQty = activeReserved;
    entry.netAvailableForAlloc = Math.max(0, entry.grossAvailableQty - activeReserved);

    if (activeReserved > entry.grossAvailableQty) {
      entry.healthStatus = 'Over-Allocated';
    } else if (entry.netAvailableForAlloc === 0) {
      entry.healthStatus = 'Fully Committed';
    } else {
      entry.healthStatus = 'Adequate';
    }
  }

  return entries;
}

/**
 * Step 2: Calculate Multi-Echelon Allocation Engine (Sheet 10 & 11)
 */
export function computeAllocationEngine(state: OFIAState, supplyLedger: UnifiedSupplyEntry[]): AllocationEngineRow[] {
  const { config, items, locations, demands } = state;
  const itemMap = new Map(items.map((i) => [i.skuCode, i]));

  // Create a mutable copy of supply ledger balances to simulate cascade allocation across demands
  const mutableSupplyPool = supplyLedger.map((s) => ({
    ...s,
    availableRemaining: s.netAvailableForAlloc,
  }));

  const results: AllocationEngineRow[] = [];

  // Sort demands: Firm first, then by required delivery date
  const sortedDemands = [...demands].sort((a, b) => {
    if (a.demandType !== b.demandType) {
      return a.demandType === 'Firm' ? -1 : 1;
    }
    return a.reqDeliveryDate.localeCompare(b.reqDeliveryDate);
  });

  for (const demand of sortedDemands) {
    const isActiveDemand = demand.demandType === 'Firm' || config.quoteReservationEnabled;
    const item = itemMap.get(demand.skuCode);
    const masterPack = item ? item.masterPackQty : 1;

    let unmetQty = demand.reqQty;
    const details: EchelonAllocationDetail[] = [];

    let echelon1_LocalQty = 0;
    let echelon1_EstArrival = demand.reqDeliveryDate;

    let echelon2_NearestQty = 0;
    let echelon2_NearestLoc = '';
    let echelon2_EstArrival = '';

    let echelon3_DCQty = 0;
    let echelon3_EstArrival = '';

    let echelon4_OTWQty = 0;
    let echelon4_RefContainer = '';
    let echelon4_EstArrival = '';

    let echelon5_POQty = 0;
    let echelon5_RefPO = '';
    let echelon5_EstArrival = '';

    // ECHELON 1: Local Store Physical QOH
    if (unmetQty > 0) {
      const localSupply = mutableSupplyPool.find(
        (s) => s.supplyType === 'QOH' && s.skuCode === demand.skuCode && s.supplyLocation === demand.shipToLocation
      );
      if (localSupply && localSupply.availableRemaining > 0) {
        const alloc = Math.min(unmetQty, localSupply.availableRemaining);
        echelon1_LocalQty = alloc;
        echelon1_EstArrival = demand.orderDate; // Available immediately at local
        unmetQty -= alloc;
        if (isActiveDemand) {
          localSupply.availableRemaining -= alloc;
        }
        details.push({
          echelon: 1,
          echelonName: 'Local Store',
          allocatedQty: alloc,
          supplyLocationOrRef: demand.shipToLocation,
          estArrivalDate: echelon1_EstArrival,
          leadDays: 0,
        });
      }
    }

    // ECHELON 2: Nearest Store Lateral Transfer (< max distance B8)
    if (unmetQty > 0) {
      // Find candidate stores
      const candidateStores = locations
        .filter(
          (loc) =>
            loc.destLocation === demand.shipToLocation &&
            loc.originLocation !== config.centralDCCode &&
            loc.distanceKM <= config.nearestStoreMaxDistanceKM
        )
        .sort((a, b) => a.distanceKM - b.distanceKM);

      for (const cand of candidateStores) {
        if (unmetQty <= 0) break;
        const neighborSupply = mutableSupplyPool.find(
          (s) => s.supplyType === 'QOH' && s.skuCode === demand.skuCode && s.supplyLocation === cand.originLocation
        );
        if (neighborSupply && neighborSupply.availableRemaining > 0) {
          const alloc = Math.min(unmetQty, neighborSupply.availableRemaining);
          echelon2_NearestQty += alloc;
          echelon2_NearestLoc = cand.originLocation;
          const leadDays = cand.transferTransitDays + config.transferHandlingBufferDays;
          echelon2_EstArrival = addDays(demand.orderDate, leadDays);
          unmetQty -= alloc;
          if (isActiveDemand) {
            neighborSupply.availableRemaining -= alloc;
          }
          details.push({
            echelon: 2,
            echelonName: 'Nearest Store',
            allocatedQty: alloc,
            supplyLocationOrRef: cand.originLocation,
            estArrivalDate: echelon2_EstArrival,
            leadDays,
          });
        }
      }
    }

    // ECHELON 3: Central Distribution Center (DC01)
    if (unmetQty > 0 && demand.shipToLocation !== config.centralDCCode) {
      const dcSupply = mutableSupplyPool.find(
        (s) => s.supplyType === 'QOH' && s.skuCode === demand.skuCode && s.supplyLocation === config.centralDCCode
      );
      if (dcSupply && dcSupply.availableRemaining > 0) {
        const alloc = Math.min(unmetQty, dcSupply.availableRemaining);
        echelon3_DCQty = alloc;
        // Lookup transit days from DC to destination
        const dcPair = locations.find(
          (l) => l.originLocation === config.centralDCCode && l.destLocation === demand.shipToLocation
        );
        const transit = dcPair ? dcPair.transferTransitDays : 3;
        const leadDays = transit + config.transferHandlingBufferDays;
        echelon3_EstArrival = addDays(demand.orderDate, leadDays);
        unmetQty -= alloc;
        if (isActiveDemand) {
          dcSupply.availableRemaining -= alloc;
        }
        details.push({
          echelon: 3,
          echelonName: 'Central DC',
          allocatedQty: alloc,
          supplyLocationOrRef: config.centralDCCode,
          estArrivalDate: echelon3_EstArrival,
          leadDays,
        });
      }
    }

    // ECHELON 4: Maritime In-Transit (OTW)
    if (unmetQty > 0) {
      const otwSupplies = mutableSupplyPool
        .filter((s) => s.supplyType === 'OTW' && s.skuCode === demand.skuCode && s.availableRemaining > 0)
        .sort((a, b) => a.supplyReadyDate.localeCompare(b.supplyReadyDate));

      for (const otw of otwSupplies) {
        if (unmetQty <= 0) break;
        const alloc = Math.min(unmetQty, otw.availableRemaining);
        echelon4_OTWQty += alloc;
        echelon4_RefContainer = otw.supplyUid.split('|')[1] || 'OTW';
        // Add DC to shipTo transit if destination is not DC
        const dcPair = locations.find(
          (l) => l.originLocation === config.centralDCCode && l.destLocation === demand.shipToLocation
        );
        const transitToStore = demand.shipToLocation === config.centralDCCode ? 0 : (dcPair ? dcPair.transferTransitDays + 1 : 3);
        echelon4_EstArrival = addDays(otw.supplyReadyDate, transitToStore);
        unmetQty -= alloc;
        if (isActiveDemand) {
          otw.availableRemaining -= alloc;
        }
        details.push({
          echelon: 4,
          echelonName: 'In-Transit OTW',
          allocatedQty: alloc,
          supplyLocationOrRef: echelon4_RefContainer,
          estArrivalDate: echelon4_EstArrival,
          leadDays: diffDays(echelon4_EstArrival, demand.orderDate),
        });
      }
    }

    // ECHELON 5: Open PO Pipeline
    if (unmetQty > 0) {
      const poSupplies = mutableSupplyPool
        .filter((s) => s.supplyType === 'PO' && s.skuCode === demand.skuCode && s.availableRemaining > 0)
        .sort((a, b) => a.supplyReadyDate.localeCompare(b.supplyReadyDate));

      for (const po of poSupplies) {
        if (unmetQty <= 0) break;
        const alloc = Math.min(unmetQty, po.availableRemaining);
        echelon5_POQty += alloc;
        echelon5_RefPO = po.supplyUid.split('|')[1] || 'PO';
        const dcPair = locations.find(
          (l) => l.originLocation === config.centralDCCode && l.destLocation === demand.shipToLocation
        );
        const transitToStore = demand.shipToLocation === config.centralDCCode ? 0 : (dcPair ? dcPair.transferTransitDays + 1 : 3);
        echelon5_EstArrival = addDays(po.supplyReadyDate, transitToStore);
        unmetQty -= alloc;
        if (isActiveDemand) {
          po.availableRemaining -= alloc;
        }
        details.push({
          echelon: 5,
          echelonName: 'Open PO',
          allocatedQty: alloc,
          supplyLocationOrRef: echelon5_RefPO,
          estArrivalDate: echelon5_EstArrival,
          leadDays: diffDays(echelon5_EstArrival, demand.orderDate),
        });
      }
    }

    const allocatedTotalQty = demand.reqQty - unmetQty;
    const unmetQtyGap = unmetQty;

    // Split order calculation: allocated from > 1 echelon or source
    const activeEchelonsCount = [echelon1_LocalQty, echelon2_NearestQty, echelon3_DCQty, echelon4_OTWQty, echelon5_POQty].filter(
      (q) => q > 0
    ).length;
    const isSplitOrder = activeEchelonsCount > 1;

    // Calculate max arrival date among allocated portions
    const dates = details.filter((d) => d.allocatedQty > 0).map((d) => d.estArrivalDate);
    const maxEstArrivalDate = dates.length > 0 ? dates.sort().reverse()[0] : demand.reqDeliveryDate;

    // Delivery delay days
    const delay = diffDays(maxEstArrivalDate, demand.reqDeliveryDate);
    const deliveryDelayDays = delay > 0 ? delay : 0;

    // Fulfillment status
    let fulfillmentStatus: AllocationEngineRow['fulfillmentStatus'] = 'Stockout';
    if (demand.demandType === 'Quote' && !config.quoteReservationEnabled) {
      fulfillmentStatus = 'Quote Pending';
    } else if (allocatedTotalQty >= demand.reqQty) {
      if (deliveryDelayDays === 0) {
        fulfillmentStatus = 'Fully Feasible';
      } else {
        fulfillmentStatus = 'Quantity Met But Late';
      }
    } else if (allocatedTotalQty > 0) {
      fulfillmentStatus = 'Partial Feasible';
    } else {
      fulfillmentStatus = 'Stockout';
    }

    // Primary supply source
    const echelonMap = [
      { name: 'Local Store (Local)', qty: echelon1_LocalQty },
      { name: 'Nearest Store (Nearest)', qty: echelon2_NearestQty },
      { name: 'Central DC (DC)', qty: echelon3_DCQty },
      { name: 'In-Transit Maritime (OTW)', qty: echelon4_OTWQty },
      { name: 'Purchase Orders (PO)', qty: echelon5_POQty },
    ];
    echelonMap.sort((a, b) => b.qty - a.qty);
    const primarySupplySource = allocatedTotalQty === 0 ? 'No Supply Available' : echelonMap[0].name;

    // Assigned Supply UID description
    let assignedSupplyUid = 'NONE';
    if (allocatedTotalQty > 0) {
      if (isSplitOrder) {
        assignedSupplyUid = 'MULTI-SOURCE-SPLIT';
      } else if (echelon1_LocalQty > 0) {
        assignedSupplyUid = `QOH|${demand.shipToLocation}|${demand.skuCode}`;
      } else if (echelon2_NearestQty > 0) {
        assignedSupplyUid = `QOH|${echelon2_NearestLoc}|${demand.skuCode}`;
      } else if (echelon3_DCQty > 0) {
        assignedSupplyUid = `QOH|${config.centralDCCode}|${demand.skuCode}`;
      } else if (echelon4_OTWQty > 0) {
        assignedSupplyUid = `OTW|${echelon4_RefContainer}|${demand.skuCode}`;
      } else if (echelon5_POQty > 0) {
        assignedSupplyUid = `PO|${echelon5_RefPO}|${demand.skuCode}`;
      }
    }

    // Action Recommendation
    let actionRecommendation = '';
    if (fulfillmentStatus === 'Quote Pending') {
      actionRecommendation = 'Quote follow-up: Simulation verified; awaiting client confirmation to lock inventory';
    } else if (fulfillmentStatus === 'Fully Feasible') {
      if (isSplitOrder) {
        actionRecommendation = 'Fully feasible via split: Dispatch local stock immediately and issue cross-dock transfer orders';
      } else {
        actionRecommendation = 'Fully feasible on-time: Create reservation record and confirm delivery schedule with client';
      }
    } else if (fulfillmentStatus === 'Quantity Met But Late') {
      actionRecommendation = `Late delivery alert: Notify sales to negotiate delivery schedule extension of ${deliveryDelayDays} day(s)`;
    } else if (fulfillmentStatus === 'Partial Feasible') {
      actionRecommendation = `Partial fill (${allocatedTotalQty}/${demand.reqQty}): Dispatch available tier and issue emergency procurement for gap`;
    } else {
      actionRecommendation = 'Critical stockout: Immediate replenishment purchase required or offer substitute materials';
    }

    results.push({
      demand,
      isActiveDemand,
      masterPack,
      echelon1_LocalQty,
      echelon1_EstArrival,
      echelon2_NearestQty,
      echelon2_NearestLoc,
      echelon2_EstArrival,
      echelon3_DCQty,
      echelon3_EstArrival,
      echelon4_OTWQty,
      echelon4_RefContainer,
      echelon4_EstArrival,
      echelon5_POQty,
      echelon5_RefPO,
      echelon5_EstArrival,
      allocatedTotalQty,
      unmetQtyGap,
      isSplitOrder,
      maxEstArrivalDate,
      deliveryDelayDays,
      fulfillmentStatus,
      primarySupplySource,
      assignedSupplyUid,
      actionRecommendation,
      details,
    });
  }

  return results;
}

/**
 * Step 3: Compute Clean Procurement Summary (Sheet 12)
 */
export function computeProcurementSummary(
  state: OFIAState,
  allocationResults: AllocationEngineRow[]
): ProcurementSummaryRow[] {
  const { config, items, vendors } = state;
  const itemMap = new Map(items.map((i) => [i.skuCode, i]));
  const vendorMap = new Map(vendors.map((v) => [v.vendorId, v]));

  // Find all rows with genuine shortages
  const shortageRows = allocationResults.filter((r) => r.unmetQtyGap > 0);
  if (shortageRows.length === 0) return [];

  // Group shortages by SKU and Deficit Location
  const groupMap = new Map<string, { sku: string; loc: string; totalGap: number; earliestReqDate: string }>();

  for (const row of shortageRows) {
    const key = `${row.demand.skuCode}|${row.demand.shipToLocation}`;
    const existing = groupMap.get(key);
    if (!existing) {
      groupMap.set(key, {
        sku: row.demand.skuCode,
        loc: row.demand.shipToLocation,
        totalGap: row.unmetQtyGap,
        earliestReqDate: row.demand.reqDeliveryDate,
      });
    } else {
      existing.totalGap += row.unmetQtyGap;
      if (row.demand.reqDeliveryDate < existing.earliestReqDate) {
        existing.earliestReqDate = row.demand.reqDeliveryDate;
      }
    }
  }

  const today = getTodayStr();
  const summary: ProcurementSummaryRow[] = [];

  for (const group of groupMap.values()) {
    const item = itemMap.get(group.sku);
    const itemName = item ? item.itemName : 'Unknown Item';
    const masterPackQty = item ? item.masterPackQty : 1;
    const vendorId = item ? item.defaultVendorId : 'V-101';
    const vendor = vendorMap.get(vendorId);
    const vendorName = vendor ? vendor.vendorName : 'Default Supplier';

    // Apply MOQ multiplier and Master Pack ceiling
    const rawTarget = group.totalGap * config.moqMultiplier;
    let recommendedPoQty = Math.ceil(rawTarget);
    if (config.masterPackCeilingEnabled && masterPackQty > 1) {
      recommendedPoQty = Math.ceil(rawTarget / masterPackQty) * masterPackQty;
    }

    // Lead times
    const mfgLead = vendor ? vendor.mfgLeadDays : 25;
    const shipLead = vendor ? vendor.shippingLeadDays : 20;
    const totalReplenishLead = mfgLead + shipLead + config.customsPortBufferDays;

    // Expected arrival if ordered today
    const expArrivalDate = addDays(today, totalReplenishLead);

    // Expected production start date (Order deadline)
    const expProdStartDate = addDays(group.earliestReqDate, -totalReplenishLead);

    // Can meet order flag
    const canMeetOrderFlag = expProdStartDate >= today ? 'Window Safe' : 'Critical Delay';

    summary.push({
      deficitSku: group.sku,
      itemName,
      deficitLocation: group.loc,
      totalNetDeficit: group.totalGap,
      recommendedVendorId: vendorId,
      recommendedVendorName: vendorName,
      masterPackQty,
      recommendedPoQty,
      expProdStartDate,
      expArrivalDate,
      canMeetOrderFlag,
    });
  }

  return summary;
}

/**
 * Step 4: Audit & Risk Validation (Sheet 13)
 */
export function computeAuditValidation(state: OFIAState, supplyLedger: UnifiedSupplyEntry[]): AuditIssue[] {
  const { config, items, locations, demands, pos, inTransit, reservations } = state;
  const issues: AuditIssue[] = [];
  let count = 1;

  const itemCodes = new Set(items.map((i) => i.skuCode));
  const locationCodes = new Set([config.centralDCCode, ...locations.map((l) => l.destLocation), ...locations.map((l) => l.originLocation)]);
  const poKeys = new Set(pos.map((p) => `${p.poNumber}|${p.poLineId}`));
  const supplyUids = new Set(supplyLedger.map((s) => s.supplyUid));

  // 1. Duplicate SKU check
  const skuCounts = new Map<string, number>();
  for (const item of items) {
    skuCounts.set(item.skuCode, (skuCounts.get(item.skuCode) || 0) + 1);
  }
  for (const [sku, c] of skuCounts.entries()) {
    if (c > 1) {
      issues.push({
        anomalyId: `ERR-${String(count++).padStart(3, '0')}`,
        checkType: 'Master Data Integrity',
        affectedEntityKey: sku,
        anomalyDetails: `Duplicate SKU Code found in Item Master (${c} occurrences). Primary key violated.`,
        severity: 'Critical',
        actionDepartment: 'Master Data Governance',
      });
    }
  }

  // 2. Demands with missing SKU or unknown location
  for (const d of demands) {
    if (!itemCodes.has(d.skuCode)) {
      issues.push({
        anomalyId: `ERR-${String(count++).padStart(3, '0')}`,
        checkType: 'Unmatched Demand SKU',
        affectedEntityKey: `${d.orderId}#${d.orderLineId}`,
        anomalyDetails: `Demand row references unknown SKU Code '${d.skuCode}' not found in Item Master.`,
        severity: 'Critical',
        actionDepartment: 'Sales Operations',
      });
    }
    if (!locationCodes.has(d.shipToLocation)) {
      issues.push({
        anomalyId: `ERR-${String(count++).padStart(3, '0')}`,
        checkType: 'Unmatched Ship-To Location',
        affectedEntityKey: `${d.orderId}#${d.orderLineId}`,
        anomalyDetails: `Ship-to location code '${d.shipToLocation}' is not registered in Locations Network.`,
        severity: 'Critical',
        actionDepartment: 'Sales Operations',
      });
    }
  }

  // 3. Orphan In-Transit OTW containers
  for (const otw of inTransit) {
    const key = `${otw.refPoNumber}|${otw.refPoLineId}`;
    if (!poKeys.has(key)) {
      issues.push({
        anomalyId: `ERR-${String(count++).padStart(3, '0')}`,
        checkType: 'Orphan In-Transit Cargo',
        affectedEntityKey: otw.containerId,
        anomalyDetails: `In-transit container references PO '${otw.refPoNumber}' line '${otw.refPoLineId}' which does not exist in PO Pipeline.`,
        severity: 'Warning',
        actionDepartment: 'International Logistics',
      });
    }
  }

  // 4. Over-Allocated Supply Pools
  for (const supply of supplyLedger) {
    if (supply.activeReservedQty > supply.grossAvailableQty) {
      issues.push({
        anomalyId: `ERR-${String(count++).padStart(3, '0')}`,
        checkType: 'Supply Pool Over-Draft',
        affectedEntityKey: supply.supplyUid,
        anomalyDetails: `Active reservations (${supply.activeReservedQty}) exceed gross available quantity (${supply.grossAvailableQty}) by ${supply.activeReservedQty - supply.grossAvailableQty} units.`,
        severity: 'Critical',
        actionDepartment: 'Supply Chain Planning',
      });
    }
  }

  // 5. Stale / Expired Active Reservations
  const today = getTodayStr();
  for (const res of reservations) {
    if (res.reservationStatus === 'Active') {
      const days = diffDays(today, res.createdDate);
      if (days > config.reservationExpiryDays) {
        issues.push({
          anomalyId: `ERR-${String(count++).padStart(3, '0')}`,
          checkType: 'Stale Reservation Overstay',
          affectedEntityKey: res.reservationId,
          anomalyDetails: `Reservation has been held for ${days} days without conversion to formal fulfillment (threshold: ${config.reservationExpiryDays} days).`,
          severity: 'Warning',
          actionDepartment: 'Fulfillment Operations',
        });
      }
      if (!supplyUids.has(res.assignedSupplyUid)) {
        issues.push({
          anomalyId: `ERR-${String(count++).padStart(3, '0')}`,
          checkType: 'Broken Supply Linkage',
          affectedEntityKey: res.reservationId,
          anomalyDetails: `Reservation points to non-existent Supply UID '${res.assignedSupplyUid}'.`,
          severity: 'Critical',
          actionDepartment: 'Fulfillment Operations',
        });
      }
    }
  }

  return issues;
}
