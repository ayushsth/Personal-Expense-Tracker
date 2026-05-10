import { useEffect, useState } from "react";
import "../HomePage.css";

import IncomePieChart from "./Charts/IncomePieChart";
import PieChartComponent from "./Charts/PieCharts";

import MoneyIcon from '@mui/icons-material/Money';
import ReceiptIcon from "@mui/icons-material/Receipt";
import BalanceIcon from "@mui/icons-material/Balance";

import PaidIcon from "@mui/icons-material/Paid";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import SchoolIcon from "@mui/icons-material/School";
import HouseIcon from "@mui/icons-material/House";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

import.meta.env.VITE_API_URL

const Dashboard = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const incomeCategoryIcons = {
    Salary: <WorkIcon />,
    Profit: <TrendingUpIcon />,
    "Capital Gains": <ShowChartIcon />,
    Royalty: <EmojiObjectsIcon />,
    Interest: <AccountBalanceIcon />,
    Dividend: <ShowChartIcon />,
    Rental: <HomeIcon />,
    Default: <PaidIcon />
  };

  const expenseCategoryIcons = {
    Food: <FastfoodIcon />,
    Health: <HealthAndSafetyIcon />,
    Clothing: <CheckroomIcon />,
    Transportation: <DirectionsCarFilledIcon />,
    Education: <SchoolIcon />,
    Housing: <HouseIcon />,
    Entertainment: <SportsEsportsIcon />,
    Others: <MiscellaneousServicesIcon />
  };

  const formatIncome = (data) =>
    data.map((item) => ({
      id: `income-${item.id}`,
      type: "income",
      amount: Number(item.amount),
      category: item.category,
      date: item.date,
      description: item.description,
    }));

  const formatExpenses = (data) =>
    data.map((item) => ({
      id: `expense-${item.id}`,
      type: "expense",
      amount: Number(item.amount),
      category: item.category,
      date: item.date,
      description: item.description,
    }));

  useEffect(() => {
    const token = localStorage.getItem("access");

    const fetchData = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/income/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/expenses/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const incomeData = await incomeRes.json();
        const expenseData = await expenseRes.json();

        setIncome(formatIncome(incomeData));
        setExpenses(formatExpenses(expenseData));
        setLoading(false);
      } catch (err) {
        console.log("Dashboard fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
        ? ((totalBalance / totalIncome) * 100).toFixed(1)
        : 0;

    const highestExpense =
    expenses.length > 0
        ? expenses.reduce((max, item) =>
            item.amount > max.amount ? item : max
        )
        : null;

    const biggestIncome =
    income.length > 0
        ? income.reduce((max, item) =>
            item.amount > max.amount ? item : max
        )
        : null;

  const activity = [...income, ...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const getIcon = (item) => {
    if (item.type === "income") {
      return incomeCategoryIcons[item.category] || incomeCategoryIcons.Default;
    }
    return expenseCategoryIcons[item.category] || null;
  };

  return (
    <div>

      {/* SUMMARY */}
      <div className="summaryCards">
        <div className="totalIncome">
          <div className="cardTitle">
            <MoneyIcon /> Total Income
          </div>
          <div>Rs. {totalIncome}</div>
        </div>

        <div className="totalExpenses">
          <div className="cardTitle">
            <ReceiptIcon /> Total Expenses
          </div>
          <div>Rs. {totalExpenses}</div>
        </div>

        <div className="totalBalance">
          <div className="cardTitle">
            <BalanceIcon /> Balance
          </div>
          <div>Rs. {totalBalance}</div>
        </div>
      </div>

      <div className="ReCharts">
        <div className="chartsWrapper">
          <div className="chartCard">
            <h3>Income Distribution</h3>
            <IncomePieChart income={income} />
          </div>

          <div className="chartCard">
            <h3>Expense Distribution</h3>
            <PieChartComponent expenses={expenses} />
          </div>
        </div>
      </div>

      <div className="bottomSection">
        <div className="transactionsContainer">

            <div className="transactionsHeader">
            <div>
                <h2>Recent Transactions</h2>
                <p>Income + Expenses timeline</p>
            </div>
            </div>

            {loading ? (
            <p>Loading...</p>
            ) : (
            activity.slice(0, 6).map((item) => (
                <div key={item.id} className="transactionCard">

                <div className="transactionLeft">

                    <div
                    className={
                        item.type === "income"
                        ? "transactionIcon incomeIcon"
                        : "transactionIcon expenseIcon"
                    }
                    >
                    {getIcon(item)}
                    </div>

                    <div className="transactionInfo">
                    <h3>{item.category}</h3>
                    <p>{item.date}</p>
                    </div>
                </div>

                <div
                    className={
                    item.type === "income"
                        ? "amount incomeAmount"
                        : "amount expenseAmount"
                    }
                >
                    {item.type === "income" ? "+" : "-"} Rs.{item.amount}
                </div>

                </div>
            ))
            )}
        </div>

        <div className="insightsPanel">

            <div className="insightCard balanceCard">
            <h3>Total Balance</h3>
            <h1>Rs.{totalBalance}</h1>
            </div>

            <div className="insightCard">
            <h4>Savings Rate</h4>
            <p className="greenText">{savingsRate}%</p>
            </div>

            <div className="insightCard">
            <h4>Highest Expense</h4>

            {highestExpense ? (
                <>
                <p>{highestExpense.category}</p>
                <span className="redText">
                    Rs.{highestExpense.amount}
                </span>
                </>
            ) : (
                <p>No expenses</p>
            )}
            </div>

            <div className="insightCard">
            <h4>Biggest Income</h4>

            {biggestIncome ? (
                <>
                <p>{biggestIncome.category}</p>
                <span className="greenText">
                    Rs.{biggestIncome.amount}
                </span>
                </>
            ) : (
                <p>No income</p>
            )}
            </div>

        </div>
        </div>
    </div>
  );
};

export default Dashboard;