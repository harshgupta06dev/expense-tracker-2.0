import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addDebt, setDebt } from "../DebtSlice";
import { supabase } from "../../../Supabase-Client";

function DebtModel({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    debtType: "",
    debtName: "",
    amount: "",
    paid: 0,
    id: Date.now(),
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const resetForm = () => {
    setFormData({
      debtType: "",
      debtName: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      // ✅ allow only numbers (0–9)
      if (!/^\d*$/.test(value)) return;

      if (value.length > 9) {
        toast.error("Amount cannot exceed 9 digits");
        return;
      }
      setFormData({
        ...formData,
        amount: value,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNumber = Number(formData.amount);

    if (!Number.isSafeInteger(amountNumber) || amountNumber <= 0) {
      toast.error("Invalid amount");
      return;
    }
    if (!formData.debtType || !formData.description) {
      toast.error("Please select Type and Category");
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const finalData = {
      ...formData,
      amount: Number(formData.amount),
      user_id: user.id,
    };
    const { error } = await supabase.from("Debt").insert(finalData).single();
    if (error) return console.error(error);
    dispatch(addDebt(finalData));
    setShowModal(false);

    toast.success("debt added successfully");
    resetForm();
  };
  const handleCancel = () => {
    setShowModal(false);
    toast.error("Transaction canceled");
    resetForm();
  };
  const fetchTransactoins = async function () {
    const { error, data } = await supabase
      .from("Debt")
      .select("*")
      .order("created_at", { ascending: true });
    dispatch(setDebt(data));

    if (error) {
      console.log(error);
      return;
    }
  };
  useEffect(function () {
    fetchTransactoins();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={handleCancel}
        >
          <div
            className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-slate-700">
              <h3 className="font-semibold text-lg">Add New Debt</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  toast.error("Transactions Canceled");
                  resetForm();
                }}
                className="p-1 hover:bg-slate-700 rounded-lg transition"
                type="button"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Debt Type
                </label>
                <select
                  value={formData.debtType}
                  onChange={handleChange}
                  name="debtType"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white"
                  required
                >
                  <option value="" disabled hidden>
                    Select Debt Type
                  </option>
                  <option value="owed_to_me">Someone owes me</option>
                  <option value="i_owe">I owe someone</option>
                  <option value="credit">Credit purchase</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Person / Store Name
                </label>
                <input
                  type="text"
                  value={formData.debtName}
                  name="debtName"
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Amount
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.amount}
                    onChange={handleChange}
                    name="amount"
                    placeholder="0.00"
                    required
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    onChange={handleChange}
                    value={formData.date}
                    name="date"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="What's this for?"
                  onChange={handleChange}
                  value={formData.description}
                  name="description"
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white placeholder-slate-500"
                />
              </div>

              <button
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium mt-2"
                type="submit"
              >
                Add Debt Record
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default DebtModel;
