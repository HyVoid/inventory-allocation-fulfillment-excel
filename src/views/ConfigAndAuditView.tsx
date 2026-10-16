/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sliders, ShieldAlert, CheckCircle2, AlertOctagon, RefreshCw } from 'lucide-react';
import { ConfigParams, AuditIssue } from '../types/ofia.ts';
import { StatusBadge } from '../components/StatusBadge.tsx';

interface ConfigAndAuditViewProps {
  config: ConfigParams;
  auditIssues: AuditIssue[];
  onUpdateConfig: (patch: Partial<ConfigParams>) => void;
}

export const ConfigAndAuditView: React.FC<ConfigAndAuditViewProps> = ({
  config,
  auditIssues,
  onUpdateConfig,
}) => {
  const criticalCount = auditIssues.filter((a) => a.severity === 'Critical').length;
  const warningCount = auditIssues.filter((a) => a.severity === 'Warning').length;

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sliders className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Parameters &amp; Risk Audit (Sheets 00 &amp; 13)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Central parameter driver (Principle 7: Zero hardcoding, single-point parameter maintenance) paired with real-time data integrity and risk surveillance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Config Parameters (Sheet 00) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="ofia-card p-6">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8E8E6] pb-3">
              <div>
                <h3 className="font-garamond text-[18px] font-bold text-[#051C2C]">
                  00_Config_Params Control Center
                </h3>
                <span className="text-[11px] text-[#888888]">
                  Instantaneous parameter propagation across all workbook sheets
                </span>
              </div>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 bg-[#2251FF]/10 text-[#2251FF] rounded">
                Live Dynamic
              </span>
            </div>

            <div className="space-y-4 text-[12px]">
              {/* B3: Base Currency */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B3: Base Currency Symbol</span>
                  <span className="text-[11px] text-[#888888]">Global valuation &amp; cost currency prefix</span>
                </div>
                <input
                  type="text"
                  value={config.baseCurrency}
                  onChange={(e) => onUpdateConfig({ baseCurrency: e.target.value })}
                  className="w-16 px-2.5 py-1 text-center font-bold text-[#051C2C] border border-[#E8E8E6] rounded editable-cell"
                />
              </div>

              {/* B4: Quote Reservation Switch */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B4: Quote Stock Reservation Switch</span>
                  <span className="text-[11px] text-[#888888]">When FALSE, quotes run what-if simulation without locking inventory</span>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateConfig({ quoteReservationEnabled: !config.quoteReservationEnabled })}
                  className={`px-3 py-1 rounded-[6px] font-semibold text-[11px] transition-colors ${
                    config.quoteReservationEnabled
                      ? 'bg-[#2251FF] text-white'
                      : 'bg-[#E8E8E6] text-[#051C2C]'
                  }`}
                >
                  {config.quoteReservationEnabled ? 'ENABLED' : 'SIMULATION ONLY'}
                </button>
              </div>

              {/* B5: Central DC Code */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B5: Central DC Location Code</span>
                  <span className="text-[11px] text-[#888888]">Primary replenishment distribution warehouse</span>
                </div>
                <input
                  type="text"
                  value={config.centralDCCode}
                  onChange={(e) => onUpdateConfig({ centralDCCode: e.target.value })}
                  className="w-24 px-2.5 py-1 text-center font-mono font-semibold text-[#051C2C] border border-[#E8E8E6] rounded editable-cell"
                />
              </div>

              {/* B6: Safety Stock Protection Ratio */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B6: Safety Stock Protection Ratio</span>
                  <span className="text-[11px] text-[#888888]">Weight multiplier (0.0 - 1.0) shielded from lateral transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.05"
                    min={0}
                    max={1}
                    value={config.safetyStockProtectRatio}
                    onChange={(e) => onUpdateConfig({ safetyStockProtectRatio: Number(e.target.value) || 0 })}
                    className="w-20 px-2.5 py-1 text-right font-semibold text-[#051C2C] border border-[#E8E8E6] rounded editable-cell"
                  />
                  <span className="text-[#888888] text-[11px]">({(config.safetyStockProtectRatio * 100).toFixed(0)}%)</span>
                </div>
              </div>

              {/* B7: FMD First-Month Demand Protection */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B7: First-Month Demand Protection (FMD)</span>
                  <span className="text-[11px] text-[#888888]">Enforce local store 30-day forecast quota reserve</span>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateConfig({ fmdProtectEnabled: config.fmdProtectEnabled === 1 ? 0 : 1 })}
                  className={`px-3 py-1 rounded-[6px] font-semibold text-[11px] transition-colors ${
                    config.fmdProtectEnabled === 1
                      ? 'bg-[#2251FF] text-white'
                      : 'bg-[#E8E8E6] text-[#051C2C]'
                  }`}
                >
                  {config.fmdProtectEnabled === 1 ? '1 (ENFORCED)' : '0 (OFF)'}
                </button>
              </div>

              {/* B8: Nearest Store Max Distance KM */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B8: Nearest Store Max Transfer Distance</span>
                  <span className="text-[11px] text-[#888888]">Maximum road radius for lateral store transfers (Tier 2)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={50}
                    max={2000}
                    value={config.nearestStoreMaxDistanceKM}
                    onChange={(e) => onUpdateConfig({ nearestStoreMaxDistanceKM: Number(e.target.value) || 300 })}
                    className="w-20 px-2.5 py-1 text-right font-semibold text-[#051C2C] border border-[#E8E8E6] rounded editable-cell"
                  />
                  <span className="text-[#888888] text-[11px]">KM</span>
                </div>
              </div>

              {/* B9: Internal Transfer Handling Buffer */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B9: Internal Cross-Dock Handling Buffer</span>
                  <span className="text-[11px] text-[#888888]">Inbound receipt, packing and dispatch lead buffer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={config.transferHandlingBufferDays}
                    onChange={(e) => onUpdateConfig({ transferHandlingBufferDays: Number(e.target.value) || 0 })}
                    className="w-16 px-2.5 py-1 text-right font-semibold text-[#051C2C] border border-[#E8E8E6] rounded editable-cell"
                  />
                  <span className="text-[#888888] text-[11px]">Days</span>
                </div>
              </div>

              {/* B10: Customs Port Clearance Buffer */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B10: Maritime Customs &amp; Port Buffer</span>
                  <span className="text-[11px] text-[#888888]">Drayage &amp; customs release added to container Port ETA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={config.customsPortBufferDays}
                    onChange={(e) => onUpdateConfig({ customsPortBufferDays: Number(e.target.value) || 0 })}
                    className="w-16 px-2.5 py-1 text-right font-semibold text-[#051C2C] border border-[#E8E8E6] rounded editable-cell"
                  />
                  <span className="text-[#888888] text-[11px]">Days</span>
                </div>
              </div>

              {/* B11: Master Pack Ceiling Switch */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B11: PO Master Pack Ceiling Rounding</span>
                  <span className="text-[11px] text-[#888888]">Round procurement orders up to full master carton multiples</span>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateConfig({ masterPackCeilingEnabled: !config.masterPackCeilingEnabled })}
                  className={`px-3 py-1 rounded-[6px] font-semibold text-[11px] transition-colors ${
                    config.masterPackCeilingEnabled
                      ? 'bg-[#2251FF] text-white'
                      : 'bg-[#E8E8E6] text-[#051C2C]'
                  }`}
                >
                  {config.masterPackCeilingEnabled ? 'CEILING.MATH' : 'EXACT QTY'}
                </button>
              </div>

              {/* B14: Reservation Expiry Days */}
              <div className="flex items-center justify-between gap-4 p-2.5 rounded bg-[#F5F5F2]/50">
                <div>
                  <span className="font-semibold text-[#051C2C] block">B14: Reservation Max Stale Expiry</span>
                  <span className="text-[11px] text-[#888888]">Days before active unfulfilled reservation flags audit alarm</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={config.reservationExpiryDays}
                    onChange={(e) => onUpdateConfig({ reservationExpiryDays: Number(e.target.value) || 7 })}
                    className="w-16 px-2.5 py-1 text-right font-semibold text-[#051C2C] border border-[#E8E8E6] rounded editable-cell"
                  />
                  <span className="text-[#888888] text-[11px]">Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Audit Validation (Sheet 13) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="ofia-card p-6">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8E8E6] pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#2251FF]" />
                <div>
                  <h3 className="font-garamond text-[18px] font-bold text-[#051C2C]">
                    13_Audit_Validation Risk Surveillance
                  </h3>
                  <span className="text-[11px] text-[#888888]">
                    Real-time cross-sheet integrity &amp; over-draft firewall
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {criticalCount > 0 ? (
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-[#D32F2F]/10 text-[#D32F2F] rounded-full">
                    {criticalCount} Critical
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-[#00C853]/10 text-[#00C853] rounded-full">
                    100% Valid
                  </span>
                )}
              </div>
            </div>

            {auditIssues.length === 0 ? (
              <div className="p-8 text-center bg-[#F5F5F2]/40 rounded-[8px]">
                <CheckCircle2 className="w-10 h-10 text-[#00C853] mx-auto mb-2" />
                <h4 className="font-garamond text-[20px] font-bold text-[#051C2C]">
                  System Integrity 100% Compliant
                </h4>
                <p className="text-[12px] text-[#888888] max-w-sm mx-auto mt-1">
                  Zero orphan containers, zero missing master SKUs, zero over-drafted supply pools, and all active reservations are within safe age bounds.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {auditIssues.map((issue) => {
                  const isCrit = issue.severity === 'Critical';
                  return (
                    <div
                      key={issue.anomalyId}
                      className={`p-3.5 rounded-[8px] border transition-all ${
                        isCrit
                          ? 'bg-[#D32F2F]/5 border-[#D32F2F]/20'
                          : 'bg-[#F5F5F2] border-[#E8E8E6]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-[#051C2C]">
                            {issue.anomalyId}
                          </span>
                          <span className="text-[12px] font-semibold text-[#051C2C]">
                            {issue.checkType}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            isCrit
                              ? 'bg-[#D32F2F] text-white'
                              : 'bg-[#888888]/20 text-[#051C2C]'
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-[#888888] mb-1">
                        Entity: <span className="text-[#051C2C] font-semibold">{issue.affectedEntityKey}</span>
                      </div>

                      <p className="text-[12px] text-[#051C2C]/90 leading-relaxed mb-2">
                        {issue.anomalyDetails}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-[#888888] pt-1.5 border-t border-[#E8E8E6]/60">
                        <span>Action Dept: <strong className="text-[#051C2C]">{issue.actionDepartment}</strong></span>
                        <span className="text-[#2251FF] font-medium">Action Required</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
