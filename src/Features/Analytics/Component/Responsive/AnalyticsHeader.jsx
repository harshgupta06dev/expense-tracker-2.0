import { Calendar, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

function AnalyticsHeader({ sidebarOpen, setSidebarOpen }) {
  const [selectedMonth, setSelectedMonth] = useState("Nov 2024");
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const allMonthsData = {
    "Jan 2024": {
      total: 2650,
      Food: 700,
      Transport: 380,
      Shopping: 550,
      Housing: 1200,
      Entertainment: 150,
      Healthcare: 100,
    },
    "Feb 2024": {
      total: 2580,
      Food: 680,
      Transport: 370,
      Shopping: 520,
      Housing: 1200,
      Entertainment: 140,
      Healthcare: 90,
    },
    "Mar 2024": {
      total: 2800,
      Food: 750,
      Transport: 400,
      Shopping: 600,
      Housing: 1200,
      Entertainment: 160,
      Healthcare: 110,
    },
    "Apr 2024": {
      total: 2900,
      Food: 780,
      Transport: 420,
      Shopping: 650,
      Housing: 1200,
      Entertainment: 170,
      Healthcare: 100,
    },
    "May 2024": {
      total: 2750,
      Food: 720,
      Transport: 390,
      Shopping: 580,
      Housing: 1200,
      Entertainment: 155,
      Healthcare: 105,
    },
    "Jun 2024": {
      total: 2800,
      Food: 750,
      Transport: 380,
      Shopping: 650,
      Housing: 1200,
      Entertainment: 150,
      Healthcare: 100,
    },
    "Jul 2024": {
      total: 3200,
      Food: 820,
      Transport: 400,
      Shopping: 700,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
    "Aug 2024": {
      total: 2900,
      Food: 780,
      Transport: 390,
      Shopping: 620,
      Housing: 1200,
      Entertainment: 160,
      Healthcare: 110,
    },
    "Sep 2024": {
      total: 3450,
      Food: 850,
      Transport: 420,
      Shopping: 680,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
    "Oct 2024": {
      total: 3100,
      Food: 800,
      Transport: 410,
      Shopping: 640,
      Housing: 1200,
      Entertainment: 170,
      Healthcare: 115,
    },
    "Nov 2024": {
      total: 3450,
      Food: 850,
      Transport: 420,
      Shopping: 680,
      Housing: 1200,
      Entertainment: 180,
      Healthcare: 120,
    },
  };

  const monthsList = Object.keys(allMonthsData);
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      {/* Left text section */}
      <div className="text-center md:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
          Analytics
        </h1>
        <p className="text-gray-400 text-sm">Track your spending patterns</p>
      </div>

      {/* Month Picker */}
      <div className="flex items-center justify-between mb-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* MENU BUTTON (Only when sidebar hidden & mobile) */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-slate-800 hover:bg-slate-700 
                   p-2 rounded-lg border border-slate-700"
            >
              <Menu className="w-5 h-5 text-blue-400" />
            </button>
          )}
        </div>

        {/* Month Picker */}
        <div className="relative flex justify-center md:justify-end">
          <button
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="flex items-center justify-between gap-2 
                 w-full sm:w-auto
                 bg-slate-800 hover:bg-slate-700 
                 px-4 py-2 rounded-lg 
                 transition-colors 
                 border border-slate-700 
                 text-sm"
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="font-semibold">{selectedMonth}</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                showMonthPicker ? "rotate-180" : ""
              }`}
            />
          </button>

          {showMonthPicker && (
            <div
              className="absolute top-full mt-2 
                      w-full sm:w-44 
                      bg-slate-800 border border-slate-700 
                      rounded-xl shadow-2xl z-50 
                      max-h-80 overflow-y-auto"
            >
              {monthsList.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setShowMonthPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-slate-700 transition-colors ${
                    selectedMonth === month
                      ? "bg-blue-600 text-white"
                      : "text-gray-300"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsHeader;
