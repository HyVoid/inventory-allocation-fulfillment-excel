/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  OFIAState,
  ConfigParams,
  SalesDemand,
  InvOnHand,
  POPipeline,
  InTransitOTW,
  ReservationEntry,
  ItemMaster,
  LocationDistance,
  VendorLeadtime,
} from '../types/ofia.ts';
import { getInitialOFIAState } from '../data/defaultData.ts';
import {
  computeUnifiedSupplyLedger,
  computeAllocationEngine,
  computeProcurementSummary,
  computeAuditValidation,
} from '../engine/calculationEngine.ts';

const STORAGE_KEY = 'ofia_saas_state_v1';

export function useOfiaState() {
  const [state, setState] = useState<OFIAState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.config && Array.isArray(parsed.demands)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse state from localStorage, loading default benchmark:', e);
    }
    return getInitialOFIAState();
  });

  const [lastSavedStatus, setLastSavedStatus] = useState<string>('Saved');

  // Debounced auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const now = new Date();
        const updated = { ...state, lastSavedAt: now.toISOString() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSavedStatus(`Saved at ${timeStr}`);
      } catch (e) {
        console.error('Error saving to localStorage:', e);
        setLastSavedStatus('Save error');
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [state]);

  // Derived reactive calculations via engine
  const supplyLedger = useMemo(() => computeUnifiedSupplyLedger(state), [state]);
  const allocationResults = useMemo(() => computeAllocationEngine(state, supplyLedger), [state, supplyLedger]);
  const procurementSummary = useMemo(() => computeProcurementSummary(state, allocationResults), [state, allocationResults]);
  const auditIssues = useMemo(() => computeAuditValidation(state, supplyLedger), [state, supplyLedger]);

  // Executive KPI summary
  const kpis = useMemo(() => {
    const totalOrders = allocationResults.length;
    const firmOrders = allocationResults.filter((r) => r.demand.demandType === 'Firm').length;
    const fullyFeasible = allocationResults.filter((r) => r.fulfillmentStatus === 'Fully Feasible').length;
    const lateDeliveries = allocationResults.filter((r) => r.fulfillmentStatus === 'Quantity Met But Late').length;
    const partialDeliveries = allocationResults.filter((r) => r.fulfillmentStatus === 'Partial Feasible').length;
    const stockouts = allocationResults.filter((r) => r.fulfillmentStatus === 'Stockout').length;
    const quotePendings = allocationResults.filter((r) => r.fulfillmentStatus === 'Quote Pending').length;

    const totalReqQty = allocationResults.reduce((s, r) => s + r.demand.reqQty, 0);
    const totalAllocatedQty = allocationResults.reduce((s, r) => s + r.allocatedTotalQty, 0);
    const totalGapQty = allocationResults.reduce((s, r) => s + r.unmetQtyGap, 0);

    const onTimeFulfillmentRate = totalOrders > 0 ? (fullyFeasible / totalOrders) * 100 : 0;
    const quantityCoverageRate = totalReqQty > 0 ? (totalAllocatedQty / totalReqQty) * 100 : 0;
    const criticalAuditCount = auditIssues.filter((a) => a.severity === 'Critical').length;
    const totalProcurementNeededQty = procurementSummary.reduce((s, p) => s + p.recommendedPoQty, 0);

    return {
      totalOrders,
      firmOrders,
      fullyFeasible,
      lateDeliveries,
      partialDeliveries,
      stockouts,
      quotePendings,
      totalReqQty,
      totalAllocatedQty,
      totalGapQty,
      onTimeFulfillmentRate,
      quantityCoverageRate,
      criticalAuditCount,
      totalProcurementNeededQty,
    };
  }, [allocationResults, auditIssues, procurementSummary]);

  // Update methods
  const updateConfig = useCallback((patch: Partial<ConfigParams>) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, ...patch },
    }));
  }, []);

  const updateDemand = useCallback((index: number, updated: SalesDemand) => {
    setState((prev) => {
      const next = [...prev.demands];
      next[index] = updated;
      return { ...prev, demands: next };
    });
  }, []);

  const addDemand = useCallback((item: SalesDemand) => {
    setState((prev) => ({
      ...prev,
      demands: [item, ...prev.demands],
    }));
  }, []);

  const deleteDemand = useCallback((index: number) => {
    setState((prev) => {
      const next = prev.demands.filter((_, i) => i !== index);
      return { ...prev, demands: next };
    });
  }, []);

  const updateInventory = useCallback((index: number, updated: InvOnHand) => {
    setState((prev) => {
      const next = [...prev.inventory];
      next[index] = updated;
      return { ...prev, inventory: next };
    });
  }, []);

  const addInventory = useCallback((item: InvOnHand) => {
    setState((prev) => ({
      ...prev,
      inventory: [item, ...prev.inventory],
    }));
  }, []);

  const deleteInventory = useCallback((index: number) => {
    setState((prev) => {
      const next = prev.inventory.filter((_, i) => i !== index);
      return { ...prev, inventory: next };
    });
  }, []);

  const updatePO = useCallback((index: number, updated: POPipeline) => {
    setState((prev) => {
      const next = [...prev.pos];
      next[index] = updated;
      return { ...prev, pos: next };
    });
  }, []);

  const addPO = useCallback((item: POPipeline) => {
    setState((prev) => ({
      ...prev,
      pos: [item, ...prev.pos],
    }));
  }, []);

  const deletePO = useCallback((index: number) => {
    setState((prev) => {
      const next = prev.pos.filter((_, i) => i !== index);
      return { ...prev, pos: next };
    });
  }, []);

  const updateInTransit = useCallback((index: number, updated: InTransitOTW) => {
    setState((prev) => {
      const next = [...prev.inTransit];
      next[index] = updated;
      return { ...prev, inTransit: next };
    });
  }, []);

  const addInTransit = useCallback((item: InTransitOTW) => {
    setState((prev) => ({
      ...prev,
      inTransit: [item, ...prev.inTransit],
    }));
  }, []);

  const deleteInTransit = useCallback((index: number) => {
    setState((prev) => {
      const next = prev.inTransit.filter((_, i) => i !== index);
      return { ...prev, inTransit: next };
    });
  }, []);

  const updateReservation = useCallback((index: number, updated: ReservationEntry) => {
    setState((prev) => {
      const next = [...prev.reservations];
      next[index] = updated;
      return { ...prev, reservations: next };
    });
  }, []);

  const addReservation = useCallback((item: ReservationEntry) => {
    setState((prev) => ({
      ...prev,
      reservations: [item, ...prev.reservations],
    }));
  }, []);

  const deleteReservation = useCallback((index: number) => {
    setState((prev) => {
      const next = prev.reservations.filter((_, i) => i !== index);
      return { ...prev, reservations: next };
    });
  }, []);

  const updateItem = useCallback((index: number, updated: ItemMaster) => {
    setState((prev) => {
      const next = [...prev.items];
      next[index] = updated;
      return { ...prev, items: next };
    });
  }, []);

  const addItem = useCallback((item: ItemMaster) => {
    setState((prev) => ({
      ...prev,
      items: [item, ...prev.items],
    }));
  }, []);

  const deleteItem = useCallback((index: number) => {
    setState((prev) => {
      const next = prev.items.filter((_, i) => i !== index);
      return { ...prev, items: next };
    });
  }, []);

  const updateLocation = useCallback((index: number, updated: LocationDistance) => {
    setState((prev) => {
      const next = [...prev.locations];
      next[index] = updated;
      return { ...prev, locations: next };
    });
  }, []);

  const addLocation = useCallback((item: LocationDistance) => {
    setState((prev) => ({
      ...prev,
      locations: [item, ...prev.locations],
    }));
  }, []);

  const deleteLocation = useCallback((index: number) => {
    setState((prev) => {
      const next = prev.locations.filter((_, i) => i !== index);
      return { ...prev, locations: next };
    });
  }, []);

  const updateVendor = useCallback((index: number, updated: VendorLeadtime) => {
    setState((prev) => {
      const next = [...prev.vendors];
      next[index] = updated;
      return { ...prev, vendors: next };
    });
  }, []);

  const addVendor = useCallback((item: VendorLeadtime) => {
    setState((prev) => ({
      ...prev,
      vendors: [item, ...prev.vendors],
    }));
  }, []);

  const deleteVendor = useCallback((index: number) => {
    setState((prev) => {
      const next = prev.vendors.filter((_, i) => i !== index);
      return { ...prev, vendors: next };
    });
  }, []);

  // Export Backup
  const exportBackup = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `OFIA_Backup_${timestamp}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [state]);

  // Import Backup
  const importBackup = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.config && Array.isArray(parsed.demands) && Array.isArray(parsed.inventory)) {
        setState({
          ...parsed,
          lastSavedAt: new Date().toISOString(),
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  }, []);

  // Bulk CSV Import
  const bulkImportCsv = useCallback((target: string, rows: any[], mode: 'append' | 'replace'): boolean => {
    if (!rows || rows.length === 0) return false;
    setState((prev) => {
      const copy = { ...prev };
      switch (target) {
        case 'demands':
          copy.demands = mode === 'replace' ? rows : [...rows, ...prev.demands];
          break;
        case 'inventory':
          copy.inventory = mode === 'replace' ? rows : [...rows, ...prev.inventory];
          break;
        case 'pos':
          copy.pos = mode === 'replace' ? rows : [...rows, ...prev.pos];
          break;
        case 'inTransit':
          copy.inTransit = mode === 'replace' ? rows : [...rows, ...prev.inTransit];
          break;
        case 'reservations':
          copy.reservations = mode === 'replace' ? rows : [...rows, ...prev.reservations];
          break;
        case 'items':
          copy.items = mode === 'replace' ? rows : [...rows, ...prev.items];
          break;
        case 'locations':
          copy.locations = mode === 'replace' ? rows : [...rows, ...prev.locations];
          break;
        case 'vendors':
          copy.vendors = mode === 'replace' ? rows : [...rows, ...prev.vendors];
          break;
        default:
          return prev;
      }
      return copy;
    });
    return true;
  }, []);

  // Reset Data to Benchmark
  const resetData = useCallback(() => {
    const initial = getInitialOFIAState();
    setState(initial);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch {}
    setLastSavedStatus('Reset to benchmark');
  }, []);

  return {
    state,
    lastSavedStatus,
    supplyLedger,
    allocationResults,
    procurementSummary,
    auditIssues,
    kpis,
    updateConfig,
    updateDemand,
    addDemand,
    deleteDemand,
    updateInventory,
    addInventory,
    deleteInventory,
    updatePO,
    addPO,
    deletePO,
    updateInTransit,
    addInTransit,
    deleteInTransit,
    updateReservation,
    addReservation,
    deleteReservation,
    updateItem,
    addItem,
    deleteItem,
    updateLocation,
    addLocation,
    deleteLocation,
    updateVendor,
    addVendor,
    deleteVendor,
    exportBackup,
    importBackup,
    bulkImportCsv,
    resetData,
  };
}
