import { CreditCard, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Links } from "react-router-dom";

function RecentTransactions() {
  const recentTransactions = [
    {
      id: 1,
      name: "Grocery Store",
      amount: -85.5,
      date: "Nov 05",
      category: "Food",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 2500,
      date: "Nov 01",
      category: "Income",
    },
    {
      id: 3,
      name: "Netflix",
      amount: -15.99,
      date: "Nov 03",
      category: "Entertainment",
    },
    {
      id: 4,
      name: "Uber Ride",
      amount: -24.3,
      date: "Nov 04",
      category: "Transport",
    },
    {
      id: 5,
      name: "Electric Bill",
      amount: -120,
      date: "Nov 02",
      category: "Housing",
    },
  ];

  return (
    <div className="col-span-12 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-400" />
          Recent Transactions
        </h2>
        <Link to={"/transactions"}>
          <button
            // onClick={() => setActiveTab("transactions")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            See All Transactions
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Link>
      </div>
      {/* responsive grid: 1 on xs, 2 on sm, 3 on md, 5 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-slate-700 bg-opacity-50 rounded-lg p-3 hover:bg-slate-700 transition-colors"
            role="article"
            aria-label={`${transaction.name} ${transaction.amount}`}
          >
            <div className="flex flex-col gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.amount > 0 ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                <DollarSign
                  className={`w-5 h-5 ${
                    transaction.amount > 0 ? "text-green-400" : "text-red-400"
                  }`}
                />
              </div>
              <div>
                <div className="font-medium text-white text-sm truncate">
                  {transaction.name}
                </div>
                <div className="text-xs text-slate-400">
                  {transaction.category}
                </div>
              </div>
              <div>
                <div
                  className={`font-bold ${
                    transaction.amount > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
                <div className="text-xs text-slate-400">{transaction.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions;
