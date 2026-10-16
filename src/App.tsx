/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useOfiaState } from './hooks/useOfiaState.ts';
import { Sidebar, TabKey } from './components/Sidebar.tsx';
import { Footer } from './components/Footer.tsx';
import { BulkCsvImportModal } from './components/BulkCsvImportModal.tsx';
import { FulfillmentView } from './views/FulfillmentView.tsx';
import { AllocationEngineView } from './views/AllocationEngineView.tsx';
import { SupplyLedgerView } from './views/SupplyLedgerView.tsx';
import { ProcurementView } from './views/ProcurementView.tsx';
import { SalesDemandView } from './views/SalesDemandView.tsx';
import { InventoryView } from './views/InventoryView.tsx';
import { PipelineView } from './views/PipelineView.tsx';
import { ReservationsView } from './views/ReservationsView.tsx';
import { MasterDataView } from './views/MasterDataView.tsx';
import { ConfigAndAuditView } from './views/ConfigAndAuditView.tsx';
import { Menu, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('fulfillment');
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    state,
    lastSavedStatus,
    supplyLedger,
    allocationResults,
    procurementSummary,
    auditIssues,
    kpis,
    updateConfig,
    updateDemand,
    addDemand,
    deleteDemand,
    updateInventory,
    addInventory,
    deleteInventory,
    updatePO,
    addPO,
    deletePO,
    updateInTransit,
    addInTransit,
    deleteInTransit,
    updateReservation,
    addReservation,
    deleteReservation,
    updateItem,
    addItem,
    deleteItem,
    updateLocation,
    addLocation,
    deleteLocation,
    updateVendor,
    addVendor,
    deleteVendor,
    exportBackup,
    importBackup,
    bulkImportCsv,
    resetData,
  } = useOfiaState();

  const handleImportJson = (jsonStr: string) => {
    const ok = importBackup(jsonStr);
    if (ok) {
      alert('Backup restored successfully!');
    } else {
      alert('Invalid backup file. Please ensure it is a valid OFIA export.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F2] text-[#1A1A2E]">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lastSavedStatus={lastSavedStatus}
        criticalAuditCount={kpis.criticalAuditCount}
        onExportBackup={exportBackup}
        onImportBackup={handleImportJson}
        onOpenCsvModal={() => setIsCsvModalOpen(true)}
        onResetData={resetData}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area Container (offset by sidebar on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px] transition-all duration-200">
        {/* Mobile Top Header (only on screens < lg) */}
        <header className="lg:hidden sticky top-0 z-30 h-14 bg-white border-b border-[#E8E8E6] px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 text-[#051C2C] hover:bg-[#F5F5F2] rounded-md transition-colors"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-garamond text-[20px] font-bold text-[#051C2C]">
              OFIA Engine
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#888888]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] inline-block animate-pulse" />
            <span className="truncate max-w-[140px]">{lastSavedStatus}</span>
          </div>
        </header>

        {/* Content Body: Max width 1400px centered, 40px left/right padding */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-[40px] pt-8 pb-12">
          {activeTab === 'fulfillment' && (
            <FulfillmentView
              allocationResults={allocationResults}
              currency={state.config.baseCurrency}
              onNavigateToDemands={() => setActiveTab('demands')}
              onNavigateToProcurement={() => setActiveTab('procurement')}
            />
          )}

          {activeTab === 'allocation_engine' && (
            <AllocationEngineView
              allocationResults={allocationResults}
              currency={state.config.baseCurrency}
            />
          )}

          {activeTab === 'supply_ledger' && (
            <SupplyLedgerView
              supplyLedger={supplyLedger}
              currency={state.config.baseCurrency}
            />
          )}

          {activeTab === 'procurement' && (
            <ProcurementView
              procurementSummary={procurementSummary}
              currency={state.config.baseCurrency}
            />
          )}

          {activeTab === 'demands' && (
            <SalesDemandView
              demands={state.demands}
              onUpdateDemand={updateDemand}
              onAddDemand={addDemand}
              onDeleteDemand={deleteDemand}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryView
              inventory={state.inventory}
              config={state.config}
              currency={state.config.baseCurrency}
              onUpdateInventory={updateInventory}
              onAddInventory={addInventory}
              onDeleteInventory={deleteInventory}
            />
          )}

          {activeTab === 'pipeline' && (
            <PipelineView
              pos={state.pos}
              inTransit={state.inTransit}
              config={state.config}
              onUpdatePO={updatePO}
              onAddPO={addPO}
              onDeletePO={deletePO}
              onUpdateInTransit={updateInTransit}
              onAddInTransit={addInTransit}
              onDeleteInTransit={deleteInTransit}
            />
          )}

          {activeTab === 'reservations' && (
            <ReservationsView
              reservations={state.reservations}
              supplyLedger={supplyLedger}
              config={state.config}
              onUpdateReservation={updateReservation}
              onAddReservation={addReservation}
              onDeleteReservation={deleteReservation}
            />
          )}

          {activeTab === 'master_data' && (
            <MasterDataView
              items={state.items}
              locations={state.locations}
              vendors={state.vendors}
              config={state.config}
              onUpdateItem={updateItem}
              onAddItem={addItem}
              onDeleteItem={deleteItem}
              onUpdateLocation={updateLocation}
              onAddLocation={addLocation}
              onDeleteLocation={deleteLocation}
              onUpdateVendor={updateVendor}
              onAddVendor={addVendor}
              onDeleteVendor={deleteVendor}
            />
          )}

          {activeTab === 'config_audit' && (
            <ConfigAndAuditView
              config={state.config}
              auditIssues={auditIssues}
              onUpdateConfig={updateConfig}
            />
          )}
        </main>

        {/* Footer with Mandatory Privacy & Security Notice */}
        <Footer />
      </div>

      {/* Global Bulk CSV Import Modal */}
      <BulkCsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImport={bulkImportCsv}
      />
    </div>
  );
}
