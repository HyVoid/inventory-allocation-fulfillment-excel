/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OFIAState, ConfigParams, ItemMaster, LocationDistance, VendorLeadtime, SalesDemand, InvOnHand, POPipeline, InTransitOTW, ReservationEntry } from '../types/ofia.ts';

export const defaultConfig: ConfigParams = {
  baseCurrency: '$',
  quoteReservationEnabled: false,
  centralDCCode: 'DC01',
  safetyStockProtectRatio: 1.00,
  fmdProtectEnabled: 1,
  nearestStoreMaxDistanceKM: 300,
  transferHandlingBufferDays: 1,
  customsPortBufferDays: 4,
  masterPackCeilingEnabled: true,
  moqMultiplier: 1.00,
  allocationPriorityCode: 'LOCAL-NEAR-DC-OTW-PO',
  reservationExpiryDays: 7,
};

export const defaultItems: ItemMaster[] = [
  { skuCode: 'SKU-101', itemName: 'Industrial Sensor Module X-200', category: 'Sensors', masterPackQty: 20, unitVolumeCBM: 0.015, unitWeightKG: 1.2, defaultVendorId: 'V-101', activeStatus: 'Active' },
  { skuCode: 'SKU-102', itemName: 'Precision Servo Actuator M-4', category: 'Actuators', masterPackQty: 10, unitVolumeCBM: 0.035, unitWeightKG: 3.8, defaultVendorId: 'V-102', activeStatus: 'Active' },
  { skuCode: 'SKU-103', itemName: 'Optic Laser Transceiver 10G', category: 'Optics', masterPackQty: 50, unitVolumeCBM: 0.008, unitWeightKG: 0.4, defaultVendorId: 'V-101', activeStatus: 'Active' },
  { skuCode: 'SKU-104', itemName: 'High-Torque Stepper Motor S-80', category: 'Motors', masterPackQty: 12, unitVolumeCBM: 0.045, unitWeightKG: 4.5, defaultVendorId: 'V-103', activeStatus: 'Active' },
  { skuCode: 'SKU-105', itemName: 'Thermal Controller Circuit Board', category: 'Electronics', masterPackQty: 25, unitVolumeCBM: 0.012, unitWeightKG: 0.8, defaultVendorId: 'V-104', activeStatus: 'Active' },
  { skuCode: 'SKU-106', itemName: 'Heavy-Duty Pneumatic Valve 3/4"', category: 'Pneumatics', masterPackQty: 16, unitVolumeCBM: 0.028, unitWeightKG: 2.6, defaultVendorId: 'V-102', activeStatus: 'Active' },
  { skuCode: 'SKU-107', itemName: 'Lithium Battery Module 48V-10Ah', category: 'Power', masterPackQty: 8, unitVolumeCBM: 0.065, unitWeightKG: 8.2, defaultVendorId: 'V-103', activeStatus: 'Active' },
  { skuCode: 'SKU-108', itemName: 'Shielded Control Cable 50m Drum', category: 'Cabling', masterPackQty: 6, unitVolumeCBM: 0.085, unitWeightKG: 9.5, defaultVendorId: 'V-104', activeStatus: 'Active' },
];

