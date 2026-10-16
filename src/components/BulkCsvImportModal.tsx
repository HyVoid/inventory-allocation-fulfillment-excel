/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Upload, FileText, Check, AlertCircle } from 'lucide-react';

interface BulkCsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (target: string, rows: any[], mode: 'append' | 'replace') => boolean;
}

export const BulkCsvImportModal: React.FC<BulkCsvImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [targetEntity, setTargetEntity] = useState<string>('demands');
  const [csvContent, setCsvContent] = useState<string>('');
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [previewRows, setPreviewRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [parseError, setParseError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const targetTemplates: Record<string, { label: string; sample: string }> = {
    demands: {
      label: '04_Sales_Demand (Orders)',
      sample: `orderId,orderLineId,demandType,orderDate,customerId,customerName,skuCode,reqQty,reqDeliveryDate,shipToLocation
SO-9901,1,Firm,2026-10-14,CUST-99,Titan Systems,SKU-101,50,2026-10-22,ST01
SO-9902,1,Quote,2026-10-14,CUST-88,Vortex Dynamics,SKU-102,30,2026-11-05,ST02`,
    },
    inventory: {
      label: '05_Inv_On_Hand (Physical Stock)',
      sample: `locationCode,skuCode,physicalQOH,systemCommittedQty,minSafetyStock,fmdReserveQty,unitCost
ST01,SKU-101,60,5,15,5,45.00
ST02,SKU-102,40,2,10,5,110.00`,
    },
    pos: {
      label: '06_PO_Pipeline (Purchase Orders)',
      sample: `poNumber,poLineId,vendorId,skuCode,poOrderedQty,poOpenQty,poPromisedDate,poDestLocation,poStatus
PO-2026-099,1,V-101,SKU-101,150,150,2026-11-20,DC01,In-Production`,
    },
    inTransit: {
      label: '07_In_Transit_OTW (Containers)',
      sample: `containerId,refPoNumber,refPoLineId,skuCode,inTransitQty,vesselETD,portETA,destLocation
MSKU-9999,PO-2026-099,1,SKU-101,75,2026-10-10,2026-11-02,DC01`,
    },
    items: {
      label: '01_Item_Master (Products)',
      sample: `skuCode,itemName,category,masterPackQty,unitVolumeCBM,unitWeightKG,defaultVendorId,activeStatus
SKU-109,Servo Controller Z-1,Electronics,20,0.025,2.1,V-102,Active`,
    },
    reservations: {
      label: '09_Reservations_Ledger (Allocations)',
      sample: `reservationId,orderId,orderLineId,skuCode,assignedSupplyUid,reservedQty,reservationStatus,createdDate
RES-099,SO-9901,1,SKU-101,QOH|ST01|SKU-101,25,Active,2026-10-14`,
    },
  };

  const handleParseCsv = (raw: string) => {
    setCsvContent(raw);
    setParseError('');
    setSuccessMessage('');

    if (!raw.trim()) {
      setPreviewRows([]);
      setHeaders([]);
      return;
    }

    try {
      const lines = raw
        .trim()
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length < 2) {
        setParseError('CSV must contain at least a header row and one data row.');
        setPreviewRows([]);
        return;
      }

      const rawHeaders = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
      setHeaders(rawHeaders);

      const parsed: any[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
        const obj: any = {};
        rawHeaders.forEach((h, idx) => {
          let val: any = values[idx] || '';
          // Try parse numbers
          if (
            ['reqQty', 'physicalQOH', 'systemCommittedQty', 'minSafetyStock', 'fmdReserveQty', 'unitCost', 'poOrderedQty', 'poOpenQty', 'inTransitQty', 'masterPackQty', 'reservedQty', 'distanceKM', 'transferTransitDays', 'mfgLeadDays', 'shippingLeadDays'].includes(
              h
            )
          ) {
            val = Number(val) || 0;
          }
          obj[h] = val;
        });
        parsed.push(obj);
      }

      setPreviewRows(parsed);
    } catch (err: any) {
      setParseError(`Parse error: ${err.message}`);
    }
  };

  const handleLoadTemplate = () => {
    const tmpl = targetTemplates[targetEntity]?.sample || '';
    handleParseCsv(tmpl);
  };

  const handleExecuteImport = () => {
    if (previewRows.length === 0) {
      setParseError('No rows to import. Please paste valid CSV data.');
      return;
    }

    const ok = onImport(targetEntity, previewRows, importMode);
    if (ok) {
      setSuccessMessage(`Successfully imported ${previewRows.length} rows into ${targetTemplates[targetEntity]?.label || targetEntity}!`);
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
        setCsvContent('');
        setPreviewRows([]);
      }, 1200);
    } else {
      setParseError('Import failed. Please check field mappings.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051C2C]/40 backdrop-blur-sm animate-fadeUp">
      <div className="bg-white rounded-[14px] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#2251FF]" />
            <h3 className="font-garamond text-[20px] font-bold text-[#051C2C]">
              Bulk CSV Data Import
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#888888] hover:text-[#051C2C] hover:bg-[#F5F5F2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#888888] mb-1">
                Target Sheet / Entity
              </label>
              <select
                value={targetEntity}
                onChange={(e) => {
                  setTargetEntity(e.target.value);
                  setCsvContent('');
                  setPreviewRows([]);
                }}
                className="w-full px-3 py-2 text-[13px] border border-[#E8E8E6] rounded-[6px] focus:outline-none focus:border-[#2251FF]"
              >
                {Object.entries(targetTemplates).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#888888] mb-1">
                Import Mode
              </label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-1.5 text-[12px] text-[#051C2C] cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="append"
                    checked={importMode === 'append'}
                    onChange={() => setImportMode('append')}
                    className="accent-[#2251FF]"
                  />
                  <span>Append to existing</span>
                </label>
                <label className="flex items-center gap-1.5 text-[12px] text-[#051C2C] cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="replace"
                    checked={importMode === 'replace'}
                    onChange={() => setImportMode('replace')}
                    className="accent-[#2251FF]"
                  />
                  <span>Replace entire table</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold uppercase text-[#888888]">
                CSV Content (Comma-separated)
              </label>
              <button
                type="button"
                onClick={handleLoadTemplate}
                className="text-[11px] text-[#2251FF] hover:underline flex items-center gap-1"
              >
                <FileText className="w-3 h-3" />
                <span>Load Sample Template</span>
              </button>
            </div>
            <textarea
              rows={6}
              value={csvContent}
              onChange={(e) => handleParseCsv(e.target.value)}
              placeholder="Paste raw CSV text here with headers on row 1..."
              className="w-full p-3 font-mono text-[12px] border border-[#E8E8E6] rounded-[6px] focus:outline-none focus:border-[#2251FF] bg-[#F5F5F2]/40"
            />
          </div>

          {parseError && (
            <div className="p-3 bg-[#D32F2F]/10 border border-[#D32F2F]/20 text-[#D32F2F] text-[12px] rounded-[6px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-[#00C853]/10 border border-[#00C853]/20 text-[#00C853] text-[12px] rounded-[6px] flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {previewRows.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold uppercase text-[#888888]">
                  Parsed Preview ({previewRows.length} rows ready)
                </span>
                <span className="text-[11px] text-[#00C853] font-medium">Valid CSV Format</span>
              </div>
              <div className="max-h-[160px] overflow-auto border border-[#E8E8E6] rounded-[6px]">
                <table className="w-full ofia-table text-left">
                  <thead>
                    <tr>
                      {headers.map((h, i) => (
                        <th key={i} className="px-2.5 py-1.5 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.slice(0, 4).map((row, rIdx) => (
                      <tr key={rIdx}>
                        {headers.map((h, cIdx) => (
                          <td key={cIdx} className="px-2.5 py-1 whitespace-nowrap text-[12px]">
                            {String(row[h] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {previewRows.length > 4 && (
                <div className="text-[11px] text-[#888888] text-center mt-1">
                  ...and {previewRows.length - 4} more rows
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E8E8E6] bg-[#F5F5F2] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-medium text-[#888888] hover:text-[#051C2C]"
          >
            Cancel
          </button>
          <button
            onClick={handleExecuteImport}
            disabled={previewRows.length === 0}
            className="px-4 py-1.5 text-[12px] font-semibold text-white bg-[#2251FF] hover:bg-[#1a41cc] disabled:opacity-40 disabled:pointer-events-none rounded-[6px] transition-colors"
          >
            Import {previewRows.length} Rows
          </button>
        </div>
      </div>
    </div>
  );
};
