/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Ship, ShoppingBag, Plus, Trash2, ArrowRight } from 'lucide-react';
import { POPipeline, InTransitOTW, ConfigParams } from '../types/ofia.ts';
import { addDays } from '../engine/calculationEngine.ts';
import { KPICard } from '../components/KPICard.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';

interface PipelineViewProps {
  pos: POPipeline[];
  inTransit: InTransitOTW[];
  config: ConfigParams;
  onUpdatePO: (index: number, updated: POPipeline) => void;
  onAddPO: (item: POPipeline) => void;
  onDeletePO: (index: number) => void;
  onUpdateInTransit: (index: number, updated: InTransitOTW) => void;
  onAddInTransit: (item: InTransitOTW) => void;
  onDeleteInTransit: (index: number) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  pos,
  inTransit,
  config,
  onUpdatePO,
  onAddPO,
  onDeletePO,
  onUpdateInTransit,
  onAddInTransit,
  onDeleteInTransit,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'PO' | 'OTW'>('PO');

  const totalPOOpen = pos.reduce((s, p) => s + p.poOpenQty, 0);
  const totalInTransit = inTransit.reduce((s, o) => s + o.inTransitQty, 0);

  // PO handlers
  const handlePOChange = (idx: number, field: keyof POPipeline, val: any) => {
    onUpdatePO(idx, { ...pos[idx], [field]: val });
  };

