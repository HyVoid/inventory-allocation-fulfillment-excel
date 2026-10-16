/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, Plus, Trash2, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { ReservationEntry, UnifiedSupplyEntry, ConfigParams } from '../types/ofia.ts';
import { diffDays, getTodayStr } from '../engine/calculationEngine.ts';
import { KPICard } from '../components/KPICard.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';

interface ReservationsViewProps {
  reservations: ReservationEntry[];
  supplyLedger: UnifiedSupplyEntry[];
  config: ConfigParams;
  onUpdateReservation: (index: number, updated: ReservationEntry) => void;
  onAddReservation: (item: ReservationEntry) => void;
  onDeleteReservation: (index: number) => void;
}

export const ReservationsView: React.FC<ReservationsViewProps> = ({
  reservations,
  supplyLedger,
  config,
  onUpdateReservation,
  onAddReservation,
  onDeleteReservation,
}) => {
  const [newRes, setNewRes] = useState<ReservationEntry>({
    reservationId: `RES-${String(reservations.length + 1).padStart(3, '0')}`,
    orderId: 'SO-9001',
    orderLineId: '1',
    skuCode: 'SKU-101',
    assignedSupplyUid: supplyLedger[0]?.supplyUid || 'QOH|DC01|SKU-101',
    reservedQty: 20,
    reservationStatus: 'Active',
    createdDate: getTodayStr(),
  });

  const today = getTodayStr();
  const supplyUidSet = new Set(supplyLedger.map((s) => s.supplyUid));

  const totalActiveQty = reservations
    .filter((r) => r.reservationStatus === 'Active')
    .reduce((s, r) => s + r.reservedQty, 0);

  const staleReservationsCount = reservations.filter(
    (r) => r.reservationStatus === 'Active' && diffDays(today, r.createdDate) > config.reservationExpiryDays
  ).length;

  const handleFieldChange = (index: number, field: keyof ReservationEntry, val: any) => {
    onUpdateReservation(index, { ...reservations[index], [field]: val });
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReservation({ ...newRes });
    setNewRes({
      ...newRes,
      reservationId: `RES-${String(reservations.length + 2).padStart(3, '0')}`,
    });
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Lock className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Persistent Reservations Ledger (Sheet 09)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Transactional locking ledger preventing sales order stock raiding by hard-committing quantities against specific supply UIDs. Stale reservations exceeding {config.reservationExpiryDays} days are flagged for cleanup.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          label="Total Active Reserved"
          value={`${totalActiveQty.toLocaleString()} units`}
          subtext="Firm locked inventory pool"
        />
        <KPICard
          label="Total Reservation Records"
          value={reservations.length}
          subtext="Historical and active allocations"
        />
        <KPICard
          label="Stale Reservations"
          value={staleReservationsCount}
          subtext={`Active longer than ${config.reservationExpiryDays} days`}
          isAnomaly={staleReservationsCount > 0}
        />
        <KPICard
          label="Protection Holding Period"
          value={`${config.reservationExpiryDays} Days`}
          subtext="Config B14 threshold before audit alarm"
        />
      </div>

      {/* Add Form Card */}
      <div className="ofia-card p-5">
        <h3 className="font-garamond text-[17px] font-bold text-[#051C2C] mb-3">
          Lock New Inventory Reservation
        </h3>
        <form onSubmit={handleAddNew} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Res ID</label>
            <input
              type="text"
              required
              value={newRes.reservationId}
              onChange={(e) => setNewRes({ ...newRes, reservationId: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Order ID</label>
            <input
              type="text"
              required
              value={newRes.orderId}
              onChange={(e) => setNewRes({ ...newRes, orderId: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">SKU Code</label>
            <input
              type="text"
              required
              value={newRes.skuCode}
              onChange={(e) => setNewRes({ ...newRes, skuCode: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell font-mono"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Target Supply UID</label>
            <select
              value={newRes.assignedSupplyUid}
              onChange={(e) => setNewRes({ ...newRes, assignedSupplyUid: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell font-mono"
            >
              {supplyLedger.map((s) => (
                <option key={s.supplyUid} value={s.supplyUid}>
                  {s.supplyUid} (Avail: {s.netAvailableForAlloc})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Qty</label>
            <input
              type="number"
              min={1}
              required
              value={newRes.reservedQty}
              onChange={(e) => setNewRes({ ...newRes, reservedQty: Number(e.target.value) || 1 })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell text-right"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Lock UID</span>
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
                <th className="px-3 py-2.5">Res ID</th>
                <th className="px-3 py-2.5">Order Ref</th>
                <th className="px-3 py-2.5">SKU Code</th>
                <th className="px-3 py-2.5">Assigned Supply UID</th>
                <th className="px-3 py-2.5 text-right">Locked Qty</th>
                <th className="px-3 py-2.5 text-center">Status</th>
                <th className="px-3 py-2.5">Created Date</th>
                <th className="px-3 py-2.5 text-right">Age (Days)</th>
                <th className="px-3 py-2.5 text-center">Integrity Audit</th>
                <th className="px-3 py-2.5 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((row, idx) => {
                const daysActive = diffDays(today, row.createdDate);
                const isStale = row.reservationStatus === 'Active' && daysActive > config.reservationExpiryDays;
                const uidExists = supplyUidSet.has(row.assignedSupplyUid);

                return (
                  <tr key={idx} className={`hover:bg-[#F5F5F2]/40 ${isStale ? 'anomaly-row' : ''}`}>
                    <td className="px-2 py-1.5 w-[100px]">
                      <input
                        type="text"
                        value={row.reservationId}
                        onChange={(e) => handleFieldChange(idx, 'reservationId', e.target.value)}
                        className="w-full px-2 py-1 text-[12px] font-mono font-medium rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[110px]">
                      <input
                        type="text"
                        value={row.orderId}
                        onChange={(e) => handleFieldChange(idx, 'orderId', e.target.value)}
                        className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[100px]">
                      <input
                        type="text"
                        value={row.skuCode}
                        onChange={(e) => handleFieldChange(idx, 'skuCode', e.target.value)}
                        className="w-full px-2 py-1 text-[12px] font-mono rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        type="text"
                        value={row.assignedSupplyUid}
                        onChange={(e) => handleFieldChange(idx, 'assignedSupplyUid', e.target.value)}
                        className="w-full px-2 py-1 text-[12px] font-mono rounded editable-cell border border-[#E8E8E6] text-[#051C2C]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[90px]">
                      <input
                        type="number"
                        min={1}
                        value={row.reservedQty}
                        onChange={(e) => handleFieldChange(idx, 'reservedQty', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-[12px] text-right font-bold text-[#2251FF] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-2 py-1.5 w-[110px] text-center">
                      <select
                        value={row.reservationStatus}
                        onChange={(e) => handleFieldChange(idx, 'reservationStatus', e.target.value)}
                        className="px-2 py-1 text-[11px] font-semibold rounded editable-cell border border-[#E8E8E6]"
                      >
                        <option value="Active">Active</option>
                        <option value="Released">Released</option>
                        <option value="Fulfilled">Fulfilled</option>
                      </select>
                    </td>
                    <td className="px-2 py-1.5 w-[130px]">
                      <input
                        type="date"
                        value={row.createdDate}
                        onChange={(e) => handleFieldChange(idx, 'createdDate', e.target.value)}
                        className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                      />
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-[#888888]">
                      {daysActive}d
                    </td>
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      {!uidExists ? (
                        <span className="text-[11px] font-bold text-[#D32F2F]">Broken UID</span>
                      ) : isStale ? (
                        <span className="text-[11px] font-bold text-[#D32F2F]">Stale Overstay</span>
                      ) : (
                        <span className="text-[11px] font-medium text-[#00C853]">Valid</span>
                      )}
                    </td>
                    <td className="px-2 py-1.5 text-center w-[50px]">
                      <button
                        onClick={() => onDeleteReservation(idx)}
                        className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors"
                        title="Delete Reservation"
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
