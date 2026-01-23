import { useSelector } from "react-redux";

function AnalyticsCategory({ categories }) {
  const CATEGORY_COLORS = {
    Food: "#f97316",
    Transport: "#3b82f6",
    Shopping: "#a855f7",
    Housing: "#22c55e",
    Entertainment: "#ec4899",
    Healthcare: "#ef4444",
  };

  const getCategoryData = function (transactoins) {
    const categoryAnalyticsData = Object.values(
      transactoins.reduce((acc, tx) => {
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
    const currentData = categoryAnalyticsData.reduce(
      (acc, item) => {
        acc[item.name] = item.value; // category value
        acc.total += item.value; // total sum
        return acc;
      },
      { total: 0 },
    );
    return currentData;
  };
  const analyticsCurrentData = useSelector(
    (state) => state.transactions.analyticsCurrentData,
  );
  const prevTransaction = useSelector(
    (state) => state.transactions.analyticsPrevTransaction,
  );

  const currentData = getCategoryData(analyticsCurrentData);
  const previousData = getCategoryData(prevTransaction);

  return (
    <section className="bg-slate-800 rounded-2xl p-3 md:p-4 mb-4">
      <h3 className="text-base md:text-lg font-semibold mb-3">
        Spending by Category
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category) => {
          const current = currentData[category.name] ?? 0;
          const previous = previousData[category.name] ?? 0;
          // console.log(currentData.hasOwnProperty("Food"));
          // console.log(category);
          // console.log(Object.values(category).includes("Food"));
          let change = 0;
          if (previous > 0) {
            change = (((current - previous) / previous) * 100).toFixed(1);
          }

          const isIncrease = current > previous;
          const percentage = currentData.total
            ? ((current / currentData.total) * 100).toFixed(1)
            : 0;
          // console.log(currentData);
          // console.log(currentData);
          // consol e.log("this is a category name", category.name);

          return (
            <div
              key={category.name}
              className="bg-linear-to-br from-slate-700 to-slate-800 rounded-xl p-3 border border-slate-600 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  <h4 className="font-semibold text-sm md:text-base truncate">
                    {category.name}
                  </h4>
                </div>
              </div>

              <div className="mb-2">
                <p
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: category.color }}
                >
                  ₹{current}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {percentage}% of total spending
                </p>
              </div>

              <div className="relative h-2 bg-slate-600/50 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>

              {previousData && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">vs last month</span>
                  <span
                    className={`font-semibold ${
                      isIncrease ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {isIncrease ? "↑" : "↓"} {Math.abs(change)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AnalyticsCategory;
