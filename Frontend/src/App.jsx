import { useState } from 'react'
import './App.css'
import Dashboard from './components/HomePage'
import Login from './components/LoginPage'
import Register from './components/Register'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Expense from './components/Expenses'
import Income from './components/Income'
import Analytics from './components/AnalyticsPage'

function App() {
  const [count, setCount] = useState(0)

  const location = useLocation()
  const noNavbar = location.pathname === "/register" || location.pathname === "/"

  return (
    <>
      {
        noNavbar?
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Navbar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/income' element={<Income/>}/>
            <Route path='/analytics' element={<Analytics/>}/>
            <Route path='/expenses' element={<Expense/> } />
          </Route>
        </Routes>
      }
    </>
  )
}

export default App