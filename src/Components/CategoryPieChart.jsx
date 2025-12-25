import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  PieChart,
} from "recharts";
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  console.log(payload);
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
function CategoryPieChart({ withoutLegend, pieRadius, pieData, chartHeight }) {
  const categoryData = [
    { name: "Food", value: 850, color: "#f97316" },
    { name: "Transport", value: 420, color: "#3b82f6" },
    { name: "Shopping", value: 680, color: "#a855f7" },
    { name: "Housing", value: 1200, color: "#22c55e" },
    { name: "Entertainment", value: 180, color: "#ec4899" },
    { name: "Healthcare", value: 120, color: "#ef4444" },
  ];
  return (
    <>
      {withoutLegend ? (
        <div className="bg-slate-800 rounded-2xl p-3 md:p-4 flex flex-col items-center">
          <h3 className="text-base md:text-lg font-semibold mb-2 w-full">
            Category Distribution
          </h3>
          <div style={{ width: "100%", height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
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
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="col-span-12 lg:col-span-8 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-400" />
            Category-wise Expenses
          </h2>

          {/* Custom Tooltip to show percent + value on hover */}
          {/* place custom component inside file scope or above return */}
          {/* Example: const CustomTooltip = ({ active, payload }) => { ... } */}

          <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3">
            {/* LEFT: Chart (keeps square ratio, centered) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="w-full max-w-60 sm:max-w-[280px] aspect-square mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      // remove slice labels (they overlap)
                      // labelLine={false}
                      outerRadius="80%"
                      dataKey="value"
                      label={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>

                    {/* use custom tooltip below */}
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* RIGHT: Legend — tight, vertically-centered */}
            <div className="w-full lg:w-1/2 space-y-3">
              {categoryData.map((category) => (
                <div
                  key={category.name}
                  className="
            relative
            flex items-center justify-between 
            p-3
            bg-slate-700/40
            rounded-lg 
            cursor-pointer
            overflow-hidden
            "
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition"></div>

                  {/* content */}
                  <div className="relative flex items-center gap-3 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-slate-200 text-sm font-medium truncate">
                      {category.name}
                    </span>
                  </div>

                  <div className="relative text-white font-semibold text-sm ml-4">
                    ${category.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryPieChart;
