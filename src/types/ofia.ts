/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConfigParams {
  baseCurrency: string; // B3: Base currency symbol (e.g. '$')
  quoteReservationEnabled: boolean; // B4: Whether quotes lock inventory
  centralDCCode: string; // B5: Code of central DC (e.g. 'DC01')
  safetyStockProtectRatio: number; // B6: Safety stock protection multiplier (0.0 - 1.0)
  fmdProtectEnabled: number; // B7: First-Month Demand protection (1 or 0)
  nearestStoreMaxDistanceKM: number; // B8: Max distance for nearest store echelon
  transferHandlingBufferDays: number; // B9: Days for cross-docking / handling buffer
  customsPortBufferDays: number; // B10: Days for customs clearance and port transit
  masterPackCeilingEnabled: boolean; // B11: Ceiling PO suggestions to master pack
  moqMultiplier: number; // B12: MOQ scale factor
  allocationPriorityCode: string; // B13: Strategy code 'LOCAL-NEAR-DC-OTW-PO'
  reservationExpiryDays: number; // B14: Days before active reservation flagged
}

export interface ItemMaster {
  skuCode: string;
  itemName: string;
  category: string;
  masterPackQty: number;
  unitVolumeCBM: number;
  unitWeightKG: number;
  defaultVendorId: string;
  activeStatus: 'Active' | 'Discontinued';
}

export interface LocationDistance {
  originLocation: string;
  originName: string;
  destLocation: string;
  destName: string;
  distanceKM: number;
  transferTransitDays: number;
}

export interface VendorLeadtime {
  vendorId: string;
  vendorName: string;
  vendorRegion: string;
  destRegion: string;
  mfgLeadDays: number;
  shippingLeadDays: number;
}

export interface SalesDemand {
  orderId: string;
  orderLineId: string;
  demandType: 'Firm' | 'Quote';
  orderDate: string; // YYYY-MM-DD
  customerId: string;
  customerName: string;
  skuCode: string;
  reqQty: number;
  reqDeliveryDate: string; // YYYY-MM-DD
  shipToLocation: string;
}

export interface InvOnHand {
  locationCode: string;
  skuCode: string;
  physicalQOH: number;
  systemCommittedQty: number;
  minSafetyStock: number;
  fmdReserveQty: number;
  unitCost: number;
}

export interface POPipeline {
  poNumber: string;
  poLineId: string;
  vendorId: string;
  skuCode: string;
  poOrderedQty: number;
  poOpenQty: number;
  poPromisedDate: string; // YYYY-MM-DD
  poDestLocation: string;
  poStatus: 'Open' | 'In-Production' | 'Shipped' | 'Closed';
}

export interface InTransitOTW {
  containerId: string;
  refPoNumber: string;
  refPoLineId: string;
  skuCode: string;
  inTransitQty: number;
  vesselETD: string; // YYYY-MM-DD
  portETA: string; // YYYY-MM-DD
  destLocation: string;
}

export interface ReservationEntry {
  reservationId: string;
  orderId: string;
  orderLineId: string;
  skuCode: string;
  assignedSupplyUid: string;
  reservedQty: number;
  reservationStatus: 'Active' | 'Released' | 'Fulfilled';
  createdDate: string; // YYYY-MM-DD
}

export type SupplyType = 'QOH' | 'OTW' | 'PO';

export interface UnifiedSupplyEntry {
  supplyUid: string;
  supplyType: SupplyType;
  supplyLocation: string;
  skuCode: string;
  supplyReadyDate: string;
  grossAvailableQty: number;
  activeReservedQty: number;
  netAvailableForAlloc: number;
  healthStatus: 'Adequate' | 'Fully Committed' | 'Over-Allocated';
}

export interface EchelonAllocationDetail {
  echelon: 1 | 2 | 3 | 4 | 5;
  echelonName: 'Local Store' | 'Nearest Store' | 'Central DC' | 'In-Transit OTW' | 'Open PO';
  allocatedQty: number;
  supplyLocationOrRef: string;
  estArrivalDate: string;
  leadDays: number;
}

export interface AllocationEngineRow {
  demand: SalesDemand;
  isActiveDemand: boolean;
  masterPack: number;
  echelon1_LocalQty: number;
  echelon1_EstArrival: string;
  echelon2_NearestQty: number;
  echelon2_NearestLoc: string;
  echelon2_EstArrival: string;
  echelon3_DCQty: number;
  echelon3_EstArrival: string;
  echelon4_OTWQty: number;
  echelon4_RefContainer: string;
  echelon4_EstArrival: string;
  echelon5_POQty: number;
  echelon5_RefPO: string;
  echelon5_EstArrival: string;
  allocatedTotalQty: number;
  unmetQtyGap: number;
  isSplitOrder: boolean;
  maxEstArrivalDate: string;
  deliveryDelayDays: number;
  fulfillmentStatus: 'Fully Feasible' | 'Quantity Met But Late' | 'Partial Feasible' | 'Stockout' | 'Quote Pending';
  primarySupplySource: string;
  assignedSupplyUid: string;
  actionRecommendation: string;
  details: EchelonAllocationDetail[];
}

export interface ProcurementSummaryRow {
  deficitSku: string;
  itemName: string;
  deficitLocation: string;
  totalNetDeficit: number;
  recommendedVendorId: string;
  recommendedVendorName: string;
  masterPackQty: number;
  recommendedPoQty: number;
  expProdStartDate: string;
  expArrivalDate: string;
  canMeetOrderFlag: 'Window Safe' | 'Critical Delay';
}

export interface AuditIssue {
  anomalyId: string;
  checkType: string;
  affectedEntityKey: string;
  anomalyDetails: string;
  severity: 'Critical' | 'Warning';
  actionDepartment: string;
}

export interface OFIAState {
  config: ConfigParams;
  items: ItemMaster[];
  locations: LocationDistance[];
  vendors: VendorLeadtime[];
  demands: SalesDemand[];
  inventory: InvOnHand[];
  pos: POPipeline[];
  inTransit: InTransitOTW[];
  reservations: ReservationEntry[];
  lastSavedAt: string; // ISO string
}
