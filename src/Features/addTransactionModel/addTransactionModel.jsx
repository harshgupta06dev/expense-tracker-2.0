// import { Calendar } from "lucide-react";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addTransaction,
//   setTransactionMode,
//   updateTransaction,
// } from "./TransactionSlice";

// function AddTransactionModel({ showAddModal, setShowAddModal }) {
//   const dispatch = useDispatch();
//   const transactionMode = useSelector(
//     (state) => state.transactions.transactionMode,
//   );
//   const editingTransaction = useSelector(
//     (state) => state.transactions.updateTransaction,
//   );

//   const [formData, setFormData] = useState({
//     type: "",
//     description: "",
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     category: "",
//   });

//   useEffect(() => {
//     if (editingTransaction) {
//       setFormData({
//         type: editingTransaction.type,
//         description: editingTransaction.description,
//         amount: editingTransaction.amount,
//         date: editingTransaction.date,
//         category: editingTransaction.category,
//       });

//       if (transactionMode === "add") {
//         resetForm();
//       }
//     }
//   }, [transactionMode, editingTransaction]);

//   const resetForm = () => {
//     setFormData({
//       type: "",
//       description: "",
//       amount: "",
//       date: new Date().toISOString().split("T")[0],
//       category: "",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "amount" && value < 0) return;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const finalData = {
//       ...formData,
//       amount: Number(formData.amount),
//       id: transactionMode === "edit" ? editingTransaction.id : Date.now(),
//     };

//     if (transactionMode === "edit") {
//       dispatch(updateTransaction(finalData));
//       toast.success("Transaction updated ✅");
//     } else {
//       dispatch(addTransaction(finalData));
//       toast.success("Transaction added 💰");
//     }

//     dispatch(setTransactionMode("add"));
//     setShowAddModal(false);
//     resetForm();
//   };

//   const handelCancel = () => {
//     toast.error("Transaction Canceled", { duration: 2000 });
//     setShowAddModal(false);
//     resetForm();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {showAddModal && (
//         <div
//           className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//           onClick={() => {
//             setShowAddModal(false);
//             resetForm();
//             toast.error("Transaction Canceled", { duration: 2000 });
//           }}
//         >
//           <div
//             className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="text-2xl font-bold text-white mb-4">
//               Add Transaction
//             </h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-slate-300 mb-2 text-sm">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
//                   name="description"
//                   onChange={handleChange}
//                   value={formData.description}
//                   placeholder="Enter Description"
//                   required
//                 />
//               </div>
//               {/* Type */}
//               <div>
//                 <label className="block text-slate-300 mb-2 text-sm">
//                   Type
//                 </label>
//                 <select
//                   className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
//                   name="type"
//                   onChange={handleChange}
//                   value={formData.type}
//                   required
//                 >
//                   <option value="" disabled hidden>
//                     Select Transaction Type
//                   </option>
//                   <option>Income</option>
//                   <option>Expense</option>
//                 </select>
//               </div>

//               {/* Amount */}
//               <div>
//                 <label className="block text-slate-300 mb-2 text-sm">
//                   Amount
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//                     $
//                   </span>
//                   <input
//                     type="number"
//                     className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg"
//                     name="amount"
//                     onChange={handleChange}
//                     value={formData.amount || ""}
//                     min="0"
//                     placeholder="0.00"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-slate-300 mb-2 text-sm">
//                   Category
//                 </label>
//                 <select
//                   className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
//                   name="category"
//                   onChange={handleChange}
//                   value={formData.category}
//                   required
//                 >
//                   <option value="" disabled hidden>
//                     Select Category Type
//                   </option>
//                   {formData.type === "Expense" && (
//                     <>
//                       <option>Food</option>
//                       <option>Transport</option>
//                       <option>Shopping</option>
//                       <option>Housing</option>
//                       <option>Entertainment</option>
//                       <option>Healthcare</option>
//                     </>
//                   )}
//                   {formData.type === "Income" && (
//                     <>
//                       <option>Job</option>
//                       <option>Bussiness</option>
//                       <option>Royalty</option>
//                       <option>Investment</option>
//                       <option>Real Estate</option>
//                       <option>Other</option>
//                     </>
//                   )}
//                 </select>
//               </div>

