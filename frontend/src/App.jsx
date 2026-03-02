import React, { useContext } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

import MenuDetails from "./pages/MenuDetails"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import BookTable from "./pages/BookTable"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Contact from "./pages/Contact"
import Menu from "./pages/Menu"
import MyBookings from "./pages/MyBookings"
import MyOrders from "./pages/MyOrders"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { AppContext } from "./context/AppContext"

import AdminLogin from "./pages/admin/AdminLogin"
import AdminLayout from "./pages/admin/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import AddCategory from "./pages/admin/AddCategory"
import AddMenu from "./pages/admin/AddMenu"
import Categories from "./pages/admin/Categories"
import Menus from "./pages/admin/Menus"
import Orders from "./pages/admin/Orders"
import Bookings from "./pages/admin/Bookings"

const App = () => {
  const adminPath = useLocation().pathname.includes("admin")
  const { admin } = useContext(AppContext)

  return (
    <div>
      <Toaster />

      {!adminPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />

        {/* FIXED ROUTE */}
        <Route path="/menu-details/:id" element={<MenuDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={admin ? <AdminLayout /> : <AdminLogin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="categories" element={<Categories />} />
          <Route path="menus" element={<Menus />} />
          <Route path="orders" element={<Orders />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>

      {!adminPath && <Footer />}
    </div>
  )
}

export default App