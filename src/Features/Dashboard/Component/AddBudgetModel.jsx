// import { useState } from "react";

import { Calendar, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addBudget,
  setBudget,
} from "../../addTransactionModel/TransactionSlice";
import { supabase } from "../../../Supabase-Client";

function AddBudgetModel({ showBudgetModal, setShowBudgetModal }) {
  const dispatch = useDispatch();
  const existingBudget = useSelector((state) => state.transactions.budgetList);
  // const isEditMode = !!existingBudget;
  const budgetMode = useSelector((state) => state.transactions.budgetMode);

  useEffect(() => {
    if (!showBudgetModal) return;

    if (budgetMode === "edit" && existingBudget) {
      setBudgetData({
        amount: existingBudget.amount,
        timePeriod: existingBudget.timePeriod,
        date: existingBudget.date,
        category: existingBudget.category,
      });
    }

    if (budgetMode === "add") {
      setBudgetData({
        amount: "",
        timePeriod: "",
        date: new Date().toISOString().split("T")[0],
        category: "All Categories",
      });
    }
  }, [showBudgetModal, budgetMode, existingBudget]);

  const [budgetData, setBudgetData] = useState({
    amount: "",
    timePeriod: "",
    date: new Date().toISOString().split("T")[0],
    category: "All Categories",
  });
  const resetForm = () => {
    setBudgetData({
      amount: "",
      timePeriod: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" && value < 0) return;
    setBudgetData({
      ...budgetData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedPeriod = budgetData.timePeriod.toLowerCase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const finalData = {
      amount: Number(budgetData.amount),
      timePeriod: normalizedPeriod,
      date: budgetData.date,
      category: budgetData.category || "All Categories",
      user_id: user.id,
    };

    if (budgetMode === "edit") {
      // 🔥 UPDATE
      const { error } = await supabase
        .from("budget")
        .update(finalData)
        .eq("id", existingBudget.id);

      if (error) {
        console.log(error);
        return;
      }

      dispatch(setBudget({ ...finalData, id: existingBudget.id }));
      toast.success("Budget updated successfully ✅");
    } else {
      // 🔥 INSERT
      const { data, error } = await supabase
        .from("budget")
        .insert(finalData)
        .select()
        .single(); // returns inserted row

      if (error) {
        console.log(error);
        return;
      }

      dispatch(addBudget(data));
      toast.success("Budget added successfully 💰");
    }

    setShowBudgetModal(false);
    resetForm();
  };
  const handelCancel = function () {
    toast.error("Budget Canceled ", { duration: 2000 });
    setShowBudgetModal(false);
    resetForm();
  };

  const fetchTransactoins = async function () {
    const { error, data } = await supabase
      .from("budget")
      .select("*")
      .order("created_at", { ascending: false }) // 🔥 newest first
      .limit(1); // even better — only fetch 1 row

    if (error) {
      console.log(error);
      return;
    }

    if (data.length > 0) {
      dispatch(setBudget(data[0]));
    }

    console.log("this is a supabase data", data);
  };
  useEffect(function () {
    fetchTransactoins();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
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
                    name="amount"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    min="1"
                    onChange={handleChange}
                    value={budgetData.amount}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Time Period
                </label>
                <select
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  name="timePeriod"
                  value={budgetData.timePeriod}
                  required
                >
                  <option value="" disabled hidden>
                    Select Tiime Period
                  </option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Date
                </label>

                {/* Input wrapper */}
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />

                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="date"
                    onChange={handleChange}
                    value={budgetData.date}
                  />
                </div>
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
                  type="button"
                  onClick={handelCancel}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg">
                  {budgetMode === "edit" && "Edit Budget"}
                  {budgetMode === "add" && "Add new Budget"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default AddBudgetModel;
