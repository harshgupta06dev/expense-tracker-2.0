import { useState } from "react";
import Sidebar from "../../Components/Sidebar";

import DebtHeader from "./Components/DebtHeader";
import DebtSummaryCard from "./Components/DebtSummaryCard";
import DebtDesktop from "./Components/DebtDesktop";
import DebtMobile from "./Components/DebtMobile";
import DebtFooter from "./Components/DebtFooter";
import DebtModel from "./Components/DebtModel";
import DebtSettle from "./Components/DebtSettle";
import { useSelector } from "react-redux";
import EditDebtModal from "./Components/EditDebtModal";

export default function DebtTracker() {
  const debtsList = useSelector((state) => state.debt.debts);
  const [activeTab, setActiveTab] = useState("debt");
  const [showModal, setShowModal] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [settleAmount, setSettleAmount] = useState("");
  const [formType, setFormType] = useState("owed_to_me");

  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const openSettleModal = (debt) => {
    setSelectedDebt(debt);
    setSettleAmount("");
    setShowSettleModal(true);
  };

  const getTypeLabel = (type) => {
    if (type === "owed_to_me")
      return {
        label: "To Receive",
        color: "bg-emerald-500/20 text-emerald-400",
      };
    if (type === "i_owe")
      return { label: "To Pay", color: "bg-rose-500/20 text-rose-400" };
    return { label: "Credit", color: "bg-amber-500/20 text-amber-400" };
  };

  const getSettleButtonText = (type) =>
    type === "owed_to_me" ? "Received" : "Pay";

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Main Content */}
      <div className="flex-1 min-h-screen overflow-auto">
        <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pr-4 pl-4 pb-1">
          {/* Header */}
          <DebtHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setShowModal={setShowModal}
          />

          {/* Summary cards (responsive grid) */}
          <DebtSummaryCard />

          {/* Records container */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-semibold text-lg">All Debt Records</h2>
              <span className="text-sm text-slate-400">
                {debtsList.length} total records
              </span>
            </div>
            {/* Desktop / tablet table (hidden on small) */}
            <DebtDesktop
              getTypeLabel={getTypeLabel}
              setShowSettleModal={setShowSettleModal}
              getSettleButtonText={getSettleButtonText}
              setShowEditModal={setShowEditModal}
            />
            {/* Mobile list (visible only on small screens) */}
            <DebtMobile
              getTypeLabel={getTypeLabel}
              openSettleModal={openSettleModal}
              getSettleButtonText={getSettleButtonText}
            />
            {/* Footer / pagination */}
            <DebtFooter
              startIndex={startIndex}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {/* edit Debt model */}
          </div>
        </div>
      </div>
      {/* Add Debt Modal */}

      <DebtModel
        setFormType={setFormType}
        formType={formType}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      {/* Settle Modal */}
      {showSettleModal && (
        <DebtSettle
          selectedDebt={selectedDebt}
          setShowSettleModal={setShowSettleModal}
          settleAmount={settleAmount}
          setSettleAmount={setSettleAmount}
          setShowEditModal={setShowEditModal}
        />
      )}
      {showEditModal && <EditDebtModal setShowEditModal={setShowEditModal} />}
    </div>
  );
}
