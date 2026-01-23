import { useSelector } from "react-redux";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  PieChart,
} from "recharts";
import EmptyCardState from "./EmptyCardState";
import { selectFilteredTransactions } from "../Features/addTransactionModel/TransactionSlice";
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0];
  // payload[0].percent is provided by Recharts for Pie
  const percent =
    item && typeof item.percent === "number"
      ? (item.percent * 100).toFixed(0)
      : null;

  return (
    <div className="bg-slate-800 border border-slate-700 text-white p-2 rounded shadow">
      <div className="text-sm font-medium">{item.name}</div>
      <div className="text-xs text-slate-300">
        {percent !== null ? `${percent}%` : ""} {percent !== null && "•"}$
        {item.value}
      </div>
    </div>
  );
};
function CategoryPieChart({
  withoutLegend,
  pieRadius,
  pieData,
  chartHeight,
  setShowAddModal,
}) {
  const CATEGORY_COLORS = {
    Food: "#f97316",
    Transport: "#3b82f6",
    Shopping: "#a855f7",
    Housing: "#22c55e",
    Entertainment: "#ec4899",
    Healthcare: "#ef4444",
  };
  const dashboardTransactions = useSelector(selectFilteredTransactions);

  const categoryPieDate = function (transactions) {
    const categoryPieData = Object.values(
      transactions.reduce((acc, tx) => {
        if (tx.type !== "Expense") return acc;

        if (!acc[tx.category]) {
          acc[tx.category] = {
            name: tx.category, // 👈 for Pie label
            value: 0, // 👈 Pie uses this
            color: CATEGORY_COLORS[tx.category] || "#94a3b8", // default color
          };
        }

        acc[tx.category].value += tx.amount;
        return acc;
      }, {}),
    );
    return categoryPieData;
  };
  const analyticsTransactions = useSelector(
    (state) => state.transactions.analyticsCurrentData,
  );
  const DashboardPieData = categoryPieDate(dashboardTransactions);
  const analyticsPieData = categoryPieDate(analyticsTransactions);
  const hasDashboardCategoryData = DashboardPieData.length > 0;
  const hasAnalyticsCategoryData = analyticsPieData.length > 0;
  return (
    <>
      {withoutLegend ? (
        hasAnalyticsCategoryData ? (
          <div className="bg-slate-800 rounded-2xl p-3 md:p-4 flex flex-col items-center">
            <h3 className="text-base md:text-lg font-semibold mb-2 w-full">
              Category Distribution
            </h3>

            <div style={{ width: "100%", height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={pieRadius}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="h-80 w-full flex items-center justify-center bg-slate-800">
            <EmptyCardState setShowAddModal={setShowAddModal} />
          </div>
        )
      ) : (
        <div className="col-span-12 lg:col-span-8 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-400" />
            Category-wise Expenses
          </h2>

          {/* Custom Tooltip to show percent + value on hover */}
          {/* place custom component inside file scope or above return */}
          {/* Example: const CustomTooltip = ({ active, payload }) => { ... } */}

          {hasDashboardCategoryData ? (
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              {/* LEFT: Pie Chart */}
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-60 sm:max-w-[280px] aspect-square">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={DashboardPieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                      >
                        {DashboardPieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* RIGHT: Legend */}
              <div className="w-full lg:w-1/2 space-y-3">
                {DashboardPieData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-200 text-sm font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-white font-semibold text-sm">
                      ₹{item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* EMPTY STATE — FULL CARD CENTERED */
            <div className="h-80 w-full flex items-center justify-center">
              <EmptyCardState setShowAddModal={setShowAddModal} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CategoryPieChart;
