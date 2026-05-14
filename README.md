# Personal Expense Tracker

A full-stack Personal Expense Tracker web application built using React and Django REST Framework.  
The application allows users to manage expenses and income, visualize spending analytics, and securely authenticate using JWT authentication.

## Live Link
https://personal-expense-tracker-bice-kappa.vercel.app/

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Expense Management
- Add Expenses
- Edit Expenses
- Delete Expenses
- Filter Expenses by Category

### Income Management
- Add Income
- Edit Income
- Delete Income
- Filter Income by Category

### Dashboard & Analytics
- Expense Pie Chart
- Income Pie Chart
- Income vs Expense Area Chart
- Recent Transactions Section

### UI Features
- Responsive Layout
- Modern Login/Register UI
- Category Icons
- Modal Forms
- Interactive Charts

## Tech Stack

### Frontend
- React
- Material UI
- Recharts
- React Router DOM

### Backend
- Django
- Django REST Framework
- Simple JWT Authentication

### Deployment
- Frontend: Vercel
- Backend: Render

## Installation

### Clone Repository

```bash
git clone https://github.com/ayushsth/Personal-Expense-Tracker.git
cd Personal-Expense-Tracker
```

---

## Backend Setup

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```