  // OTW handlers
  const handleOTWChange = (idx: number, field: keyof InTransitOTW, val: any) => {
    onUpdateInTransit(idx, { ...inTransit[idx], [field]: val });
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Ship className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Purchase Orders &amp; In-Transit OTW (Sheets 06 &amp; 07)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Dual pipeline tracker bridging open supplier contracts and maritime container bill of ladings. Eliminates double-counting by netting active ocean containers from open PO lines.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          label="Total PO Open Qty"
          value={`${totalPOOpen.toLocaleString()} units`}
          subtext={`${pos.length} open purchase order lines`}
        />
        <KPICard
          label="Ocean In-Transit (OTW)"
          value={`${totalInTransit.toLocaleString()} units`}
          subtext={`${inTransit.length} active sea freight containers`}
        />
        <KPICard
          label="Net Pending Production"
          value={`${Math.max(0, totalPOOpen - totalInTransit).toLocaleString()} units`}
          subtext="Undelivered balance in factory production"
        />
        <KPICard
          label="Port Customs Buffer"
          value={`${config.customsPortBufferDays} Days`}
          subtext="Config B10 added to Port ETA"
        />
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-[#E8E8E6] gap-4">
        <button
          onClick={() => setActiveSubTab('PO')}
          className={`pb-2.5 text-[13px] font-semibold transition-colors relative ${
            activeSubTab === 'PO' ? 'text-[#051C2C]' : 'text-[#888888] hover:text-[#051C2C]'
          }`}
        >
          <span>Purchase Orders Pipeline (06_PO_Pipeline)</span>
          {activeSubTab === 'PO' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2251FF]" />}
        </button>

        <button
          onClick={() => setActiveSubTab('OTW')}
          className={`pb-2.5 text-[13px] font-semibold transition-colors relative ${
            activeSubTab === 'OTW' ? 'text-[#051C2C]' : 'text-[#888888] hover:text-[#051C2C]'
          }`}
        >
          <span>Maritime Containers On-The-Water (07_In_Transit_OTW)</span>
          {activeSubTab === 'OTW' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2251FF]" />}
        </button>
      </div>

      {/* PO View */}
      {activeSubTab === 'PO' && (
        <div className="ofia-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#888888]">
              PO Pipeline Records ({pos.length}) — Pale yellow cells are directly editable
            </span>
            <button
              onClick={() =>
                onAddPO({
                  poNumber: `PO-${new Date().getFullYear()}-${100 + pos.length}`,
                  poLineId: '1',
                  vendorId: 'V-101',
                  skuCode: 'SKU-101',
                  poOrderedQty: 100,
                  poOpenQty: 100,
                  poPromisedDate: addDays(new Date().toISOString().split('T')[0], 30),
                  poDestLocation: 'DC01',
                  poStatus: 'Open',
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add PO Line</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
            <table className="w-full ofia-table text-left">
              <thead>
                <tr>
                  <th className="px-3 py-2.5">PO Number</th>
                  <th className="px-3 py-2.5">Line</th>
                  <th className="px-3 py-2.5">Vendor</th>
                  <th className="px-3 py-2.5">SKU Code</th>
                  <th className="px-3 py-2.5 text-right">Ordered Qty</th>
                  <th className="px-3 py-2.5 text-right">Open Qty</th>
                  <th className="px-3 py-2.5">Promised Date</th>
                  <th className="px-3 py-2.5">Dest Hub</th>
                  <th className="px-3 py-2.5 text-right">Linked OTW</th>
                  <th className="px-3 py-2.5 text-right">Net Factory Supply</th>
                  <th className="px-3 py-2.5 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {pos.map((row, idx) => {
                  const linkedOTW = inTransit
                    .filter((o) => o.refPoNumber === row.poNumber && o.refPoLineId === row.poLineId)
                    .reduce((sum, o) => sum + o.inTransitQty, 0);
                  const netPending = Math.max(0, row.poOpenQty - linkedOTW);

                  return (
                    <tr key={idx} className="hover:bg-[#F5F5F2]/40">
                      <td className="px-2 py-1.5 w-[130px]">
                        <input
                          type="text"
                          value={row.poNumber}
                          onChange={(e) => handlePOChange(idx, 'poNumber', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] font-medium text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[60px]">
                        <input
                          type="text"
                          value={row.poLineId}
                          onChange={(e) => handlePOChange(idx, 'poLineId', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] text-center rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[90px]">
                        <input
                          type="text"
                          value={row.vendorId}
                          onChange={(e) => handlePOChange(idx, 'vendorId', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[110px]">
                        <input
                          type="text"
                          value={row.skuCode}
                          onChange={(e) => handlePOChange(idx, 'skuCode', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] font-mono rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[95px]">
                        <input
                          type="number"
                          min={0}
                          value={row.poOrderedQty}
                          onChange={(e) => handlePOChange(idx, 'poOrderedQty', Number(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-[12px] text-right rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[95px]">
                        <input
                          type="number"
                          min={0}
                          value={row.poOpenQty}
                          onChange={(e) => handlePOChange(idx, 'poOpenQty', Number(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-[12px] text-right font-semibold text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[130px]">
                        <input
                          type="date"
                          value={row.poPromisedDate}
                          onChange={(e) => handlePOChange(idx, 'poPromisedDate', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[90px]">
                        <input
                          type="text"
                          value={row.poDestLocation}
                          onChange={(e) => handlePOChange(idx, 'poDestLocation', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>

                      {/* Deduplication Calculations */}
                      <td className="px-3 py-2 text-right tabular-nums text-[#888888]">
                        {linkedOTW > 0 ? `${linkedOTW} u` : '-'}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums font-bold text-[#2251FF]">
                        {netPending.toLocaleString()} u
                      </td>

                      <td className="px-2 py-1.5 text-center w-[50px]">
                        <button
                          onClick={() => onDeletePO(idx)}
                          className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors"
                          title="Delete PO Line"
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

      {/* OTW View */}
      {activeSubTab === 'OTW' && (
        <div className="ofia-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#888888]">
              Maritime Cargo Shipments ({inTransit.length}) — Pale yellow cells are directly editable
            </span>
            <button
              onClick={() =>
                onAddInTransit({
                  containerId: `MSKU-${Math.floor(1000 + Math.random() * 9000)}`,
                  refPoNumber: pos[0]?.poNumber || 'PO-2026-081',
                  refPoLineId: '1',
                  skuCode: 'SKU-101',
                  inTransitQty: 50,
                  vesselETD: new Date().toISOString().split('T')[0],
                  portETA: addDays(new Date().toISOString().split('T')[0], 14),
                  destLocation: 'DC01',
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Container</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
            <table className="w-full ofia-table text-left">
              <thead>
                <tr>
                  <th className="px-3 py-2.5">Container / B/L</th>
                  <th className="px-3 py-2.5">Ref PO</th>
                  <th className="px-3 py-2.5">Line</th>
                  <th className="px-3 py-2.5">SKU Code</th>
                  <th className="px-3 py-2.5 text-right">In-Transit Qty</th>
                  <th className="px-3 py-2.5">Vessel ETD</th>
                  <th className="px-3 py-2.5">Port ETA</th>
                  <th className="px-3 py-2.5">Whs Available Date</th>
                  <th className="px-3 py-2.5">Dest Hub</th>
                  <th className="px-3 py-2.5 text-center">PO Match</th>
                  <th className="px-3 py-2.5 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {inTransit.map((row, idx) => {
                  const whsAvailableDate = addDays(row.portETA, config.customsPortBufferDays);
                  const poExists = pos.some((p) => p.poNumber === row.refPoNumber && p.poLineId === row.refPoLineId);

                  return (
                    <tr key={idx} className="hover:bg-[#F5F5F2]/40">
                      <td className="px-2 py-1.5 w-[130px]">
                        <input
                          type="text"
                          value={row.containerId}
                          onChange={(e) => handleOTWChange(idx, 'containerId', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] font-mono font-medium text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[130px]">
                        <input
                          type="text"
                          value={row.refPoNumber}
                          onChange={(e) => handleOTWChange(idx, 'refPoNumber', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[60px]">
                        <input
                          type="text"
                          value={row.refPoLineId}
                          onChange={(e) => handleOTWChange(idx, 'refPoLineId', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] text-center rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[110px]">
                        <input
                          type="text"
                          value={row.skuCode}
                          onChange={(e) => handleOTWChange(idx, 'skuCode', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] font-mono rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[95px]">
                        <input
                          type="number"
                          min={0}
                          value={row.inTransitQty}
                          onChange={(e) => handleOTWChange(idx, 'inTransitQty', Number(e.target.value) || 0)}
                          className="w-full px-2 py-1 text-[12px] text-right font-semibold text-[#051C2C] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[130px]">
                        <input
                          type="date"
                          value={row.vesselETD}
                          onChange={(e) => handleOTWChange(idx, 'vesselETD', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>
                      <td className="px-2 py-1.5 w-[130px]">
                        <input
                          type="date"
                          value={row.portETA}
                          onChange={(e) => handleOTWChange(idx, 'portETA', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>

                      {/* Calculated Warehouse Ready Date */}
                      <td className="px-3 py-2 tabular-nums text-[12px] font-semibold text-[#2251FF] whitespace-nowrap">
                        {whsAvailableDate}
                      </td>

                      <td className="px-2 py-1.5 w-[90px]">
                        <input
                          type="text"
                          value={row.destLocation}
                          onChange={(e) => handleOTWChange(idx, 'destLocation', e.target.value)}
                          className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                        />
                      </td>

                      <td className="px-3 py-2 text-center whitespace-nowrap">
                        {poExists ? (
                          <span className="text-[11px] font-semibold text-[#00C853]">Linked</span>
                        ) : (
                          <span className="text-[11px] font-semibold text-[#D32F2F]">Orphan</span>
                        )}
                      </td>

                      <td className="px-2 py-1.5 text-center w-[50px]">
                        <button
                          onClick={() => onDeleteInTransit(idx)}
                          className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors"
                          title="Delete Container"
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
