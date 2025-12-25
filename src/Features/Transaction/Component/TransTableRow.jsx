import { Edit2, Trash2 } from "lucide-react";

function TransTableRow({ transaction, formatDate }) {
  return (
    <tr
      key={transaction.id}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">
        {formatDate(transaction.date)}
      </td>
      <td className="px-4 py-3 text-gray-800 truncate max-w-[220px]">
        {transaction.name}
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            transaction.type === "income"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </span>
      </td>
      <td className="px-4 py-3 text-right text-gray-800 font-semibold whitespace-nowrap">
        ${transaction.amount.toLocaleString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => console.log("Edit transaction:", transaction.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit transaction"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => console.log("Delete transaction:", transaction.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete transaction"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TransTableRow;
