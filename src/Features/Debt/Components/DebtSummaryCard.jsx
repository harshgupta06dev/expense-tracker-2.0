import { ArrowDownLeft, ArrowUpRight, CreditCard, Wallet } from "lucide-react";

function DebtSummaryCard({
  totalOwedToMe,
  activeDebts,
  totalCredit,
  totalIOwe,
  netBalance,
  debts,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      <div className="bg-green-500 rounded-xl p-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2">
          <ArrowDownLeft size={20} />
        </div>
        <p className="text-white/80 text-xs">To Receive</p>
        <p className="text-xl sm:text-2xl font-bold">
          ${totalOwedToMe.toLocaleString()}
        </p>
        <p className="text-white/70 text-xs mt-1">
          {activeDebts.filter((d) => d.type === "owed_to_me").length} people owe
          you
        </p>
      </div>

      <div className="bg-red-500 rounded-xl p-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2">
          <ArrowUpRight size={20} />
        </div>
        <p className="text-white/80 text-xs">To Repay</p>
        <p className="text-xl sm:text-2xl font-bold">
          ${totalIOwe.toLocaleString()}
        </p>
        <p className="text-white/70 text-xs mt-1">
          You owe {activeDebts.filter((d) => d.type === "i_owe").length} people
        </p>
      </div>

      <div className="bg-cyan-500 rounded-xl p-4">
        <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center mb-2">
          <CreditCard size={20} />
        </div>
        <p className="text-white/80 text-xs">Credit Balance</p>
        <p className="text-xl sm:text-2xl font-bold">
          ${totalCredit.toLocaleString()}
        </p>
        <p className="text-white/70 text-xs mt-1">
          {activeDebts.filter((d) => d.type === "credit").length} credit
          purchases
        </p>
      </div>

      <div className="bg-purple-500 rounded-xl p-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2">
          <Wallet size={20} />
        </div>
        <p className="text-white/80 text-xs">Net Balance</p>
        <p className="text-xl sm:text-2xl font-bold">
          ${netBalance.toLocaleString()}
        </p>
        <p className="text-white/70 text-xs mt-1">
          {debts.filter((d) => d.settled).length} settled records
        </p>
      </div>
    </div>
  );
}

export default DebtSummaryCard;
