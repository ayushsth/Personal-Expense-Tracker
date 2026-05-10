import { useEffect, useState } from "react";

import AddExpense from "./forms/ExpenseForm";

import "../HomePage.css";
import "../Expenses.css";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import SchoolIcon from "@mui/icons-material/School";
import HouseIcon from "@mui/icons-material/House";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import.meta.env.VITE_API_URL

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const [showForm, setShowForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("All");

  const [categories, setCategories] = useState([]);

  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const expenseCategoryIcons = {
    Food: <FastfoodIcon />,
    Health: <HealthAndSafetyIcon />,
    Clothing: <CheckroomIcon />,
    Transportation: <DirectionsCarFilledIcon />,
    Education: <SchoolIcon />,
    Housing: <HouseIcon />,
    Entertainment: <SportsEsportsIcon />,
    Others: <MiscellaneousServicesIcon />,
  };

  const FetchExpenses = async (page = 1) => {
      const token = localStorage.getItem("access");

      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/expenses/?page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Expenses:", data);

        if (!response.ok) {
          console.log(
            "Error fetching expenses",
            data
          );
          setLoading(false);
          return;
        }

        setExpenses(data.results);

        setNextPage(data.next);

        setPreviousPage(data.previous);

        setCurrentPage(page);

        setLoading(false);

      } catch (error) {
        console.log("Expense fetch error:", error);
        setLoading(false);
      }
    };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories/`
        );

        const data = await response.json();

        console.log("Categories:", data);

        if (!response.ok) {
          console.log(
            "Failed to fetch categories"
          );
          return;
        }

        setCategories(data);
      } catch (error) {
        console.log(
          "Category fetch error:",
          error
        );
      }
    };

    FetchExpenses();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expenses/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Failed to delete");
        return;
      }

      setExpenses((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log("Delete Error", error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowEditForm(true);
  };

  const handleUpdateExpense = (
    updatedExpense
  ) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setEditingExpense(null);
    setShowEditForm(false);
  };

  const addExpense = (newExpense) => {
    setExpenses((prev) => [
      newExpense,
      ...prev,
    ]);

    setShowForm(false);
  };

  const getIcon = (category) => {
    return (
      expenseCategoryIcons[category] || (
        <MiscellaneousServicesIcon />
      )
    );
  };

  const filteredExpenses =
    selectedFilter === "All"
      ? expenses
      : expenses.filter(
          (item) =>
            item.category === selectedFilter
        );

  console.log(categories);

  return (
    <div className="transactionsContainer">

      <div className="transactionsHeader">

        <div>
          <h2>Expense Transactions</h2>
          <p>
            Track all your expense records
          </p>
        </div>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={selectedFilter}
              onChange={(e) =>
                setSelectedFilter(e.target.value)
              }
              displayEmpty
              renderValue={(selected) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    lineHeight: "1",
                  }}
                >
                  <FilterListIcon
                    style={{
                      fontSize: 20,
                      marginTop: 0,
                    }}
                  />

                  {selected === "All"
                    ? "All Categories"
                    : selected}
                </div>
              )}
              sx={{
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "8.5px",
                  paddingBottom: "8.5px",
                },
              }}
            >
              <MenuItem value="All">
                All Categories
              </MenuItem>

              {categories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <AddIcon />
            Add Expenses
          </Button>

        </Stack>
      </div>

      {showForm && (
        <div className="modalOverlay">
          <div className="modalBox">

            <button
              className="closeButton"
              onClick={() =>
                setShowForm(false)
              }
            >
              x
            </button>

            <AddExpense
              onAddExpense={addExpense}
            />

          </div>
        </div>
      )}

      {showEditForm && (
        <div
          className="editModalOverlay"
          onClick={() =>
            setShowEditForm(false)
          }
        >
          <div
            className="editModalBox"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="CloseBtn"
              onClick={() =>
                setShowEditForm(false)
              }
            >
              x
            </button>

            <AddExpense
              editingExpense={
                editingExpense
              }
              onUpdateExpense={
                handleUpdateExpense
              }
            />

          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        filteredExpenses.map((item) => (
          <div
            key={item.id}
            className="transactionCard expenseTransactionCard"
          >

            <div className="transactionLeft">

              <div className="transactionIcon expenseIcon">
                {getIcon(item.category)}
              </div>

              <div className="transactionInfo">

                <h3>{item.category}</h3>

                <p>{item.date}</p>

                {item.description && (
                  <span className="transactionDescription">
                    {item.description}
                  </span>
                )}

              </div>
            </div>

            <div className="transactionRightHorizontal">

              <div className="amount expenseAmount">
                - Rs.{item.amount}
              </div>

              <div className="actionButtonsColumn">

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() =>
                    handleEdit(item)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    const confirmed =
                      window.confirm(
                        "Are you sure you want to delete?"
                      );

                    if (confirmed) {
                      handleDelete(item.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="paginationContainer">
        <Button
          variant="contained"
          disabled={!previousPage}
          onClick={() =>
            FetchExpenses(currentPage - 1)
          }
        >
          Previous
        </Button>

        <span
          style={{
            margin: "0 16px",
            fontWeight: "bold",
          }}
        >
          Page {currentPage}
        </span>

        <Button
          variant="contained"
          disabled={!nextPage}
          onClick={() =>
            FetchExpenses(currentPage + 1)
          }
        >
          Next
        </Button>

      </div>
    </div>
  );
};

export default Expense;
