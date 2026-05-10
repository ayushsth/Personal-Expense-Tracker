import { useEffect, useState } from "react";

import MonthlyIncomeExpenseChart from "./Charts/AreaCharts";
import PieChartComponent from "./Charts/PieCharts";
import IncomePieChart from "./Charts/IncomePieChart";

import "../HomePage.css";

import.meta.env.VITE_API_URL

const Analytics = () => {
    const [income, setIncome] = useState([]);

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIncome = async () => {

            const token = localStorage.getItem("access");

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/dashboard/income/`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.log("Error fetching income");
                    return;
                }

                setIncome(data);

            } catch(error) {

                console.log("Income Error:", error);

            }
        };

        fetchIncome();

    }, []);

    useEffect(() => {

        const fetchExpenses = async () => {

            const token = localStorage.getItem("access");

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/dashboard/expenses/`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.log("Error fetching expenses");
                    setLoading(false);
                    return;
                }

                setExpenses(data);
                setLoading(false);

            } catch (error) {
                console.log("Error:", error);
                setLoading(false);
            }
        };

        fetchExpenses();

    }, []);

    return (
        
        <div className="ReCharts">
            <div className="chartsWrapper">

                <div className="chartCard">
                    <h3>Income Distribution</h3>

                    <div className="chartBox">
                        <IncomePieChart income={income}/>
                    </div>
                </div>

                <div className="chartCard">
                    <h3>Expense Distribution</h3>

                    <div className="chartBox">
                        <PieChartComponent expenses={expenses} />
                    </div>
                </div>
            </div>
            <div className="incomeVexpense">
                <br/>
                <h3>Income Vs Expense</h3>
                <div className="areaChart">
                    <MonthlyIncomeExpenseChart income={income} expenses={expenses}/>
                </div>
            </div>
            
        </div>
    );
};

export default Analytics;