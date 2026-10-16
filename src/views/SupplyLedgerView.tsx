/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Database, Filter, Search, Download } from 'lucide-react';
import { UnifiedSupplyEntry } from '../types/ofia.ts';
import { KPICard } from '../components/KPICard.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { DataBar } from '../components/DataBar.tsx';

interface SupplyLedgerViewProps {
  supplyLedger: UnifiedSupplyEntry[];
  currency: string;
}

export const SupplyLedgerView: React.FC<SupplyLedgerViewProps> = ({
  supplyLedger,
  currency,
}) => {
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Summary KPIs
  const summary = useMemo(() => {
    const totalLines = supplyLedger.length;
    const totalGross = supplyLedger.reduce((s, e) => s + e.grossAvailableQty, 0);
    const totalReserved = supplyLedger.reduce((s, e) => s + e.activeReservedQty, 0);
    const totalNetAvailable = supplyLedger.reduce((s, e) => s + e.netAvailableForAlloc, 0);
    const overAllocatedCount = supplyLedger.filter((e) => e.healthStatus === 'Over-Allocated').length;

    const qohGross = supplyLedger.filter((e) => e.supplyType === 'QOH').reduce((s, e) => s + e.grossAvailableQty, 0);
    const otwGross = supplyLedger.filter((e) => e.supplyType === 'OTW').reduce((s, e) => s + e.grossAvailableQty, 0);
    const poGross = supplyLedger.filter((e) => e.supplyType === 'PO').reduce((s, e) => s + e.grossAvailableQty, 0);

    return {
      totalLines,
      totalGross,
      totalReserved,
      totalNetAvailable,
      overAllocatedCount,
      qohGross,
      otwGross,
      poGross,
    };
  }, [supplyLedger]);

  const maxGross = useMemo(() => {
    return Math.max(...supplyLedger.map((e) => e.grossAvailableQty), 100);
  }, [supplyLedger]);

  // Filtered entries
  const filtered = useMemo(() => {
    return supplyLedger.filter((entry) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        entry.supplyUid.toLowerCase().includes(q) ||
        entry.skuCode.toLowerCase().includes(q) ||
        entry.supplyLocation.toLowerCase().includes(q);

      const matchType = typeFilter === 'ALL' || entry.supplyType === typeFilter;

      return matchSearch && matchType;
    });
  }, [supplyLedger, searchTerm, typeFilter]);

  const handleExportCsv = () => {
    const headers = [
      'Supply_UID',
      'Supply_Type',
      'Location',
      'SKU_Code',
      'Ready_Date',
      'Gross_Available_Qty',
      'Active_Reserved_Qty',
      'Net_Available_For_Alloc',
      'Health_Status',
    ];
    const csvRows = [headers.join(',')];

    for (const r of filtered) {
      csvRows.push(
        [
          r.supplyUid,
          r.supplyType,
          r.supplyLocation,
          r.skuCode,
          r.supplyReadyDate,
          r.grossAvailableQty,
          r.activeReservedQty,
          r.netAvailableForAlloc,
          r.healthStatus,
        ].join(',')
      );
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Unified_Supply_Ledger_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Unified Supply Ledger (Sheet 08)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Single consolidated source of truth eliminating duplicate counting between PO pipelines and maritime in-transit shipments, linked with active reservation locks.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          label="Total Gross Supply"
          value={`${summary.totalGross.toLocaleString()} u`}
          subtext={`QOH: ${summary.qohGross.toLocaleString()} | OTW: ${summary.otwGross.toLocaleString()} | PO: ${summary.poGross.toLocaleString()}`}
        />
        <KPICard
          label="Active Reservations"
          value={`${summary.totalReserved.toLocaleString()} u`}
          subtext="Firm commitments locked against supply UIDs"
        />
        <KPICard
          label="Net Available for Allocation"
          value={`${summary.totalNetAvailable.toLocaleString()} u`}
          subtext="Freely available across all network tiers"
        />
        <KPICard
          label="Over-Allocated Pools"
          value={summary.overAllocatedCount}
          subtext="Supply UIDs where reservations exceed capacity"
          isAnomaly={summary.overAllocatedCount > 0}
        />
      </div>

      {/* Main Table Card */}
      <div className="ofia-card p-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Supply UID, SKU, Location..."
                className="w-full pl-9 pr-3 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] focus:outline-none focus:border-[#2251FF] bg-white"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] focus:outline-none focus:border-[#2251FF] bg-white text-[#051C2C]"
            >
              <option value="ALL">All Supply Types ({supplyLedger.length})</option>
              <option value="QOH">Physical Inventory (QOH)</option>
              <option value="OTW">Maritime In-Transit (OTW)</option>
              <option value="PO">Deduplicated Pipeline (PO)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[12px] text-[#888888]">
              Showing <strong className="text-[#051C2C]">{filtered.length}</strong> supplies
            </span>
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-[6px] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
          <table className="w-full ofia-table text-left">
            <thead>
              <tr>
                <th className="px-3 py-2.5">Supply UID</th>
                <th className="px-3 py-2.5">Type</th>
                <th className="px-3 py-2.5">Location</th>
                <th className="px-3 py-2.5">SKU Code</th>
                <th className="px-3 py-2.5">Available Date</th>
                <th className="px-3 py-2.5 text-right">Gross Qty</th>
                <th className="px-3 py-2.5">Capacity Bar</th>
                <th className="px-3 py-2.5 text-right">Reserved Qty</th>
                <th className="px-3 py-2.5 text-right">Net Available</th>
                <th className="px-3 py-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-[#888888]">
                    No supply records match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((entry, idx) => {
                  const isOver = entry.healthStatus === 'Over-Allocated';
                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#F5F5F2]/80 transition-colors ${
                        isOver ? 'anomaly-row' : ''
                      }`}
                    >
                      <td className="px-3 py-2 font-mono text-[11px] font-medium text-[#051C2C] whitespace-nowrap">
                        {entry.supplyUid}
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#051C2C]/5 text-[#051C2C]">
                          {entry.supplyType}
                        </span>
                      </td>

                      <td className="px-3 py-2 font-medium text-[#051C2C]">
                        {entry.supplyLocation}
                      </td>

                      <td className="px-3 py-2 font-mono text-[12px] text-[#051C2C]">
                        {entry.skuCode}
                      </td>

                      <td className="px-3 py-2 text-[#888888] tabular-nums whitespace-nowrap text-[12px]">
                        {entry.supplyReadyDate}
                      </td>

                      <td className="px-3 py-2 text-right font-semibold text-[#051C2C] tabular-nums">
                        {entry.grossAvailableQty.toLocaleString()}
                      </td>

                      <td className="px-3 py-2">
                        <DataBar value={entry.grossAvailableQty} max={maxGross} showText={false} />
                      </td>

                      <td className="px-3 py-2 text-right tabular-nums text-[#888888]">
                        {entry.activeReservedQty > 0 ? entry.activeReservedQty.toLocaleString() : '-'}
                      </td>

                      <td className={`px-3 py-2 text-right font-bold tabular-nums ${isOver ? 'text-[#D32F2F]' : 'text-[#2251FF]'}`}>
                        {entry.netAvailableForAlloc.toLocaleString()}
                      </td>

                      <td className="px-3 py-2 text-center whitespace-nowrap">
                        <StatusBadge label={entry.healthStatus} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
