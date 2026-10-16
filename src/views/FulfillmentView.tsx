/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ArrowUpDown, ChevronRight, Eye } from 'lucide-react';
import { AllocationEngineRow } from '../types/ofia.ts';
import { KPICard } from '../components/KPICard.tsx';
import { InsightBlock } from '../components/InsightBlock.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { DataBar } from '../components/DataBar.tsx';
import { OrderDetailModal } from '../components/OrderDetailModal.tsx';

interface FulfillmentViewProps {
  allocationResults: AllocationEngineRow[];
  currency: string;
  onNavigateToDemands: () => void;
  onNavigateToProcurement: () => void;
}

export const FulfillmentView: React.FC<FulfillmentViewProps> = ({
  allocationResults,
  currency,
  onNavigateToDemands,
  onNavigateToProcurement,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<AllocationEngineRow | null>(null);

  // Summary Metrics
  const metrics = useMemo(() => {
    const totalOrders = allocationResults.length;
    const fullyFeasible = allocationResults.filter((r) => r.fulfillmentStatus === 'Fully Feasible').length;
    const lateOrders = allocationResults.filter((r) => r.fulfillmentStatus === 'Quantity Met But Late').length;
    const partialOrders = allocationResults.filter((r) => r.fulfillmentStatus === 'Partial Feasible').length;
    const stockouts = allocationResults.filter((r) => r.fulfillmentStatus === 'Stockout').length;
    const splitOrders = allocationResults.filter((r) => r.isSplitOrder).length;

    const totalReqQty = allocationResults.reduce((s, r) => s + r.demand.reqQty, 0);
    const totalAllocated = allocationResults.reduce((s, r) => s + r.allocatedTotalQty, 0);
    const totalGap = allocationResults.reduce((s, r) => s + r.unmetQtyGap, 0);

    const onTimeRate = totalOrders > 0 ? (fullyFeasible / totalOrders) * 100 : 0;

    return {
      totalOrders,
      fullyFeasible,
      lateOrders,
      partialOrders,
      stockouts,
      splitOrders,
      totalReqQty,
      totalAllocated,
      totalGap,
      onTimeRate,
    };
  }, [allocationResults]);

  // Unique locations for filter
  const uniqueLocations = useMemo(() => {
    const locs = Array.from(new Set(allocationResults.map((r) => r.demand.shipToLocation)));
    return locs.sort();
  }, [allocationResults]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return allocationResults.filter((row) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        row.demand.orderId.toLowerCase().includes(q) ||
        row.demand.customerName.toLowerCase().includes(q) ||
        row.demand.skuCode.toLowerCase().includes(q) ||
        row.demand.shipToLocation.toLowerCase().includes(q);

      const matchStatus = statusFilter === 'ALL' || row.fulfillmentStatus === statusFilter;
      const matchLoc = locationFilter === 'ALL' || row.demand.shipToLocation === locationFilter;

      return matchSearch && matchStatus && matchLoc;
    });
  }, [allocationResults, searchTerm, statusFilter, locationFilter]);

  const maxReqQty = useMemo(() => {
    return Math.max(...allocationResults.map((r) => r.demand.reqQty), 100);
  }, [allocationResults]);

  const handleExportCsv = () => {
    const headers = [
      'Order_ID',
      'Line',
      'Type',
      'Customer',
      'SKU',
      'Ship_To',
      'Req_Qty',
      'Req_Delivery_Date',
      'Allocated_Qty',
      'Unmet_Gap',
      'Fulfillment_Status',
      'Primary_Source',
      'Split_Order',
      'Est_Delivery_Date',
      'Delay_Days',
      'Action_Recommendation',
    ];
    const csvRows = [headers.join(',')];

    for (const r of filteredRows) {
      csvRows.push(
        [
          r.demand.orderId,
          r.demand.orderLineId,
          r.demand.demandType,
          `"${r.demand.customerName}"`,
          r.demand.skuCode,
          r.demand.shipToLocation,
          r.demand.reqQty,
          r.demand.reqDeliveryDate,
          r.allocatedTotalQty,
          r.unmetQtyGap,
          r.fulfillmentStatus,
          `"${r.primarySupplySource}"`,
          r.isSplitOrder ? 'YES' : 'NO',
          r.maxEstArrivalDate,
          r.deliveryDelayDays,
          `"${r.actionRecommendation}"`,
        ].join(',')
      );
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fulfillment_Decisions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
          Order Fulfillment &amp; Allocation Board
        </h1>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Real-time multi-echelon sourcing decision matrix matching sales demand against local stock, neighbor transfer, central DC, OTW containers, and PO lines.
        </p>
      </div>

      {/* Hero KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          label="On-Time Fulfillment Rate"
          value={`${metrics.onTimeRate.toFixed(1)}%`}
          subtext={`${metrics.fullyFeasible} of ${metrics.totalOrders} order lines fully met on-time`}
        />
        <KPICard
          label="Late Delivery Risks"
          value={metrics.lateOrders}
          subtext={`${metrics.lateOrders} orders met in qty but delay required`}
          isAnomaly={metrics.lateOrders > 0}
        />
        <KPICard
          label="Unmet Demand Gap"
          value={`${metrics.totalGap.toLocaleString()} units`}
          subtext={`${metrics.stockouts} stockout + ${metrics.partialOrders} partial orders`}
          isAnomaly={metrics.totalGap > 0}
        />
        <KPICard
          label="Multi-Echelon Splits"
          value={metrics.splitOrders}
          subtext="Orders sourcing from 2+ supply tiers simultaneously"
        />
      </div>

      {/* Strategic Insight Block */}
      {metrics.totalGap > 0 ? (
        <InsightBlock
          title="Procurement Requisition Triggered"
          summary={`A net supply shortfall of ${metrics.totalGap.toLocaleString()} units across ${metrics.stockouts + metrics.partialOrders} orders cannot be fulfilled from physical stock, regional transfers, or in-transit shipments. Review clean procurement recommendations to generate supplier orders.`}
          action="Review Procurement Advice"
          onActionClick={onNavigateToProcurement}
        />
      ) : (
        <InsightBlock
          title="Optimal Supply Network Coverage"
          summary="All active firm orders are currently covered by available inventory tiers. Check scheduled delivery dates to confirm dispatch schedules with regional hubs."
          action="View Sales Demands"
          onActionClick={onNavigateToDemands}
        />
      )}

      {/* Main Container Card */}
      <div className="ofia-card p-6">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Order, Customer, SKU, Hub..."
                className="w-full pl-9 pr-3 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] focus:outline-none focus:border-[#2251FF] bg-white"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] focus:outline-none focus:border-[#2251FF] bg-white text-[#051C2C]"
            >
              <option value="ALL">All Statuses ({allocationResults.length})</option>
              <option value="Fully Feasible">Fully Feasible</option>
              <option value="Quantity Met But Late">Quantity Met But Late</option>
              <option value="Partial Feasible">Partial Feasible</option>
              <option value="Stockout">Stockout</option>
              <option value="Quote Pending">Quote Pending</option>
            </select>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] focus:outline-none focus:border-[#2251FF] bg-white text-[#051C2C]"
            >
              <option value="ALL">All Hubs (28 Locations)</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[12px] text-[#888888]">
              Showing <strong className="text-[#051C2C]">{filteredRows.length}</strong> lines
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

        {/* Data Table */}
        <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
          <table className="w-full ofia-table text-left">
            <thead>
              <tr>
                <th className="px-3 py-2.5">Order Line</th>
                <th className="px-3 py-2.5">Customer</th>
                <th className="px-3 py-2.5">SKU Code</th>
                <th className="px-3 py-2.5">Dest Hub</th>
                <th className="px-3 py-2.5 text-right">Req Qty</th>
                <th className="px-3 py-2.5">Allocated Qty</th>
                <th className="px-3 py-2.5 text-right">Gap</th>
                <th className="px-3 py-2.5">Req Date</th>
                <th className="px-3 py-2.5">Est Delivery</th>
                <th className="px-3 py-2.5 text-center">Fulfillment Status</th>
                <th className="px-3 py-2.5">Primary Source</th>
                <th className="px-3 py-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-[#888888]">
                    No order fulfillment records match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, idx) => {
                  const isLate = row.fulfillmentStatus === 'Quantity Met But Late';
                  const isStockout = row.fulfillmentStatus === 'Stockout';

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#F5F5F2]/80 transition-colors ${
                        isStockout ? 'anomaly-row' : ''
                      }`}
                    >
                      <td className="px-3 py-2 font-medium text-[#051C2C] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{row.demand.orderId}</span>
                          <span className="text-[10px] text-[#888888]">#{row.demand.orderLineId}</span>
                          {row.demand.demandType === 'Quote' && (
                            <span className="px-1.5 py-0.2 text-[9px] rounded font-semibold bg-[#888888]/15 text-[#888888]">
                              QUOTE
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-2 text-[#051C2C] max-w-[150px] truncate" title={row.demand.customerName}>
                        {row.demand.customerName}
                      </td>

                      <td className="px-3 py-2 font-mono text-[12px] text-[#051C2C]">
                        {row.demand.skuCode}
                      </td>

                      <td className="px-3 py-2 font-medium text-[#051C2C]">
                        {row.demand.shipToLocation}
                      </td>

                      <td className="px-3 py-2 text-right font-semibold text-[#051C2C] tabular-nums">
                        {row.demand.reqQty.toLocaleString()}
                      </td>

                      <td className="px-3 py-2">
                        <DataBar value={row.allocatedTotalQty} max={maxReqQty} />
                      </td>

                      <td className={`px-3 py-2 text-right tabular-nums font-semibold ${row.unmetQtyGap > 0 ? 'text-[#D32F2F]' : 'text-[#888888]'}`}>
                        {row.unmetQtyGap > 0 ? row.unmetQtyGap.toLocaleString() : '-'}
                      </td>

                      <td className="px-3 py-2 text-[#888888] tabular-nums whitespace-nowrap">
                        {row.demand.reqDeliveryDate}
                      </td>

                      <td className="px-3 py-2 tabular-nums whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <span className={isLate ? 'text-[#D32F2F] font-semibold' : 'text-[#051C2C]'}>
                            {row.maxEstArrivalDate}
                          </span>
                          {row.deliveryDelayDays > 0 && (
                            <span className="text-[10px] font-bold text-[#D32F2F]">
                              (+{row.deliveryDelayDays}d)
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-2 text-center whitespace-nowrap">
                        <StatusBadge
                          label={row.fulfillmentStatus}
                          onClick={() => setSelectedOrder(row)}
                        />
                      </td>

                      <td className="px-3 py-2 text-[12px] text-[#051C2C]/80 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{row.primarySupplySource}</span>
                          {row.isSplitOrder && (
                            <span className="px-1.5 py-0.2 text-[9px] rounded font-semibold bg-[#2251FF]/10 text-[#2251FF]">
                              SPLIT
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-2 text-center whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(row)}
                          title="View 5-echelon breakdown"
                          className="p-1 rounded text-[#888888] hover:text-[#2251FF] hover:bg-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drilldown Modal */}
      <OrderDetailModal
        orderRow={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        currency={currency}
      />
    </div>
  );
};