export const defaultLocations: LocationDistance[] = [
  // 28 Locations Network: DC01 (Central) + ST01 to ST27 across 4 regions
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST01', destName: 'Chicago Downtown Store', distanceKM: 35, transferTransitDays: 1 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST02', destName: 'Milwaukee Hub', distanceKM: 145, transferTransitDays: 1 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST03', destName: 'Indianapolis Express', distanceKM: 290, transferTransitDays: 1 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST04', destName: 'Detroit Metro Branch', distanceKM: 450, transferTransitDays: 2 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST05', destName: 'Minneapolis Twin Cities', distanceKM: 660, transferTransitDays: 2 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST06', destName: 'Cleveland Waterfront', distanceKM: 550, transferTransitDays: 2 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST07', destName: 'St. Louis Riverfront', distanceKM: 480, transferTransitDays: 2 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST08', destName: 'Cincinnati Tri-State', distanceKM: 475, transferTransitDays: 2 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST09', destName: 'Kansas City Crossway', distanceKM: 820, transferTransitDays: 3 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST10', destName: 'Columbus Central', distanceKM: 570, transferTransitDays: 2 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST11', destName: 'Atlanta Peachtree Hub', distanceKM: 1150, transferTransitDays: 3 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST12', destName: 'Charlotte Piedmont', distanceKM: 1220, transferTransitDays: 3 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST13', destName: 'Nashville Music City', distanceKM: 760, transferTransitDays: 2 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST14', destName: 'Memphis Logistics Row', distanceKM: 855, transferTransitDays: 2 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST15', destName: 'Orlando Gateway', distanceKM: 1850, transferTransitDays: 4 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST16', destName: 'Miami Port Store', distanceKM: 2150, transferTransitDays: 4 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST17', destName: 'Dallas Fort Worth Hub', distanceKM: 1480, transferTransitDays: 3 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST18', destName: 'Houston Gulf Coast', distanceKM: 1740, transferTransitDays: 3 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST19', destName: 'Austin Silicon Hills', distanceKM: 1880, transferTransitDays: 4 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST20', destName: 'Denver Mile High', distanceKM: 1620, transferTransitDays: 3 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST21', destName: 'Phoenix Valley Hub', distanceKM: 2800, transferTransitDays: 5 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST22', destName: 'Salt Lake Wasatch', distanceKM: 2250, transferTransitDays: 4 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST23', destName: 'Los Angeles Pacific', distanceKM: 3240, transferTransitDays: 5 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST24', destName: 'San Francisco Bay', distanceKM: 3420, transferTransitDays: 5 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST25', destName: 'Seattle Puget Sound', distanceKM: 3310, transferTransitDays: 5 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST26', destName: 'New York Manhattan', distanceKM: 1270, transferTransitDays: 3 },
  { originLocation: 'DC01', originName: 'Central DC (Chicago)', destLocation: 'ST27', destName: 'Boston Harbor Store', distanceKM: 1580, transferTransitDays: 3 },
  
  // Cluster Lateral Neighbor Pairs (Stores within 300km of each other)
  { originLocation: 'ST01', originName: 'Chicago Downtown Store', destLocation: 'ST02', destName: 'Milwaukee Hub', distanceKM: 145, transferTransitDays: 1 },
  { originLocation: 'ST02', originName: 'Milwaukee Hub', destLocation: 'ST01', destName: 'Chicago Downtown Store', distanceKM: 145, transferTransitDays: 1 },
  { originLocation: 'ST01', originName: 'Chicago Downtown Store', destLocation: 'ST03', destName: 'Indianapolis Express', distanceKM: 290, transferTransitDays: 1 },
  { originLocation: 'ST03', originName: 'Indianapolis Express', destLocation: 'ST08', destName: 'Cincinnati Tri-State', distanceKM: 180, transferTransitDays: 1 },
  { originLocation: 'ST08', originName: 'Cincinnati Tri-State', destLocation: 'ST10', destName: 'Columbus Central', distanceKM: 170, transferTransitDays: 1 },
  { originLocation: 'ST11', originName: 'Atlanta Peachtree Hub', destLocation: 'ST13', destName: 'Nashville Music City', distanceKM: 390, transferTransitDays: 2 },
  { originLocation: 'ST17', originName: 'Dallas Fort Worth Hub', destLocation: 'ST19', destName: 'Austin Silicon Hills', distanceKM: 315, transferTransitDays: 1 },
  { originLocation: 'ST18', originName: 'Houston Gulf Coast', destLocation: 'ST19', destName: 'Austin Silicon Hills', distanceKM: 260, transferTransitDays: 1 },
  { originLocation: 'ST19', originName: 'Austin Silicon Hills', destLocation: 'ST18', destName: 'Houston Gulf Coast', distanceKM: 260, transferTransitDays: 1 },
  { originLocation: 'ST15', originName: 'Orlando Gateway', destLocation: 'ST16', destName: 'Miami Port Store', distanceKM: 380, transferTransitDays: 2 },
  { originLocation: 'ST26', originName: 'New York Manhattan', destLocation: 'ST27', destName: 'Boston Harbor Store', distanceKM: 345, transferTransitDays: 2 },
];

