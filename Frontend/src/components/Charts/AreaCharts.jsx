import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const MonthlyIncomeExpenseChart = ({ income, expenses }) => {

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  const filterCurrentMonth = (data) =>
    data.filter(item => {
      const d = new Date(item.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

  const incomeData = filterCurrentMonth(income);
  const expenseData = filterCurrentMonth(expenses);

  const merged = {};

  incomeData.forEach(i => {
    const date = formatDate(i.date);
    if (!merged[date]) merged[date] = { date, income: 0, expense: 0 };
    merged[date].income += Number(i.amount);
  });

  expenseData.forEach(e => {
    const date = formatDate(e.date);
    if (!merged[date]) merged[date] = { date, income: 0, expense: 0 };
    merged[date].expense += Number(e.amount);
  });

  const chartData = Object.values(merged).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Area
          type="monotone"
          dataKey="income"
          stroke="#4CAF50"
          fill="#A5D6A7"
          name="Income"
        />

        <Area
          type="monotone"
          dataKey="expense"
          stroke="#F44336"
          fill="#EF9A9A"
          name="Expense"
        />

      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MonthlyIncomeExpenseChart;