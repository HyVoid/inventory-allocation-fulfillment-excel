/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import {
  Download,
  Upload,
  FileSpreadsheet,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export type TabKey =
  | 'fulfillment'
  | 'allocation_engine'
  | 'supply_ledger'
  | 'procurement'
  | 'demands'
  | 'inventory'
  | 'pipeline'
  | 'reservations'
  | 'master_data'
  | 'config_audit';

interface NavbarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  lastSavedStatus: string;
  criticalAuditCount: number;
  onExportBackup: () => void;
  onImportBackup: (jsonStr: string) => void;
  onOpenCsvModal: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  lastSavedStatus,
  criticalAuditCount,
  onExportBackup,
  onImportBackup,
  onOpenCsvModal,
  onResetData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          onImportBackup(content);
        }
      };
      reader.readAsText(file);
    }
    // reset input
    e.target.value = '';
  };

  const navItems: { key: TabKey; label: string; badge?: number }[] = [
    { key: 'fulfillment', label: 'Fulfillment Board' },
    { key: 'allocation_engine', label: 'Allocation Engine' },
    { key: 'supply_ledger', label: 'Supply Ledger' },
    { key: 'procurement', label: 'Procurement' },
    { key: 'demands', label: 'Sales Demand' },
    { key: 'inventory', label: 'Inventory (QOH)' },
    { key: 'pipeline', label: 'PO & In-Transit' },
    { key: 'reservations', label: 'Reservations' },
    { key: 'master_data', label: 'Master Data' },
    { key: 'config_audit', label: 'Config & Audit', badge: criticalAuditCount },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E8E8E6]" style={{ height: '56px' }}>
      <div className="max-w-[1400px] mx-auto h-full px-[40px] flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-garamond text-[22px] font-bold tracking-display text-[#051C2C] leading-none">
              OFIA
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#888888] border-l border-[#E8E8E6] pl-2 hidden sm:inline-block">
              SaaS Decision Engine
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <nav className="flex items-center h-full overflow-x-auto no-scrollbar gap-1 mx-4">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onTabChange(item.key)}
                className={`relative h-[56px] px-3 flex items-center gap-1.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#051C2C] font-semibold'
                    : 'text-[#051C2C]/50 hover:text-[#051C2C]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#D32F2F] text-white leading-tight">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2251FF]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utility action toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Last saved indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-[#888888] bg-[#F5F5F2] rounded-[6px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] inline-block animate-pulse" />
            <span className="font-medium whitespace-nowrap">{lastSavedStatus}</span>
          </div>

          {/* Action buttons */}
          <button
            onClick={onOpenCsvModal}
            title="Bulk CSV Import into any sheet"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-[6px] transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#2251FF]" />
            <span className="hidden md:inline">CSV Import</span>
          </button>

          <button
            onClick={onExportBackup}
            title="Export JSON Backup of current state"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-[6px] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#051C2C]" />
            <span className="hidden xl:inline">Export</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import JSON Backup file"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-[6px] transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#051C2C]" />
            <span className="hidden xl:inline">Import</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => {
              if (window.confirm('Reset all data to default 28-hub benchmark? Any unsaved edits will be cleared.')) {
                onResetData();
              }
            }}
            title="Reset Data to benchmark defaults"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#888888] hover:text-[#D32F2F] hover:bg-[#F5F5F2] rounded-[6px] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
