import { useState } from "react";
import Sidebar from "../../Components/Sidebar";

import DebtHeader from "./Components/DebtHeader";
import DebtSummaryCard from "./Components/DebtSummaryCard";
import DebtDesktop from "./Components/DebtDesktop";
import DebtMobile from "./Components/DebtMobile";
import DebtFooter from "./Components/DebtFooter";
import DebtModel from "./Components/DebtModel";
import DebtSettle from "./Components/DebtSettle";

export default function DebtTracker() {
  const [debts, setDebts] = useState([
    {
      id: 1,
      type: "owed_to_me",
      person: "John Smith",
      amount: 250,
      paid: 0,
      description: "Lunch money",
      date: "2025-01-15",
    },
    {
      id: 2,
      type: "i_owe",
      person: "Sarah Wilson",
      amount: 180,
      paid: 50,
      description: "Concert tickets",
      date: "2025-01-18",
    },
    {
      id: 3,
      type: "credit",
      person: "Electronics Store",
      amount: 899,
      paid: 200,
      description: "Laptop purchase",
      date: "2025-01-10",
    },
    {
      id: 4,
      type: "owed_to_me",
      person: "Mike Brown",
      amount: 75,
      paid: 0,
      description: "Gas money",
      date: "2025-01-20",
    },
    {
      id: 5,
      type: "i_owe",
      person: "Lisa Chen",
      amount: 45,
      paid: 0,
      description: "Movie tickets",
      date: "2025-01-22",
    },
    {
      id: 6,
      type: "credit",
      person: "Furniture Mall",
      amount: 450,
      paid: 450,
      description: "Office chair",
      date: "2025-01-12",
      settled: true,
    },
    {
      id: 7,
      type: "owed_to_me",
      person: "David Lee",
      amount: 320,
      paid: 100,
      description: "Birthday gift share",
      date: "2025-01-25",
    },
    {
      id: 8,
      type: "i_owe",
      person: "Emma Watson",
      amount: 95,
      paid: 0,
      description: "Dinner split",
      date: "2025-01-26",
    },
  ]);

  const [activeTab, setActiveTab] = useState("debt");
  const [showModal, setShowModal] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [settleAmount, setSettleAmount] = useState("");
  const [formType, setFormType] = useState("owed_to_me");
  const [formPerson, setFormPerson] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDate, setFormDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 5;

  const activeDebts = debts.filter((d) => !d.settled);
  const totalOwedToMe = activeDebts
    .filter((d) => d.type === "owed_to_me")
    .reduce((sum, d) => sum + (d.amount - d.paid), 0);
  const totalIOwe = activeDebts
    .filter((d) => d.type === "i_owe")
    .reduce((sum, d) => sum + (d.amount - d.paid), 0);
  const totalCredit = activeDebts
    .filter((d) => d.type === "credit")
    .reduce((sum, d) => sum + (d.amount - d.paid), 0);
  const netBalance = totalOwedToMe - totalIOwe - totalCredit;

  const totalPages = Math.ceil(debts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDebts = debts.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = () => {
    if (!formPerson || !formAmount) return;
    setDebts([
      ...debts,
      {
        id: Date.now(),
        type: formType,
        person: formPerson,
        amount: parseFloat(formAmount),
        paid: 0,
        description: formDesc,
        date: formDate,
      },
    ]);
    setFormType("owed_to_me");
    setFormPerson("");
    setFormAmount("");
    setFormDesc("");
    setFormDate("");
    setShowModal(false);
  };

  const openSettleModal = (debt) => {
    setSelectedDebt(debt);
    setSettleAmount("");
    setShowSettleModal(true);
  };

  const handleSettle = () => {
    if (!settleAmount || !selectedDebt) return;
    const amount = parseFloat(settleAmount);
    const remaining = selectedDebt.amount - selectedDebt.paid;
    if (amount >= remaining) {
      setDebts(
        debts.map((d) =>
          d.id === selectedDebt.id ? { ...d, paid: d.amount, settled: true } : d
        )
      );
    } else {
      setDebts(
        debts.map((d) =>
          d.id === selectedDebt.id ? { ...d, paid: d.paid + amount } : d
        )
      );
    }
    setShowSettleModal(false);
    setSelectedDebt(null);
    setSettleAmount("");
  };

  const removeDebt = (id) => {
    const newDebts = debts.filter((d) => d.id !== id);
    setDebts(newDebts);
    const newTotalPages = Math.ceil(newDebts.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0)
      setCurrentPage(newTotalPages);
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
          <DebtSummaryCard
            totalOwedToMe={totalOwedToMe}
            activeDebts={activeDebts}
            totalCredit={totalCredit}
            totalIOwe={totalIOwe}
            netBalance={netBalance}
            debts={debts}
          />

          {/* Records container */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-semibold text-lg">All Debt Records</h2>
              <span className="text-sm text-slate-400">
                {debts.length} total records
              </span>
            </div>
            {/* Desktop / tablet table (hidden on small) */}
            <DebtDesktop
              paginatedDebts={paginatedDebts}
              getTypeLabel={getTypeLabel}
              openSettleModal={openSettleModal}
              getSettleButtonText={getSettleButtonText}
              removeDebt={removeDebt}
            />
            {/* Mobile list (visible only on small screens) */}
            <DebtMobile
              paginatedDebts={paginatedDebts}
              getTypeLabel={getTypeLabel}
              openSettleModal={openSettleModal}
              getSettleButtonText={getSettleButtonText}
              removeDebt={removeDebt}
            />
            {/* Footer / pagination */}
            <DebtFooter
              startIndex={startIndex}
              itemsPerPage={itemsPerPage}
              debts={debts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>

      {/* Add Debt Modal */}
      {showModal && (
        <DebtModel
          setFormType={setFormType}
          formType={formType}
          setShowModal={setShowModal}
        />
      )}

      {/* Settle Modal */}
      {showSettleModal && selectedDebt && (
        <DebtSettle
          selectedDebt={selectedDebt}
          setShowSettleModal={setShowSettleModal}
          settleAmount={settleAmount}
          setSettleAmount={setSettleAmount}
          handleSettle={handleSettle}
        />
      )}
    </div>
  );
}
