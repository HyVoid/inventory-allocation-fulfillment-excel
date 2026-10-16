/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import {
  LayoutDashboard,
  Layers,
  Database,
  ShoppingCart,
  FileText,
  Package,
  Ship,
  Lock,
  BookOpen,
  Sliders,
  Download,
  Upload,
  FileSpreadsheet,
  RotateCcw,
  ShieldCheck,
  X,
  Menu,
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

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  lastSavedStatus: string;
  criticalAuditCount: number;
  onExportBackup: () => void;
  onImportBackup: (jsonStr: string) => void;
  onOpenCsvModal: () => void;
  onResetData: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  lastSavedStatus,
  criticalAuditCount,
  onExportBackup,
  onImportBackup,
  onOpenCsvModal,
  onResetData,
  isOpenMobile,
  onCloseMobile,
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
    e.target.value = '';
  };

  const navGroups: {
    groupTitle: string;
    items: {
      key: TabKey;
      label: string;
      sheetCode: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: number;
    }[];
  }[] = [
    {
      groupTitle: 'Decision & Intelligence',
      items: [
        {
          key: 'fulfillment',
          label: 'Fulfillment Board',
          sheetCode: '11_WhatIf',
          icon: LayoutDashboard,
        },
        {
          key: 'allocation_engine',
          label: 'Allocation Engine',
          sheetCode: '10_Engine',
          icon: Layers,
        },
        {
          key: 'supply_ledger',
          label: 'Unified Supply Ledger',
          sheetCode: '08_Supply',
          icon: Database,
        },
        {
          key: 'procurement',
          label: 'Clean Procurement',
          sheetCode: '12_Procure',
          icon: ShoppingCart,
        },
      ],
    },
    {
      groupTitle: 'Supply & Demand Inputs',
      items: [
        {
          key: 'demands',
          label: 'Sales Demand',
          sheetCode: '04_Demand',
          icon: FileText,
        },
        {
          key: 'inventory',
          label: 'Physical Stock (QOH)',
          sheetCode: '05_QOH',
          icon: Package,
        },
        {
          key: 'pipeline',
          label: 'PO & In-Transit',
          sheetCode: '06-07_Pipeline',
          icon: Ship,
        },
        {
          key: 'reservations',
          label: 'Reservations Ledger',
          sheetCode: '09_Reservations',
          icon: Lock,
        },
      ],
    },
    {
      groupTitle: 'Foundation & Risk',
      items: [
        {
          key: 'master_data',
          label: 'Item & Hub Masters',
          sheetCode: '01-03_Master',
          icon: BookOpen,
        },
        {
          key: 'config_audit',
          label: 'Config & Risk Audit',
          sheetCode: '00 & 13_Audit',
          icon: Sliders,
          badge: criticalAuditCount,
        },
      ],
    },
  ];

  const handleSelectTab = (key: TabKey) => {
    onTabChange(key);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#051C2C]/30 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[260px] bg-white border-r border-[#E8E8E6] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-[64px] px-5 flex items-center justify-between border-b border-[#E8E8E6] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-garamond text-[24px] font-bold tracking-display text-[#051C2C] leading-none">
              OFIA
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#888888] leading-tight">
                Decision Engine
              </span>
              <span className="text-[9px] text-[#2251FF] font-semibold leading-tight">
                28-Hub Network
              </span>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 text-[#888888] hover:text-[#051C2C] rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#888888]">
                {group.groupTitle}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.key;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSelectTab(item.key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-[8px] text-[12px] font-medium transition-all group ${
                        isActive
                          ? 'bg-[#2251FF]/10 text-[#051C2C] font-semibold shadow-xs'
                          : 'text-[#051C2C]/70 hover:text-[#051C2C] hover:bg-[#F5F5F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-[#2251FF]' : 'text-[#888888] group-hover:text-[#051C2C]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {item.badge !== undefined && item.badge > 0 ? (
                          <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-[#D32F2F] text-white">
                            {item.badge}
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-[#888888]/70 hidden group-hover:inline">
                            {item.sheetCode}
                          </span>
                        )}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2251FF]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Utility Tools & Status */}
        <div className="p-3 border-t border-[#E8E8E6] bg-[#F5F5F2]/50 space-y-2 shrink-0">
          {/* Last Saved Status */}
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-white rounded-[6px] border border-[#E8E8E6] text-[11px] text-[#888888]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] shrink-0 animate-pulse" />
              <span className="truncate font-medium">{lastSavedStatus}</span>
            </div>
            <span className="text-[9px] uppercase font-semibold text-[#888888] shrink-0 ml-1">
              Local
            </span>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={onOpenCsvModal}
              title="Bulk CSV Import into any sheet"
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium text-[#051C2C] bg-white hover:bg-[#E8E8E6] border border-[#E8E8E6] rounded-[6px] transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#2251FF]" />
              <span>CSV Import</span>
            </button>

            <button
              onClick={onExportBackup}
              title="Export JSON Backup of current state"
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium text-[#051C2C] bg-white hover:bg-[#E8E8E6] border border-[#E8E8E6] rounded-[6px] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#051C2C]" />
              <span>Export</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import JSON Backup file"
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium text-[#051C2C] bg-white hover:bg-[#E8E8E6] border border-[#E8E8E6] rounded-[6px] transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#051C2C]" />
              <span>Import</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all data to default 28-hub benchmark? Any unsaved edits will be cleared.')) {
                  onResetData();
                }
              }}
              title="Reset Data to benchmark defaults"
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium text-[#888888] hover:text-[#D32F2F] bg-white hover:bg-[#E8E8E6] border border-[#E8E8E6] rounded-[6px] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
        </div>
      </aside>
    </>
  );
};
