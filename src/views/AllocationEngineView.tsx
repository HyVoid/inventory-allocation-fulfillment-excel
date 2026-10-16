/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layers, Info, Download, ArrowRight } from 'lucide-react';
import { AllocationEngineRow } from '../types/ofia.ts';
import { StatusBadge } from '../components/StatusBadge.tsx';

interface AllocationEngineViewProps {
  allocationResults: AllocationEngineRow[];
  currency: string;
}

export const AllocationEngineView: React.FC<AllocationEngineViewProps> = ({
  allocationResults,
  currency,
}) => {
  const [skuFilter, setSkuFilter] = useState('ALL');

  const skus = Array.from(new Set(allocationResults.map((r) => r.demand.skuCode))).sort();

  const filtered = allocationResults.filter((r) => {
    return skuFilter === 'ALL' || r.demand.skuCode === skuFilter;
  });

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Multi-Echelon Allocation Engine (Sheet 10)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Mathematical waterfall routing order demands through five priority echelons: Local Store &rarr; Nearest Store &rarr; Central DC &rarr; In-Transit OTW &rarr; Open PO.
        </p>
      </div>

      {/* Logic Summary Banner */}
      <div className="p-4 bg-white border border-[#E8E8E6] rounded-[10px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px]">
        <div className="space-y-1">
          <span className="font-semibold text-[#051C2C] uppercase tracking-wider text-[11px] block">
            Echelon Priority Sequence: LOCAL &rarr; NEAREST (&lt;300km) &rarr; DC &rarr; OTW &rarr; PO
          </span>
          <p className="text-[#888888]">
            Each demand draws available net inventory in sequence. If Tier 1 cannot satisfy 100% of required quantity, remaining balance overflows automatically to Tier 2, then Tier 3, until met or genuine gap identified.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-[11px] font-semibold uppercase text-[#888888]">SKU Filter:</label>
          <select
            value={skuFilter}
            onChange={(e) => setSkuFilter(e.target.value)}
            className="px-3 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] focus:outline-none focus:border-[#2251FF] bg-white text-[#051C2C]"
          >
            <option value="ALL">All SKUs ({skus.length})</option>
            {skus.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Cascade Calculation Table */}
      <div className="ofia-card p-6 overflow-hidden">
        <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
          <table className="w-full ofia-table text-left">
            <thead>
              <tr>
                <th colSpan={4} className="bg-[#051C2C]/5 text-center border-r border-[#E8E8E6] py-2">
                  Demand Inputs (04_Sales_Demand)
                </th>
                <th colSpan={2} className="bg-[#2251FF]/5 text-center border-r border-[#E8E8E6] py-2">
                  Tier 1: Local Store
                </th>
                <th colSpan={2} className="bg-[#2251FF]/10 text-center border-r border-[#E8E8E6] py-2">
                  Tier 2: Nearest Hub
                </th>
                <th colSpan={2} className="bg-[#2251FF]/5 text-center border-r border-[#E8E8E6] py-2">
                  Tier 3: Central DC
                </th>
                <th colSpan={2} className="bg-[#2251FF]/10 text-center border-r border-[#E8E8E6] py-2">
                  Tier 4: OTW Container
                </th>
                <th colSpan={2} className="bg-[#2251FF]/5 text-center border-r border-[#E8E8E6] py-2">
                  Tier 5: Open PO
                </th>
                <th colSpan={3} className="bg-[#051C2C]/10 text-center py-2">
                  Decision Output (11_WhatIf)
                </th>
              </tr>
              <tr>
                {/* Demand Inputs */}
                <th className="px-2.5 py-1.5">Order</th>
                <th className="px-2.5 py-1.5">SKU</th>
                <th className="px-2.5 py-1.5">Dest</th>
                <th className="px-2.5 py-1.5 text-right border-r border-[#E8E8E6]">Req Qty</th>

                {/* Tier 1 */}
                <th className="px-2.5 py-1.5 text-right">T1 Qty</th>
                <th className="px-2.5 py-1.5 border-r border-[#E8E8E6]">T1 ETA</th>

                {/* Tier 2 */}
                <th className="px-2.5 py-1.5 text-right">T2 Qty</th>
                <th className="px-2.5 py-1.5 border-r border-[#E8E8E6]">T2 Origin</th>

                {/* Tier 3 */}
                <th className="px-2.5 py-1.5 text-right">T3 Qty</th>
                <th className="px-2.5 py-1.5 border-r border-[#E8E8E6]">T3 ETA</th>

                {/* Tier 4 */}
                <th className="px-2.5 py-1.5 text-right">T4 Qty</th>
                <th className="px-2.5 py-1.5 border-r border-[#E8E8E6]">T4 Ref</th>

                {/* Tier 5 */}
                <th className="px-2.5 py-1.5 text-right">T5 Qty</th>
                <th className="px-2.5 py-1.5 border-r border-[#E8E8E6]">T5 Ref</th>

                {/* Outputs */}
                <th className="px-2.5 py-1.5 text-right">Total Alloc</th>
                <th className="px-2.5 py-1.5 text-right">Net Gap</th>
                <th className="px-2.5 py-1.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => {
                return (
                  <tr key={idx} className="hover:bg-[#F5F5F2]/80 transition-colors">
                    {/* Demand Inputs */}
                    <td className="px-2.5 py-2 font-medium text-[#051C2C] whitespace-nowrap">
                      {row.demand.orderId}
                    </td>
                    <td className="px-2.5 py-2 font-mono text-[11px] text-[#051C2C]">
                      {row.demand.skuCode}
                    </td>
                    <td className="px-2.5 py-2 text-[#051C2C]">
                      {row.demand.shipToLocation}
                    </td>
                    <td className="px-2.5 py-2 text-right font-semibold text-[#051C2C] tabular-nums border-r border-[#E8E8E6]">
                      {row.demand.reqQty.toLocaleString()}
                    </td>

                    {/* Tier 1 */}
                    <td className={`px-2.5 py-2 text-right tabular-nums ${row.echelon1_LocalQty > 0 ? 'text-[#2251FF] font-semibold' : 'text-[#888888]'}`}>
                      {row.echelon1_LocalQty || '-'}
                    </td>
                    <td className="px-2.5 py-2 text-[11px] text-[#888888] border-r border-[#E8E8E6] whitespace-nowrap">
                      {row.echelon1_LocalQty > 0 ? row.echelon1_EstArrival : '-'}
                    </td>

                    {/* Tier 2 */}
                    <td className={`px-2.5 py-2 text-right tabular-nums ${row.echelon2_NearestQty > 0 ? 'text-[#2251FF] font-semibold' : 'text-[#888888]'}`}>
                      {row.echelon2_NearestQty || '-'}
                    </td>
                    <td className="px-2.5 py-2 text-[11px] text-[#888888] border-r border-[#E8E8E6] whitespace-nowrap">
                      {row.echelon2_NearestQty > 0 ? row.echelon2_NearestLoc : '-'}
                    </td>

                    {/* Tier 3 */}
                    <td className={`px-2.5 py-2 text-right tabular-nums ${row.echelon3_DCQty > 0 ? 'text-[#2251FF] font-semibold' : 'text-[#888888]'}`}>
                      {row.echelon3_DCQty || '-'}
                    </td>
                    <td className="px-2.5 py-2 text-[11px] text-[#888888] border-r border-[#E8E8E6] whitespace-nowrap">
                      {row.echelon3_DCQty > 0 ? row.echelon3_EstArrival : '-'}
                    </td>

                    {/* Tier 4 */}
                    <td className={`px-2.5 py-2 text-right tabular-nums ${row.echelon4_OTWQty > 0 ? 'text-[#2251FF] font-semibold' : 'text-[#888888]'}`}>
                      {row.echelon4_OTWQty || '-'}
                    </td>
                    <td className="px-2.5 py-2 text-[11px] text-[#888888] border-r border-[#E8E8E6] whitespace-nowrap">
                      {row.echelon4_OTWQty > 0 ? row.echelon4_RefContainer : '-'}
                    </td>

                    {/* Tier 5 */}
                    <td className={`px-2.5 py-2 text-right tabular-nums ${row.echelon5_POQty > 0 ? 'text-[#2251FF] font-semibold' : 'text-[#888888]'}`}>
                      {row.echelon5_POQty || '-'}
                    </td>
                    <td className="px-2.5 py-2 text-[11px] text-[#888888] border-r border-[#E8E8E6] whitespace-nowrap">
                      {row.echelon5_POQty > 0 ? row.echelon5_RefPO : '-'}
                    </td>

                    {/* Outputs */}
                    <td className="px-2.5 py-2 text-right font-bold text-[#051C2C] tabular-nums">
                      {row.allocatedTotalQty.toLocaleString()}
                    </td>
                    <td className={`px-2.5 py-2 text-right font-bold tabular-nums ${row.unmetQtyGap > 0 ? 'text-[#D32F2F]' : 'text-[#888888]'}`}>
                      {row.unmetQtyGap > 0 ? row.unmetQtyGap.toLocaleString() : '0'}
                    </td>
                    <td className="px-2.5 py-2 text-center whitespace-nowrap">
                      <StatusBadge label={row.fulfillmentStatus} />
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
