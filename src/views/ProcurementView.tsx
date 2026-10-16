/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingCart, Download, Copy, Check, AlertTriangle, Calendar } from 'lucide-react';
import { ProcurementSummaryRow } from '../types/ofia.ts';
import { KPICard } from '../components/KPICard.tsx';
import { StatusBadge } from '../components/StatusBadge.tsx';
import { InsightBlock } from '../components/InsightBlock.tsx';

interface ProcurementViewProps {
  procurementSummary: ProcurementSummaryRow[];
  currency: string;
}

export const ProcurementView: React.FC<ProcurementViewProps> = ({
  procurementSummary,
  currency,
}) => {
  const [copied, setCopied] = React.useState(false);

  const totalShortageLines = procurementSummary.length;
  const totalNetDeficit = procurementSummary.reduce((s, r) => s + r.totalNetDeficit, 0);
  const totalRecommendedPO = procurementSummary.reduce((s, r) => s + r.recommendedPoQty, 0);
  const criticalDelayCount = procurementSummary.filter((r) => r.canMeetOrderFlag === 'Critical Delay').length;

  const handleExportCsv = () => {
    const headers = [
      'Deficit_SKU',
      'Item_Name',
      'Deficit_Location',
      'Total_Net_Deficit',
      'Recommended_Vendor_ID',
      'Vendor_Name',
      'Master_Pack_Qty',
      'Recommended_PO_Qty',
      'Exp_Prod_Start_Date',
      'Exp_Arrival_Date',
      'Can_Meet_Order_Flag',
    ];
    const csvRows = [headers.join(',')];

    for (const r of procurementSummary) {
      csvRows.push(
        [
          r.deficitSku,
          `"${r.itemName}"`,
          r.deficitLocation,
          r.totalNetDeficit,
          r.recommendedVendorId,
          `"${r.recommendedVendorName}"`,
          r.masterPackQty,
          r.recommendedPoQty,
          r.expProdStartDate,
          r.expArrivalDate,
          r.canMeetOrderFlag,
        ].join(',')
      );
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Procurement_Requisition_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyDraft = () => {
    const text = procurementSummary
      .map(
        (r) =>
          `SKU: ${r.deficitSku} (${r.itemName}) | Dest: ${r.deficitLocation} | Suggest PO: ${r.recommendedPoQty} units (Pack: ${r.masterPackQty}) | Vendor: ${r.recommendedVendorName} | Order Deadline: ${r.expProdStartDate}`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Clean Procurement Requisitions (Sheet 12)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Pure shortage advice aggregated by SKU &amp; location after subtracting all physical on-hand stocks, neighbor transfers, DC reserves, in-transit containers, and existing PO pipelines.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          label="Shortfall Lines"
          value={totalShortageLines}
          subtext="Unique SKU + Hub shortage combinations"
          isAnomaly={totalShortageLines > 0}
        />
        <KPICard
          label="Total Net Shortfall"
          value={`${totalNetDeficit.toLocaleString()} u`}
          subtext="Uncovered consumer customer demand"
          isAnomaly={totalNetDeficit > 0}
        />
        <KPICard
          label="Recommended PO Units"
          value={`${totalRecommendedPO.toLocaleString()} u`}
          subtext="Rounded up to master pack carton sizes"
        />
        <KPICard
          label="Urgent Order Deadlines"
          value={criticalDelayCount}
          subtext="Orders where supplier lead time exceeds target date"
          isAnomaly={criticalDelayCount > 0}
        />
      </div>

      {totalShortageLines > 0 && (
        <InsightBlock
          title="Procurement Rounding &amp; Packaging Rules Enforced"
          summary="Suggested purchase quantities strictly respect Master Pack carton counts (Config B11) and MOQ multipliers (Config B12). Earliest deadlines account for overseas manufacturing lead times, maritime transport, and port customs buffers."
        />
      )}

      {/* Main Table Card */}
      <div className="ofia-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-garamond text-[18px] font-bold text-[#051C2C]">
              Procurement Summary Lines ({procurementSummary.length})
            </h3>
            <span className="text-[12px] text-[#888888]">
              Automated draft ready for ERP purchase requisition generation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDraft}
              disabled={procurementSummary.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] disabled:opacity-40 rounded-[6px] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00C853]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handleExportCsv}
              disabled={procurementSummary.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] disabled:opacity-40 rounded-[6px] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PO Draft CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
          <table className="w-full ofia-table text-left">
            <thead>
              <tr>
                <th className="px-3 py-2.5">Shortage SKU</th>
                <th className="px-3 py-2.5">Item Description</th>
                <th className="px-3 py-2.5">Deficit Hub</th>
                <th className="px-3 py-2.5 text-right">Net Deficit</th>
                <th className="px-3 py-2.5 text-right">Pack Size</th>
                <th className="px-3 py-2.5 text-right">Recommended PO</th>
                <th className="px-3 py-2.5">Recommended Vendor</th>
                <th className="px-3 py-2.5">Order Deadline</th>
                <th className="px-3 py-2.5">Expected ETA</th>
                <th className="px-3 py-2.5 text-center">Urgency</th>
              </tr>
            </thead>
            <tbody>
              {procurementSummary.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-[#888888]">
                    No procurement shortages detected! All customer demands are covered by current network inventory, in-transit cargo, or existing purchase orders.
                  </td>
                </tr>
              ) : (
                procurementSummary.map((row, idx) => {
                  const isDelay = row.canMeetOrderFlag === 'Critical Delay';
                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#F5F5F2]/80 transition-colors ${
                        isDelay ? 'anomaly-row' : ''
                      }`}
                    >
                      <td className="px-3 py-2 font-mono text-[12px] font-medium text-[#051C2C] whitespace-nowrap">
                        {row.deficitSku}
                      </td>

                      <td className="px-3 py-2 text-[#051C2C] font-medium max-w-[180px] truncate">
                        {row.itemName}
                      </td>

                      <td className="px-3 py-2 font-medium text-[#051C2C]">
                        {row.deficitLocation}
                      </td>

                      <td className="px-3 py-2 text-right font-semibold text-[#D32F2F] tabular-nums">
                        {row.totalNetDeficit.toLocaleString()}
                      </td>

                      <td className="px-3 py-2 text-right text-[#888888] tabular-nums">
                        {row.masterPackQty} / ctn
                      </td>

                      <td className="px-3 py-2 text-right font-bold text-[#2251FF] tabular-nums">
                        {row.recommendedPoQty.toLocaleString()}
                      </td>

                      <td className="px-3 py-2 text-[12px] text-[#051C2C]">
                        <span className="font-medium">{row.recommendedVendorName}</span>
                        <span className="text-[10px] text-[#888888] block">({row.recommendedVendorId})</span>
                      </td>

                      <td className="px-3 py-2 tabular-nums text-[12px] whitespace-nowrap">
                        <span className={isDelay ? 'text-[#D32F2F] font-bold' : 'text-[#051C2C]'}>
                          {row.expProdStartDate}
                        </span>
                      </td>

                      <td className="px-3 py-2 text-[#888888] tabular-nums text-[12px] whitespace-nowrap">
                        {row.expArrivalDate}
                      </td>

                      <td className="px-3 py-2 text-center whitespace-nowrap">
                        <StatusBadge label={row.canMeetOrderFlag} />
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
