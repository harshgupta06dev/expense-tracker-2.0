import { Calendar } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function AddTransactionModel({ showAddModal, setShowAddModal }) {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  });
  const resetForm = () => {
    setFormData({
      type: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && value < 0) return;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      amount: Number(formData.amount),
    };
    console.log(finalData);
    toast.success("Transaction added successfully 💰");

    setShowAddModal(false);
    resetForm();
  };
  const handelCancel = function () {
    toast.error("Transaction Canceled ", { duration: 2000 });
    setShowAddModal(false);
    resetForm();
  };
  return (
    <form onSubmit={handleSubmit}>
      {showAddModal && (
        <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Add Transaction
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Type
                </label>
                <select
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="type"
                  onChange={handleChange}
                  value={formData.type}
                  required
                >
                  <option value="" disabled hidden>
                    Select Transaction Type
                  </option>
                  <option>Expense</option>
                  <option>Income</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    name="amount"
                    onChange={handleChange}
                    value={formData.amount || ""}
                    min="0"
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                      }
                    }}
                    required
                  />
                </div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="date"
                    onChange={handleChange}
                    value={formData.date}
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  required
                >
                  <option value="" disabled hidden>
                    Select Category Type
                  </option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Housing</option>
                  <option>Entertainment</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handelCancel}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
                  type="button"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default AddTransactionModel;
