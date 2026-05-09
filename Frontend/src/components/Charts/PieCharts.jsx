import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#775DD0",
  "#4CAF50"
];

const PieChartComponent = ({ expenses }) => {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(
      item => item.name === expense.category
    );
    if (existing) {
      existing.value += Number(expense.amount);
    } else {
      acc.push({
        name: expense.category,
        value: Number(expense.amount)
      });
    }
    return acc;
  }, []);

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;