//               {/* Description */}

//               {/* Date */}
//               <div>
//                 <label className="block text-slate-300 mb-2 text-sm">
//                   Date
//                 </label>
//                 <div className="relative">
//                   <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     type="date"
//                     className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg"
//                     name="date"
//                     onChange={handleChange}
//                     value={formData.date}
//                   />
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={handelCancel}
//                   className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg">
//                   {transactionMode === "edit" ? "Edit" : "Add"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </form>
//   );
// }

// export default AddTransactionModel;
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  setTransactionMode,
  updateTransaction,
} from "./TransactionSlice";

function AddTransactionModel({ showAddModal, setShowAddModal }) {
  const dispatch = useDispatch();
  const transactionMode = useSelector(
    (state) => state.transactions.transactionMode,
  );
  const editingTransaction = useSelector(
    (state) => state.transactions.updateTransaction,
  );

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  });

  useEffect(() => {
    if (editingTransaction && transactionMode === "edit") {
      setFormData({
        type: editingTransaction.type,
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        date: editingTransaction.date,
        category: editingTransaction.category,
      });
    }

    if (transactionMode === "add") {
      resetForm();
    }
  }, [transactionMode, editingTransaction]);

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

    // 🔥 Reset category when type changes
    if (name === "type") {
      setFormData({
        ...formData,
        type: value,
        category: "",
      });
      return;
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.type || !formData.category) {
      toast.error("Please select Type and Category");
      return;
    }

    const finalData = {
      ...formData,
      amount: Number(formData.amount),
      id: transactionMode === "edit" ? editingTransaction.id : Date.now(),
    };

    if (transactionMode === "edit") {
      dispatch(updateTransaction(finalData));
      toast.success("Transaction updated ✅");
    } else {
      dispatch(addTransaction(finalData));
      toast.success("Transaction added 💰");
    }

    dispatch(setTransactionMode("add"));
    setShowAddModal(false);
    resetForm();
  };

  const handelCancel = () => {
    toast.error("Transaction Canceled", { duration: 2000 });
    setShowAddModal(false);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      {showAddModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => {
            setShowAddModal(false);
            resetForm();
            toast.error("Transaction Canceled", { duration: 2000 });
          }}
        >
          <div
            className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Add Transaction
            </h3>

            <div className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  placeholder="Enter Description"
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Type
                </label>
                <select
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
                  name="type"
                  onChange={handleChange}
                  value={formData.type}
                  required
                >
                  <option value="" disabled hidden>
                    Select Transaction Type
                  </option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <input
                    type="text"
                    className="w-full pl-8 pr-4 py-3 bg-slate-700 text-white rounded-lg"
                    name="amount"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={handleChange}
                    value={formData.amount || ""}
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Category
                </label>

                <select
                  className={`w-full px-4 py-3 rounded-lg 
                    ${
                      !formData.type
                        ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                        : "bg-slate-700 text-white"
                    }`}
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  disabled={!formData.type}
                  required
                >
                  <option value="">
                    {formData.type
                      ? "Select Category"
                      : "Select Transaction type first"}
                  </option>

                  {formData.type === "Expense" && (
                    <>
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Shopping</option>
                      <option>Housing</option>
                      <option>Entertainment</option>
                      <option>Healthcare</option>
                    </>
                  )}

                  {formData.type === "Income" && (
                    <>
                      <option>Job</option>
                      <option>Business</option>
                      <option>Royalty</option>
                      <option>Investment</option>
                      <option>Real Estate</option>
                      <option>Other</option>
                    </>
                  )}
                </select>

                {!formData.type && (
                  <p className="text-xs text-slate-400 mt-1">
                    Please select Income or Expense first
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 text-white rounded-lg"
                    name="date"
                    onChange={handleChange}
                    value={formData.date}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handelCancel}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg">
                  {transactionMode === "edit" ? "Edit" : "Add"}
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
