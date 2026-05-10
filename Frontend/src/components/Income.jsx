import { useEffect, useState } from "react";

import AddIncome from "./forms/IncomeForm";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import FilterListIcon from '@mui/icons-material/FilterList';

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";

import "../Expenses.css";

import.meta.env.VITE_API_URL

const Income = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingIncome, setEditingIncome] =
    useState(null);

  const [showIncomeForm, setShowIncomeForm] =
    useState(false);

  const [showEditForm, setShowEditForm] =
    useState(false);

  const [selectedFilter, setSelectedFilter] =
    useState("All");

  const [categories, setCategories] = useState(
    []
  );
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  

  const incomeCategoryIcons = {
    Salary: <WorkIcon />,
    Profit: <TrendingUpIcon />,
    "Capital Gains": <ShowChartIcon />,
    Royalty: <EmojiObjectsIcon />,
    Interest: <AccountBalanceIcon />,
    Dividend: <AttachMoneyIcon />,
    Rental: <HomeIcon />,
    Default: <PaidIcon />,
  };
  const FetchIncome = async (page = 1) => {
      const token = localStorage.getItem("access");

      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/income/?page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Income:", data);

        if (!response.ok) {
          console.log(
            "Error fetching Income",
            data
          );
          setLoading(false);
          return;
        }

        setIncome(data.results);

        setNextPage(data.next);

        setPreviousPage(data.previous);

        setCurrentPage(page);

        setLoading(false);

      } catch (error) {
        console.log("Income fetch error:", error);
        setLoading(false);
      }
    };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/income_categories/`
        );

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.log(
          "Category error",
          error
        );
      }
    };

    FetchIncome();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem(
      "access"
    );

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/income/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      setIncome((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (income) => {
    setEditingIncome(income);
    setShowEditForm(true);
  };

  const handleUpdateIncome = (updated) => {
    setIncome((prev) =>
      prev.map((item) =>
        item.id === updated.id
          ? updated
          : item
      )
    );

    setEditingIncome(null);
    setShowEditForm(false);
  };

  const addIncome = (newIncome) => {
    setIncome((prev) => [
      newIncome,
      ...prev,
    ]);

    setShowIncomeForm(false);
  };

  const getIcon = (category) => {
    return (
      incomeCategoryIcons[category] ||
      incomeCategoryIcons.Default
    );
  };

  const filteredIncome =
    selectedFilter === "All"
      ? income
      : income.filter(
          (item) =>
            item.category === selectedFilter
        );

  return (
    <div className="transactionsContainer">

      <div className="transactionsHeader">

        <div>
          <h2>Income Transactions</h2>
          <p>
            Track all your income records
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
                setSelectedFilter(
                  e.target.value
                )
              }
              displayEmpty
              renderValue={(selected) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FilterListIcon
                    style={{
                      fontSize: 20,
                      color: "gray",
                    }}
                  />

                  {selected === "All"
                    ? "All Categories"
                    : selected}
                </div>
              )}
            >
              <MenuItem value="All">
                All Categories
              </MenuItem>

              {categories.map((cat) => (
                <MenuItem
                  key={cat}
                  value={cat}
                >
                  {cat}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          <Button
            variant="contained"
            color="success"
            onClick={() =>
              setShowIncomeForm(true)
            }
          >
            <AddIcon />
            Add Income
          </Button>

        </Stack>
      </div>

      {showIncomeForm && (
        <div className="modalOverlay">
          <div className="modalBox">

            <button
              className="closeButton"
              onClick={() =>
                setShowIncomeForm(false)
              }
            >
              x
            </button>

            <AddIncome
              onAddIncome={addIncome}
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

            <AddIncome
              editingIncome={
                editingIncome
              }
              onUpdateIncome={
                handleUpdateIncome
              }
            />

          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : filteredIncome.length === 0 ? (
        <p>No incomes found</p>
      ) : (
        filteredIncome.map((item) => (
          <div
            key={item.id}
            className="transactionCard incomeTransactionCard"
          >

            <div className="transactionLeft">

              <div className="transactionIcon incomeIcon">
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

              <div className="amount incomeAmount">
                + Rs. {item.amount}
              </div>

              <div className="actionButtonsColumn">

                <Button
                  variant="contained"
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
                        "Delete?"
                      );

                    if (confirmed)
                      handleDelete(
                        item.id
                      );
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
              FetchIncome(currentPage - 1)
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
              FetchIncome(currentPage + 1)
            }
          >
            Next
          </Button>
  
        </div>
    </div>
  );
};

export default Income;