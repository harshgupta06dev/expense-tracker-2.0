// import { useState } from "react";

import { DollarSign } from "lucide-react";

function AddBudgetModel({ showBudgetModal, setShowBudgetModal }) {
  return (
    <div>
      {" "}
      {showBudgetModal && (
        <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Set Your Budget
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5000.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Time Period
                </label>
                <select className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Budget Category (Optional)
                </label>
                <select className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Housing</option>
                  <option>Entertainment</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start gap-2">
                  <div className="bg-blue-500 bg-opacity-20 p-1 rounded">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">
                      Setting a budget helps you track your spending and stay on
                      top of your financial goals.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowBudgetModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg">
                  Set Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBudgetModel;
