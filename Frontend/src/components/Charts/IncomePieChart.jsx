import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#FF5722",
  "#9C27B0",
  "#00BCD4",
  "#795548"
];

const IncomePieChart = ({ income }) => {
  const chartData = income.reduce((acc, item) => {
    const existingCategory = acc.find(
      data => data.category === item.category
    );
    if (existingCategory) {
      existingCategory.amount += Number(item.amount);
    } else {
      acc.push({
        category: item.category,
        amount: Number(item.amount)
      });
    }
    return acc;
  }, []);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default IncomePieChart;