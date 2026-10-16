/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Package, Plus, Trash2, Download } from 'lucide-react';
import { InvOnHand, ConfigParams } from '../types/ofia.ts';
import { KPICard } from '../components/KPICard.tsx';
import { DataBar } from '../components/DataBar.tsx';

interface InventoryViewProps {
  inventory: InvOnHand[];
  config: ConfigParams;
  currency: string;
  onUpdateInventory: (index: number, updated: InvOnHand) => void;
  onAddInventory: (item: InvOnHand) => void;
  onDeleteInventory: (index: number) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  config,
  currency,
  onUpdateInventory,
  onAddInventory,
  onDeleteInventory,
}) => {
  const [newInv, setNewInv] = useState<InvOnHand>({
    locationCode: 'ST01',
    skuCode: 'SKU-101',
    physicalQOH: 50,
    systemCommittedQty: 5,
    minSafetyStock: 10,
    fmdReserveQty: 5,
    unitCost: 45.0,
  });

  const totalPhysicalQOH = inventory.reduce((s, i) => s + i.physicalQOH, 0);
  const totalValuation = inventory.reduce((s, i) => s + i.physicalQOH * i.unitCost, 0);
  const totalNetTransferable = inventory.reduce((s, i) => {
    const prot = i.minSafetyStock * config.safetyStockProtectRatio + i.fmdReserveQty * config.fmdProtectEnabled;
    return s + Math.max(0, i.physicalQOH - i.systemCommittedQty - prot);
  }, 0);

  const handleFieldChange = (index: number, field: keyof InvOnHand, val: any) => {
    const target = { ...inventory[index], [field]: val };
    onUpdateInventory(index, target);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInventory({ ...newInv });
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Physical Inventory On-Hand (Sheet 05)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Real-time physical inventory snapshot across 28 distribution hubs. Calculates dynamic net transferable stock by shielding safety stocks (Ratio: {config.safetyStockProtectRatio * 100}%) and first-month forecast reserves.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KPICard
          label="Total Physical On-Hand"
          value={`${totalPhysicalQOH.toLocaleString()} units`}
          subtext="Warehouse physical count"
        />
        <KPICard
          label="Net Transferable Stock"
          value={`${totalNetTransferable.toLocaleString()} units`}
          subtext="Available for store transfers & customer fulfillment"
        />
        <KPICard
          label="Total Inventory Valuation"
          value={`${currency}${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtext="Moving weighted average asset valuation"
        />
      </div>

      {/* Quick Add Inventory */}
      <div className="ofia-card p-5">
        <h3 className="font-garamond text-[17px] font-bold text-[#051C2C] mb-3">
          Add Inventory Stock Record
        </h3>
        <form onSubmit={handleAddNew} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Hub Location</label>
            <input
              type="text"
              required
              value={newInv.locationCode}
              onChange={(e) => setNewInv({ ...newInv, locationCode: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">SKU Code</label>
            <input
              type="text"
              required
              value={newInv.skuCode}
              onChange={(e) => setNewInv({ ...newInv, skuCode: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Physical QOH</label>
            <input
              type="number"
              min={0}
              required
              value={newInv.physicalQOH}
              onChange={(e) => setNewInv({ ...newInv, physicalQOH: Number(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell text-right"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Committed</label>
            <input
              type="number"
              min={0}
              value={newInv.systemCommittedQty}
              onChange={(e) => setNewInv({ ...newInv, systemCommittedQty: Number(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell text-right"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Safety Stock</label>
            <input
              type="number"
              min={0}
              value={newInv.minSafetyStock}
              onChange={(e) => setNewInv({ ...newInv, minSafetyStock: Number(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell text-right"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Unit Cost</label>
            <input
              type="number"
              step="0.01"
              min={0}
              value={newInv.unitCost}
              onChange={(e) => setNewInv({ ...newInv, unitCost: Number(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell text-right"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Stock</span>
            </button>
          </div>
        </form>
      </div>

      {/* Table Card */}
      <div className="ofia-card p-6">
        <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
          <table className="w-full ofia-table text-left">
            <thead>
              <tr>
                <th className="px-3 py-2.5">Location</th>
                <th className="px-3 py-2.5">SKU Code</th>
                <th className="px-3 py-2.5 text-right">Physical QOH</th>
                <th className="px-3 py-2.5 text-right">Committed</th>
                <th className="px-3 py-2.5 text-right">Min Safety</th>
                <th className="px-3 py-2.5 text-right">FMD Reserve</th>
                <th className="px-3 py-2.5 text-right">Unit Cost</th>
                <th className="px-3 py-2.5 text-right">Protected Qty</th>
                <th className="px-3 py-2.5 text-right">Net Transferable</th>
                <th className="px-3 py-2.5 text-right">Valuation</th>
                <th className="px-3 py-2.5 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((row, idx) => {
                const protectedQty =
                  row.minSafetyStock * config.safetyStockProtectRatio +
                  row.fmdReserveQty * config.fmdProtectEnabled;
                const netTransferable = Math.max(0, row.physicalQOH - row.systemCommittedQty - protectedQty);
                const valuation = row.physicalQOH * row.unitCost;

                return (
                  <tr key={idx} className="hover:bg-[#F5F5F2]/40">
                    <td className="px-2 py-1.5 w-[90px]">
                      <input
                        type="text"
                        value={row.locationCode}
                        onChange={(e) => handleFieldChange(idx, 'locationCode', e.target.value)}
                        className="w-full px-2 py-1 text-[12px] font-medium text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[110px]">
                      <input
                        type="text"
                        value={row.skuCode}
                        onChange={(e) => handleFieldChange(idx, 'skuCode', e.target.value)}
                        className="w-full px-2 py-1 text-[12px] font-mono text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[95px]">
                      <input
                        type="number"
                        min={0}
                        value={row.physicalQOH}
                        onChange={(e) => handleFieldChange(idx, 'physicalQOH', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-[12px] text-right font-semibold text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[85px]">
                      <input
                        type="number"
                        min={0}
                        value={row.systemCommittedQty}
                        onChange={(e) => handleFieldChange(idx, 'systemCommittedQty', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[85px]">
                      <input
                        type="number"
                        min={0}
                        value={row.minSafetyStock}
                        onChange={(e) => handleFieldChange(idx, 'minSafetyStock', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[85px]">
                      <input
                        type="number"
                        min={0}
                        value={row.fmdReserveQty}
                        onChange={(e) => handleFieldChange(idx, 'fmdReserveQty', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[95px]">
                      <input
                        type="number"
                        step="0.01"
                        min={0}
                        value={row.unitCost}
                        onChange={(e) => handleFieldChange(idx, 'unitCost', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>

                    {/* Calculated Columns */}
                    <td className="px-3 py-2 text-right tabular-nums text-[#888888]">
                      {protectedQty.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums font-bold text-[#2251FF]">
                      {netTransferable.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums font-medium text-[#051C2C]">
                      {currency}{valuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-2 py-1.5 text-center w-[50px]">
                      <button
                        onClick={() => onDeleteInventory(idx)}
                        className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors"
                        title="Delete stock position"
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
    </div>
  );
};
