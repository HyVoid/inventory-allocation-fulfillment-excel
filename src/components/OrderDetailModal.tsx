/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Layers, Calendar, MapPin, Truck, AlertCircle, CheckCircle } from 'lucide-react';
import { AllocationEngineRow } from '../types/ofia.ts';
import { StatusBadge } from './StatusBadge.tsx';

interface OrderDetailModalProps {
  orderRow: AllocationEngineRow | null;
  onClose: () => void;
  currency: string;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  orderRow,
  onClose,
  currency,
}) => {
  if (!orderRow) return null;

  const { demand, details, fulfillmentStatus, allocatedTotalQty, unmetQtyGap, maxEstArrivalDate, deliveryDelayDays, actionRecommendation, isSplitOrder, primarySupplySource } = orderRow;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051C2C]/40 backdrop-blur-sm animate-fadeUp">
      <div className="bg-white rounded-[14px] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-[#2251FF]" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-garamond text-[20px] font-bold text-[#051C2C]">
                  Order {demand.orderId} (Line {demand.orderLineId})
                </h3>
                <StatusBadge label={fulfillmentStatus} />
              </div>
              <p className="text-[12px] text-[#888888]">
                Customer: <strong className="text-[#051C2C]">{demand.customerName}</strong> ({demand.customerId})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#888888] hover:text-[#051C2C] hover:bg-[#F5F5F2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#F5F5F2] rounded-[8px]">
              <span className="text-[10px] font-semibold uppercase text-[#888888] block">Required Qty</span>
              <span className="font-garamond text-[22px] font-bold text-[#051C2C]">{demand.reqQty.toLocaleString()}</span>
              <span className="text-[11px] text-[#888888] block">Units</span>
            </div>
            <div className="p-3 bg-[#F5F5F2] rounded-[8px]">
              <span className="text-[10px] font-semibold uppercase text-[#888888] block">Allocated Qty</span>
              <span className="font-garamond text-[22px] font-bold text-[#2251FF]">{allocatedTotalQty.toLocaleString()}</span>
              <span className="text-[11px] text-[#888888] block">({Math.round((allocatedTotalQty / demand.reqQty) * 100)}% filled)</span>
            </div>
            <div className="p-3 bg-[#F5F5F2] rounded-[8px]">
              <span className="text-[10px] font-semibold uppercase text-[#888888] block">Unmet Gap</span>
              <span className={`font-garamond text-[22px] font-bold ${unmetQtyGap > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'}`}>
                {unmetQtyGap.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#888888] block">{unmetQtyGap > 0 ? 'Shortfall' : 'None'}</span>
            </div>
            <div className="p-3 bg-[#F5F5F2] rounded-[8px]">
              <span className="text-[10px] font-semibold uppercase text-[#888888] block">Est Arrival</span>
              <span className="font-garamond text-[18px] font-bold text-[#051C2C] block truncate">{maxEstArrivalDate}</span>
              <span className={`text-[11px] block font-medium ${deliveryDelayDays > 0 ? 'text-[#D32F2F]' : 'text-[#00C853]'}`}>
                {deliveryDelayDays > 0 ? `+${deliveryDelayDays}d late` : 'On Time'}
              </span>
            </div>
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white border border-[#E8E8E6] rounded-[8px] text-[12px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#888888]" />
              <span className="text-[#888888]">Destination Hub:</span>
              <span className="font-medium text-[#051C2C]">{demand.shipToLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#888888]" />
              <span className="text-[#888888]">Required Date:</span>
              <span className="font-medium text-[#051C2C]">{demand.reqDeliveryDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#888888]" />
              <span className="text-[#888888]">Primary Source:</span>
              <span className="font-medium text-[#051C2C]">{primarySupplySource}</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#888888]" />
              <span className="text-[#888888]">Strategy:</span>
              <span className="font-medium text-[#051C2C]">{isSplitOrder ? 'Multi-Echelon Split' : 'Single Source'}</span>
            </div>
          </div>

          {/* Stepped Echelon Trail Table */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-[#888888] mb-2">
              Multi-Echelon Allocation Waterfall
            </h4>
            <div className="border border-[#E8E8E6] rounded-[8px] overflow-hidden">
              <table className="w-full ofia-table text-left">
                <thead>
                  <tr>
                    <th className="px-3 py-2">Echelon Tier</th>
                    <th className="px-3 py-2 text-right">Allocated Qty</th>
                    <th className="px-3 py-2">Origin / Ref UID</th>
                    <th className="px-3 py-2 text-right">Transit Lead</th>
                    <th className="px-3 py-2">Est Arrival Date</th>
                  </tr>
                </thead>
                <tbody>
                  {details.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-4 text-center text-[#888888]">
                        No supplies could be allocated across any of the 5 echelons. Total stockout.
                      </td>
                    </tr>
                  ) : (
                    details.map((d, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 font-medium text-[#051C2C]">
                          Tier {d.echelon}: {d.echelonName}
                        </td>
                        <td className="px-3 py-2 text-right font-semibold text-[#2251FF] tabular-nums">
                          {d.allocatedQty.toLocaleString()}
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-[#051C2C]/80">
                          {d.supplyLocationOrRef}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums text-[#888888]">
                          {d.leadDays} days
                        </td>
                        <td className="px-3 py-2 text-[#051C2C] tabular-nums">
                          {d.estArrivalDate}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Recommendation */}
          <div className="p-3.5 bg-[#2251FF]/5 border-l-4 border-[#2251FF] rounded-r-[8px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2251FF] block mb-0.5">
              Action Recommendation
            </span>
            <p className="text-[12px] text-[#051C2C] font-medium leading-relaxed">
              {actionRecommendation}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E8E8E6] bg-[#F5F5F2] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px] transition-colors"
          >
            Close Drilldown
          </button>
        </div>
      </div>
    </div>
  );
};
