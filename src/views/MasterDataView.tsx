/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, MapPin, Truck, Box } from 'lucide-react';
import { ItemMaster, LocationDistance, VendorLeadtime, ConfigParams } from '../types/ofia.ts';

interface MasterDataViewProps {
  items: ItemMaster[];
  locations: LocationDistance[];
  vendors: VendorLeadtime[];
  config: ConfigParams;
  onUpdateItem: (index: number, updated: ItemMaster) => void;
  onAddItem: (item: ItemMaster) => void;
  onDeleteItem: (index: number) => void;
  onUpdateLocation: (index: number, updated: LocationDistance) => void;
  onAddLocation: (loc: LocationDistance) => void;
  onDeleteLocation: (index: number) => void;
  onUpdateVendor: (index: number, updated: VendorLeadtime) => void;
  onAddVendor: (v: VendorLeadtime) => void;
  onDeleteVendor: (index: number) => void;
}

export const MasterDataView: React.FC<MasterDataViewProps> = ({
  items,
  locations,
  vendors,
  config,
  onUpdateItem,
  onAddItem,
  onDeleteItem,
  onUpdateLocation,
  onAddLocation,
  onDeleteLocation,
  onUpdateVendor,
  onAddVendor,
  onDeleteVendor,
}) => {
  const [subTab, setSubTab] = useState<'items' | 'locations' | 'vendors'>('items');

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Enterprise Master Data (Sheets 01, 02 &amp; 03)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Foundational parameters: catalog specifications, 28-hub transit &amp; lateral distance matrix, and global vendor replenishment lead times.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-[#E8E8E6] gap-4">
        <button
          onClick={() => setSubTab('items')}
          className={`pb-2.5 text-[13px] font-semibold transition-colors relative ${
            subTab === 'items' ? 'text-[#051C2C]' : 'text-[#888888] hover:text-[#051C2C]'
          }`}
        >
          <span>01_Item_Master ({items.length} SKUs)</span>
          {subTab === 'items' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2251FF]" />}
        </button>

        <button
          onClick={() => setSubTab('locations')}
          className={`pb-2.5 text-[13px] font-semibold transition-colors relative ${
            subTab === 'locations' ? 'text-[#051C2C]' : 'text-[#888888] hover:text-[#051C2C]'
          }`}
        >
          <span>02_Locations_Distance ({locations.length} Hub Routes)</span>
          {subTab === 'locations' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2251FF]" />}
        </button>

        <button
          onClick={() => setSubTab('vendors')}
          className={`pb-2.5 text-[13px] font-semibold transition-colors relative ${
            subTab === 'vendors' ? 'text-[#051C2C]' : 'text-[#888888] hover:text-[#051C2C]'
          }`}
        >
          <span>03_Vendors_Leadtime ({vendors.length} Suppliers)</span>
          {subTab === 'vendors' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2251FF]" />}
        </button>
      </div>

      {/* Items View */}
      {subTab === 'items' && (
        <div className="ofia-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#888888]">
              Product Master Catalog — Pale yellow cells are directly editable
            </span>
            <button
              onClick={() =>
                onAddItem({
                  skuCode: `SKU-${100 + items.length + 1}`,
                  itemName: 'Precision Component Module',
                  category: 'Industrial',
                  masterPackQty: 20,
                  unitVolumeCBM: 0.02,
                  unitWeightKG: 1.5,
                  defaultVendorId: 'V-101',
                  activeStatus: 'Active',
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add SKU</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
            <table className="w-full ofia-table text-left">
              <thead>
                <tr>
                  <th className="px-3 py-2.5">SKU Code</th>
                  <th className="px-3 py-2.5">Item Description</th>
                  <th className="px-3 py-2.5">Category</th>
                  <th className="px-3 py-2.5 text-right">Master Pack</th>
                  <th className="px-3 py-2.5 text-right">Vol (CBM)</th>
                  <th className="px-3 py-2.5 text-right">Weight (KG)</th>
                  <th className="px-3 py-2.5">Default Vendor</th>
                  <th className="px-3 py-2.5 text-center">Status</th>
                  <th className="px-3 py-2.5 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F5F5F2]/40">
                    <td className="px-2 py-1.5 w-[110px]">
                      <input
                        type="text"
                        value={row.skuCode}
                        onChange={(e) => onUpdateItem(idx, { ...row, skuCode: e.target.value })}
                        className="w-full px-2 py-1 text-[12px] font-mono font-medium rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.itemName}
                        onChange={(e) => onUpdateItem(idx, { ...row, itemName: e.target.value })}
                        className="w-full px-2 py-1 text-[12px] font-medium rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[120px]">
                      <input
                        type="text"
                        value={row.category}
                        onChange={(e) => onUpdateItem(idx, { ...row, category: e.target.value })}
                        className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[90px]">
                      <input
                        type="number"
                        min={1}
                        value={row.masterPackQty}
                        onChange={(e) => onUpdateItem(idx, { ...row, masterPackQty: Number(e.target.value) || 1 })}
                        className="w-full px-2 py-1 text-[12px] text-right font-bold text-[#2251FF] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[85px]">
                      <input
                        type="number"
                        step="0.001"
                        value={row.unitVolumeCBM}
                        onChange={(e) => onUpdateItem(idx, { ...row, unitVolumeCBM: Number(e.target.value) || 0 })}
                        className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[85px]">
                      <input
                        type="number"
                        step="0.1"
                        value={row.unitWeightKG}
                        onChange={(e) => onUpdateItem(idx, { ...row, unitWeightKG: Number(e.target.value) || 0 })}
                        className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[100px]">
                      <input
                        type="text"
                        value={row.defaultVendorId}
                        onChange={(e) => onUpdateItem(idx, { ...row, defaultVendorId: e.target.value })}
                        className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[110px] text-center">
                      <select
                        value={row.activeStatus}
                        onChange={(e) => onUpdateItem(idx, { ...row, activeStatus: e.target.value as any })}
                        className="px-2 py-1 text-[11px] rounded editable-cell border border-[#E8E8E6]"
                      >
                        <option value="Active">Active</option>
                        <option value="Discontinued">Discontinued</option>
                      </select>
                    </td>
                    <td className="px-2 py-1.5 text-center w-[50px]">
                      <button
                        onClick={() => onDeleteItem(idx)}
                        className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors"
                        title="Delete SKU"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Locations View */}
      {subTab === 'locations' && (
        <div className="ofia-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#888888]">
              Distribution Network Transfer Routes ({locations.length}) — Pale yellow cells are directly editable
            </span>
            <button
              onClick={() =>
                onAddLocation({
                  originLocation: 'DC01',
                  originName: 'Central DC (Chicago)',
                  destLocation: `ST${20 + locations.length}`,
                  destName: 'Regional Store Hub',
                  distanceKM: 450,
                  transferTransitDays: 2,
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Route</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
            <table className="w-full ofia-table text-left">
              <thead>
                <tr>
                  <th className="px-3 py-2.5">Origin Hub</th>
                  <th className="px-3 py-2.5">Origin Name</th>
                  <th className="px-3 py-2.5">Dest Hub</th>
                  <th className="px-3 py-2.5">Dest Name</th>
                  <th className="px-3 py-2.5 text-right">Distance (KM)</th>
                  <th className="px-3 py-2.5 text-right">Transit Days</th>
                  <th className="px-3 py-2.5 text-right">Total Lead Days</th>
                  <th className="px-3 py-2.5 text-center">Nearest Pool (&le;{config.nearestStoreMaxDistanceKM}km)</th>
                  <th className="px-3 py-2.5 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((row, idx) => {
                  const totalLead = row.transferTransitDays + config.transferHandlingBufferDays;
                  const isNearest = row.distanceKM <= config.nearestStoreMaxDistanceKM;

                  return (
                    <tr key={idx} className="hover:bg-[#F5F5F2]/40">
                      <td className="px-2 py-1.5 w-[85px]">
                        <input
                          type="text"
                          value={row.originLocation}
                          onChange={(e) => onUpdateLocation(idx, { ...row, originLocation: e.target.value })}
                          className="w-full px-2 py-1 text-[12px] font-medium text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="text"
                          value={row.originName}
                          onChange={(e) => onUpdateLocation(idx, { ...row, originName: e.target.value })}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[85px]">
                        <input
                          type="text"
                          value={row.destLocation}
                          onChange={(e) => onUpdateLocation(idx, { ...row, destLocation: e.target.value })}
                          className="w-full px-2 py-1 text-[12px] font-medium text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="text"
                          value={row.destName}
                          onChange={(e) => onUpdateLocation(idx, { ...row, destName: e.target.value })}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[95px]">
                        <input
                          type="number"
                          min={0}
                          value={row.distanceKM}
                          onChange={(e) => onUpdateLocation(idx, { ...row, distanceKM: Number(e.target.value) || 0 })}
                          className="w-full px-2 py-1 text-[12px] text-right font-semibold rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[85px]">
                        <input
                          type="number"
                          min={0}
                          value={row.transferTransitDays}
                          onChange={(e) => onUpdateLocation(idx, { ...row, transferTransitDays: Number(e.target.value) || 0 })}
                          className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>

                      {/* Calculated Columns */}
                      <td className="px-3 py-2 text-right tabular-nums font-bold text-[#2251FF]">
                        {totalLead}d
                      </td>
                      <td className="px-3 py-2 text-center whitespace-nowrap">
                        {isNearest ? (
                          <span className="text-[11px] font-semibold text-[#00C853]">Nearest Store</span>
                        ) : (
                          <span className="text-[11px] text-[#888888]">Extended Route</span>
                        )}
                      </td>
                      <td className="px-2 py-1.5 text-center w-[50px]">
                        <button
                          onClick={() => onDeleteLocation(idx)}
                          className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors"
                          title="Delete Route"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vendors View */}
      {subTab === 'vendors' && (
        <div className="ofia-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#888888]">
              Vendor Lead Time Profiles ({vendors.length}) — Pale yellow cells are directly editable
            </span>
            <button
              onClick={() =>
                onAddVendor({
                  vendorId: `V-${100 + vendors.length + 1}`,
                  vendorName: 'Strategic Supplier Partner',
                  vendorRegion: 'North America',
                  destRegion: 'US-Midwest',
                  mfgLeadDays: 15,
                  shippingLeadDays: 10,
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Vendor</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
            <table className="w-full ofia-table text-left">
              <thead>
                <tr>
                  <th className="px-3 py-2.5">Vendor ID</th>
                  <th className="px-3 py-2.5">Vendor Full Name</th>
                  <th className="px-3 py-2.5">Origin Region</th>
                  <th className="px-3 py-2.5">Dest Region</th>
                  <th className="px-3 py-2.5 text-right">Mfg Lead Days</th>
                  <th className="px-3 py-2.5 text-right">Shipping Lead Days</th>
                  <th className="px-3 py-2.5 text-right">Total Replenish Lead</th>
                  <th className="px-3 py-2.5 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((row, idx) => {
                  const totalReplenish = row.mfgLeadDays + row.shippingLeadDays + config.customsPortBufferDays;

                  return (
                    <tr key={idx} className="hover:bg-[#F5F5F2]/40">
                      <td className="px-2 py-1.5 w-[90px]">
                        <input
                          type="text"
                          value={row.vendorId}
                          onChange={(e) => onUpdateVendor(idx, { ...row, vendorId: e.target.value })}
                          className="w-full px-2 py-1 text-[12px] font-mono font-medium rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="text"
                          value={row.vendorName}
                          onChange={(e) => onUpdateVendor(idx, { ...row, vendorName: e.target.value })}
                          className="w-full px-2 py-1 text-[12px] font-medium rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="text"
                          value={row.vendorRegion}
                          onChange={(e) => onUpdateVendor(idx, { ...row, vendorRegion: e.target.value })}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5">
                        <input
                          type="text"
                          value={row.destRegion}
                          onChange={(e) => onUpdateVendor(idx, { ...row, destRegion: e.target.value })}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[110px]">
                        <input
                          type="number"
                          min={0}
                          value={row.mfgLeadDays}
                          onChange={(e) => onUpdateVendor(idx, { ...row, mfgLeadDays: Number(e.target.value) || 0 })}
                          className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[110px]">
                        <input
                          type="number"
                          min={0}
                          value={row.shippingLeadDays}
                          onChange={(e) => onUpdateVendor(idx, { ...row, shippingLeadDays: Number(e.target.value) || 0 })}
                          className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums font-bold text-[#2251FF]">
                        {totalReplenish}d
                      </td>
                      <td className="px-2 py-1.5 text-center w-[50px]">
                        <button
                          onClick={() => onDeleteVendor(idx)}
                          className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors"
                          title="Delete Vendor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
