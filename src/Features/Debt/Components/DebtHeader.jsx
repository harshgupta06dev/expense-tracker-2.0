import { Menu, Plus } from "lucide-react";

function DebtHeader({ sidebarOpen, setSidebarOpen, setShowModal }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Debt Manager</h1>
          <p className="text-slate-400 text-sm">Track your debts & credits</p>
        </div>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-sm w-full sm:w-auto"
      >
        <Plus size={16} /> Add Debt
      </button>
    </div>
  );
}

export default DebtHeader;
