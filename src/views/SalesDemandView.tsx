/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Trash2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { SalesDemand } from '../types/ofia.ts';

interface SalesDemandViewProps {
  demands: SalesDemand[];
  onUpdateDemand: (index: number, updated: SalesDemand) => void;
  onAddDemand: (item: SalesDemand) => void;
  onDeleteDemand: (index: number) => void;
}

export const SalesDemandView: React.FC<SalesDemandViewProps> = ({
  demands,
  onUpdateDemand,
  onAddDemand,
  onDeleteDemand,
}) => {
  const [newOrder, setNewOrder] = useState<SalesDemand>({
    orderId: `SO-${9000 + demands.length + 1}`,
    orderLineId: '1',
    demandType: 'Firm',
    orderDate: new Date().toISOString().split('T')[0],
    customerId: 'CUST-NEW',
    customerName: 'New Client Enterprises',
    skuCode: 'SKU-101',
    reqQty: 50,
    reqDeliveryDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
    shipToLocation: 'ST01',
  });

  const handleFieldChange = (index: number, field: keyof SalesDemand, val: any) => {
    const target = { ...demands[index], [field]: val };
    onUpdateDemand(index, target);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDemand({ ...newOrder });
    setNewOrder({
      ...newOrder,
      orderId: `SO-${Math.floor(1000 + Math.random() * 9000)}`,
    });
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#2251FF]" />
          <h1 className="font-garamond text-[28px] font-bold tracking-display text-[#051C2C]">
            Sales Demand Register (Sheet 04)
          </h1>
        </div>
        <p className="text-[13px] text-[#888888] mt-0.5">
          Order demand book tracking firm customer POs and prospective quote inquiries. Editable cells with pale yellow backgrounds propagate instantly to the fulfillment engine.
        </p>
      </div>

      {/* Add New Line Card */}
      <div className="ofia-card p-5">
        <h3 className="font-garamond text-[17px] font-bold text-[#051C2C] mb-3">
          Quick Add Sales Demand Line
        </h3>
        <form onSubmit={handleAddNew} className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Order ID</label>
            <input
              type="text"
              required
              value={newOrder.orderId}
              onChange={(e) => setNewOrder({ ...newOrder, orderId: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Type</label>
            <select
              value={newOrder.demandType}
              onChange={(e) => setNewOrder({ ...newOrder, demandType: e.target.value as any })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell"
            >
              <option value="Firm">Firm Order</option>
              <option value="Quote">Quote Inquiry</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Customer</label>
            <input
              type="text"
              required
              value={newOrder.customerName}
              onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">SKU Code</label>
            <input
              type="text"
              required
              value={newOrder.skuCode}
              onChange={(e) => setNewOrder({ ...newOrder, skuCode: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Req Qty</label>
            <input
              type="number"
              required
              min={1}
              value={newOrder.reqQty}
              onChange={(e) => setNewOrder({ ...newOrder, reqQty: Number(e.target.value) || 1 })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell text-right"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Dest Hub</label>
            <input
              type="text"
              required
              value={newOrder.shipToLocation}
              onChange={(e) => setNewOrder({ ...newOrder, shipToLocation: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase text-[#888888] block mb-1">Req Date</label>
            <input
              type="date"
              required
              value={newOrder.reqDeliveryDate}
              onChange={(e) => setNewOrder({ ...newOrder, reqDeliveryDate: e.target.value })}
              className="w-full px-2.5 py-1.5 text-[12px] border border-[#E8E8E6] rounded-[6px] editable-cell"
            />
          </div>
          <div className="sm:col-span-2 md:col-span-5 flex items-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-[6px] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Demand Line</span>
            </button>
          </div>
        </form>
      </div>

      {/* Demands Table Card */}
      <div className="ofia-card p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] text-[#888888]">
            Total Demand Lines: <strong className="text-[#051C2C]">{demands.length}</strong> (Pale yellow cells are directly editable)
          </span>
        </div>

        <div className="overflow-x-auto border border-[#E8E8E6] rounded-[8px]">
          <table className="w-full ofia-table text-left">
            <thead>
              <tr>
                <th className="px-3 py-2.5">Order ID</th>
                <th className="px-3 py-2.5">Line</th>
                <th className="px-3 py-2.5">Type</th>
                <th className="px-3 py-2.5">Customer Name</th>
                <th className="px-3 py-2.5">SKU Code</th>
                <th className="px-3 py-2.5 text-right">Req Qty</th>
                <th className="px-3 py-2.5">Ship-To Hub</th>
                <th className="px-3 py-2.5">Req Delivery Date</th>
                <th className="px-3 py-2.5 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {demands.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F5F5F2]/40">
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={row.orderId}
                      onChange={(e) => handleFieldChange(idx, 'orderId', e.target.value)}
                      className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6] font-medium text-[#051C2C]"
                    />
                  </td>
                  <td className="px-2 py-1.5 w-[60px]">
                    <input
                      type="text"
                      value={row.orderLineId}
                      onChange={(e) => handleFieldChange(idx, 'orderLineId', e.target.value)}
                      className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6] text-center"
                    />
                  </td>
                  <td className="px-2 py-1.5 w-[100px]">
                    <select
                      value={row.demandType}
                      onChange={(e) => handleFieldChange(idx, 'demandType', e.target.value)}
                      className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                    >
                      <option value="Firm">Firm</option>
                      <option value="Quote">Quote</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={row.customerName}
                      onChange={(e) => handleFieldChange(idx, 'customerName', e.target.value)}
                      className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6] text-[#051C2C]"
                    />
                  </td>
                  <td className="px-2 py-1.5 w-[110px]">
                    <input
                      type="text"
                      value={row.skuCode}
                      onChange={(e) => handleFieldChange(idx, 'skuCode', e.target.value)}
                      className="w-full px-2 py-1 text-[12px] font-mono rounded editable-cell border border-[#E8E8E6] text-[#051C2C]"
                    />
                  </td>
                  <td className="px-2 py-1.5 w-[100px]">
                    <input
                      type="number"
                      min={1}
                      value={row.reqQty}
                      onChange={(e) => handleFieldChange(idx, 'reqQty', Number(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6] text-right font-semibold text-[#051C2C]"
                    />
                  </td>
                  <td className="px-2 py-1.5 w-[90px]">
                    <input
                      type="text"
                      value={row.shipToLocation}
                      onChange={(e) => handleFieldChange(idx, 'shipToLocation', e.target.value)}
                      className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6] font-medium text-[#051C2C]"
                    />
                  </td>
                  <td className="px-2 py-1.5 w-[130px]">
                    <input
                      type="date"
                      value={row.reqDeliveryDate}
                      onChange={(e) => handleFieldChange(idx, 'reqDeliveryDate', e.target.value)}
                      className="w-full px-2 py-1 text-[12px] rounded editable-cell border border-[#E8E8E6]"
                    />
                  </td>
                  <td className="px-2 py-1.5 text-center w-[50px]">
                    <button
                      onClick={() => onDeleteDemand(idx)}
                      className="p-1 text-[#888888] hover:text-[#D32F2F] transition-colors"
                      title="Delete demand line"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
