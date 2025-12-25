import { Menu } from "lucide-react";
import AddTransactionBtn from "../../../Components/AddTransactionBtn";

function Header({ setShowAddModal, setSidebarOpen }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Mobile Menu Button */}
        <button
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-slate-300 p-2 rounded-md hover:bg-slate-700 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
            Transactions
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Manage and track all your transactions
          </p>
        </div>
      </div>

      <div className="w-full md:w-auto flex gap-2 md:gap-3 justify-end">
        <AddTransactionBtn setShowAddModal={setShowAddModal} />
      </div>
    </div>
  );
}

export default Header;
