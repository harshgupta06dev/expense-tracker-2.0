import { BarChart3, CreditCard, Home, List, Wallet, X } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar({ activeTab, setSidebarOpen, setActiveTab, sidebarOpen }) {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "transactions", name: "Transactions", icon: List },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "debt", name: "Debt", icon: CreditCard },
  ];
  return (
    <aside
      aria-label="Sidebar"
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static top-0 left-0 z-50 w-64 h-screen bg-slate-800 border-r border-slate-700 transition-transform duration-300`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ExpenseFlow</span>
          </div>
          <button
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        {/* Make nav scrollable if many items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                to={`/${item.id}`}
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <div
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left focus:outline-none ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />{" "}
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <div className="text-sm font-medium text-white">John Doe</div>
              <div className="text-xs text-slate-400">john@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