export const defaultVendors: VendorLeadtime[] = [
  { vendorId: 'V-101', vendorName: 'Apex Electronics Global', vendorRegion: 'Asia-East (Shenzhen)', destRegion: 'US-Midwest', mfgLeadDays: 25, shippingLeadDays: 22 },
  { vendorId: 'V-102', vendorName: 'Nordic Precision Engineering', vendorRegion: 'Europe-North (Gothenburg)', destRegion: 'US-Midwest', mfgLeadDays: 18, shippingLeadDays: 16 },
  { vendorId: 'V-103', vendorName: 'Pacific Rim Dynamics', vendorRegion: 'Asia-South (Penang)', destRegion: 'US-Midwest', mfgLeadDays: 30, shippingLeadDays: 25 },
  { vendorId: 'V-104', vendorName: 'Great Lakes Components Ltd', vendorRegion: 'North America (Ohio)', destRegion: 'US-Midwest', mfgLeadDays: 8, shippingLeadDays: 3 },
];

export const defaultDemands: SalesDemand[] = [
  { orderId: 'SO-9001', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-10', customerId: 'CUST-A10', customerName: 'Apex Robotics Corp', skuCode: 'SKU-101', reqQty: 40, reqDeliveryDate: '2026-10-18', shipToLocation: 'ST01' },
  { orderId: 'SO-9002', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-10', customerId: 'CUST-B22', customerName: 'BioHealth Tech Inc', skuCode: 'SKU-102', reqQty: 25, reqDeliveryDate: '2026-10-22', shipToLocation: 'ST02' },
  { orderId: 'SO-9003', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-11', customerId: 'CUST-C33', customerName: 'Cascade Automations', skuCode: 'SKU-103', reqQty: 100, reqDeliveryDate: '2026-10-25', shipToLocation: 'ST03' },
  { orderId: 'SO-9004', orderLineId: '1', demandType: 'Quote', orderDate: '2026-10-11', customerId: 'CUST-D44', customerName: 'Delta Electric Works', skuCode: 'SKU-104', reqQty: 36, reqDeliveryDate: '2026-11-05', shipToLocation: 'ST04' },
  { orderId: 'SO-9005', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-12', customerId: 'CUST-E55', customerName: 'Evergreen CleanTech', skuCode: 'SKU-105', reqQty: 50, reqDeliveryDate: '2026-10-20', shipToLocation: 'ST05' },
  { orderId: 'SO-9006', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-12', customerId: 'CUST-F66', customerName: 'Frontier Avionics', skuCode: 'SKU-106', reqQty: 60, reqDeliveryDate: '2026-11-15', shipToLocation: 'ST11' },
  { orderId: 'SO-9007', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-12', customerId: 'CUST-G77', customerName: 'Gulf Coast Energy', skuCode: 'SKU-107', reqQty: 32, reqDeliveryDate: '2026-10-24', shipToLocation: 'ST18' },
  { orderId: 'SO-9008', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-12', customerId: 'CUST-H88', customerName: 'Horizon Satellite Ltd', skuCode: 'SKU-101', reqQty: 80, reqDeliveryDate: '2026-10-16', shipToLocation: 'ST26' },
  { orderId: 'SO-9009', orderLineId: '1', demandType: 'Quote', orderDate: '2026-10-12', customerId: 'CUST-I99', customerName: 'InfraCore Construction', skuCode: 'SKU-108', reqQty: 18, reqDeliveryDate: '2026-11-02', shipToLocation: 'ST17' },
  { orderId: 'SO-9010', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-12', customerId: 'CUST-J12', customerName: 'Jupiter Heavy Industries', skuCode: 'SKU-102', reqQty: 45, reqDeliveryDate: '2026-11-20', shipToLocation: 'ST23' },
  { orderId: 'SO-9011', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-12', customerId: 'CUST-K34', customerName: 'Keystone Medical Devices', skuCode: 'SKU-103', reqQty: 150, reqDeliveryDate: '2026-11-28', shipToLocation: 'ST01' },
  { orderId: 'SO-9012', orderLineId: '1', demandType: 'Firm', orderDate: '2026-10-12', customerId: 'CUST-L56', customerName: 'Luminary Optical Labs', skuCode: 'SKU-104', reqQty: 70, reqDeliveryDate: '2026-10-30', shipToLocation: 'ST19' },
];

export const defaultInventory: InvOnHand[] = [
  // Central DC01 inventory
  { locationCode: 'DC01', skuCode: 'SKU-101', physicalQOH: 120, systemCommittedQty: 20, minSafetyStock: 25, fmdReserveQty: 15, unitCost: 45.00 },
  { locationCode: 'DC01', skuCode: 'SKU-102', physicalQOH: 80, systemCommittedQty: 15, minSafetyStock: 20, fmdReserveQty: 10, unitCost: 110.00 },
  { locationCode: 'DC01', skuCode: 'SKU-103', physicalQOH: 250, systemCommittedQty: 30, minSafetyStock: 50, fmdReserveQty: 20, unitCost: 32.50 },
  { locationCode: 'DC01', skuCode: 'SKU-104', physicalQOH: 60, systemCommittedQty: 10, minSafetyStock: 15, fmdReserveQty: 10, unitCost: 85.00 },
  { locationCode: 'DC01', skuCode: 'SKU-105', physicalQOH: 140, systemCommittedQty: 25, minSafetyStock: 30, fmdReserveQty: 15, unitCost: 62.00 },
  { locationCode: 'DC01', skuCode: 'SKU-106', physicalQOH: 45, systemCommittedQty: 5, minSafetyStock: 10, fmdReserveQty: 5, unitCost: 55.00 },
  { locationCode: 'DC01', skuCode: 'SKU-107', physicalQOH: 40, systemCommittedQty: 8, minSafetyStock: 10, fmdReserveQty: 8, unitCost: 240.00 },
  { locationCode: 'DC01', skuCode: 'SKU-108', physicalQOH: 50, systemCommittedQty: 5, minSafetyStock: 12, fmdReserveQty: 6, unitCost: 78.00 },

  // ST01 Chicago Store
  { locationCode: 'ST01', skuCode: 'SKU-101', physicalQOH: 35, systemCommittedQty: 5, minSafetyStock: 10, fmdReserveQty: 5, unitCost: 45.00 },
  { locationCode: 'ST01', skuCode: 'SKU-103', physicalQOH: 80, systemCommittedQty: 10, minSafetyStock: 20, fmdReserveQty: 10, unitCost: 32.50 },

  // ST02 Milwaukee Store
  { locationCode: 'ST02', skuCode: 'SKU-101', physicalQOH: 25, systemCommittedQty: 0, minSafetyStock: 5, fmdReserveQty: 0, unitCost: 45.00 },
  { locationCode: 'ST02', skuCode: 'SKU-102', physicalQOH: 12, systemCommittedQty: 2, minSafetyStock: 5, fmdReserveQty: 2, unitCost: 110.00 },

  // ST03 Indianapolis Store
  { locationCode: 'ST03', skuCode: 'SKU-103', physicalQOH: 40, systemCommittedQty: 0, minSafetyStock: 10, fmdReserveQty: 5, unitCost: 32.50 },

  // ST05 Minneapolis Store
  { locationCode: 'ST05', skuCode: 'SKU-105', physicalQOH: 60, systemCommittedQty: 5, minSafetyStock: 10, fmdReserveQty: 5, unitCost: 62.00 },

  // ST11 Atlanta Store
  { locationCode: 'ST11', skuCode: 'SKU-106', physicalQOH: 15, systemCommittedQty: 0, minSafetyStock: 5, fmdReserveQty: 2, unitCost: 55.00 },

  // ST18 Houston Store
  { locationCode: 'ST18', skuCode: 'SKU-107', physicalQOH: 20, systemCommittedQty: 0, minSafetyStock: 5, fmdReserveQty: 3, unitCost: 240.00 },

  // ST19 Austin Store
  { locationCode: 'ST19', skuCode: 'SKU-107', physicalQOH: 15, systemCommittedQty: 0, minSafetyStock: 4, fmdReserveQty: 2, unitCost: 240.00 },
  { locationCode: 'ST19', skuCode: 'SKU-104', physicalQOH: 10, systemCommittedQty: 0, minSafetyStock: 4, fmdReserveQty: 2, unitCost: 85.00 },

  // ST26 New York Store
  { locationCode: 'ST26', skuCode: 'SKU-101', physicalQOH: 20, systemCommittedQty: 0, minSafetyStock: 5, fmdReserveQty: 3, unitCost: 45.00 },
];

export const defaultPOs: POPipeline[] = [
  { poNumber: 'PO-2026-081', poLineId: '1', vendorId: 'V-101', skuCode: 'SKU-101', poOrderedQty: 200, poOpenQty: 200, poPromisedDate: '2026-11-10', poDestLocation: 'DC01', poStatus: 'In-Production' },
  { poNumber: 'PO-2026-082', poLineId: '1', vendorId: 'V-102', skuCode: 'SKU-102', poOrderedQty: 100, poOpenQty: 100, poPromisedDate: '2026-11-18', poDestLocation: 'DC01', poStatus: 'In-Production' },
  { poNumber: 'PO-2026-083', poLineId: '1', vendorId: 'V-101', skuCode: 'SKU-103', poOrderedQty: 300, poOpenQty: 300, poPromisedDate: '2026-11-25', poDestLocation: 'DC01', poStatus: 'Open' },
  { poNumber: 'PO-2026-084', poLineId: '1', vendorId: 'V-102', skuCode: 'SKU-106', poOrderedQty: 80, poOpenQty: 80, poPromisedDate: '2026-11-12', poDestLocation: 'DC01', poStatus: 'Shipped' },
  { poNumber: 'PO-2026-085', poLineId: '1', vendorId: 'V-104', skuCode: 'SKU-105', poOrderedQty: 150, poOpenQty: 150, poPromisedDate: '2026-10-28', poDestLocation: 'DC01', poStatus: 'In-Production' },
];

export const defaultInTransit: InTransitOTW[] = [
  { containerId: 'MSKU-8801', refPoNumber: 'PO-2026-081', refPoLineId: '1', skuCode: 'SKU-101', inTransitQty: 100, vesselETD: '2026-09-28', portETA: '2026-10-20', destLocation: 'DC01' },
  { containerId: 'MSKU-8802', refPoNumber: 'PO-2026-084', refPoLineId: '1', skuCode: 'SKU-106', inTransitQty: 50, vesselETD: '2026-10-02', portETA: '2026-10-24', destLocation: 'DC01' },
];

export const defaultReservations: ReservationEntry[] = [
  { reservationId: 'RES-001', orderId: 'SO-9001', orderLineId: '1', skuCode: 'SKU-101', assignedSupplyUid: 'QOH|ST01|SKU-101', reservedQty: 20, reservationStatus: 'Active', createdDate: '2026-10-10' },
  { reservationId: 'RES-002', orderId: 'SO-9002', orderLineId: '1', skuCode: 'SKU-102', assignedSupplyUid: 'QOH|DC01|SKU-102', reservedQty: 15, reservationStatus: 'Active', createdDate: '2026-10-10' },
];

export const getInitialOFIAState = (): OFIAState => {
  return {
    config: { ...defaultConfig },
    items: [...defaultItems],
    locations: [...defaultLocations],
    vendors: [...defaultVendors],
    demands: [...defaultDemands],
    inventory: [...defaultInventory],
    pos: [...defaultPOs],
    inTransit: [...defaultInTransit],
    reservations: [...defaultReservations],
    lastSavedAt: new Date().toISOString(),
  };
};
