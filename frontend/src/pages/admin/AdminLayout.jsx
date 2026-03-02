import React, { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { BookAIcon, LayoutDashboard, ShoppingCart, Grid3x3, Plus, Package, Menu, X, Home } from "lucide-react"
import { useLocation, Outlet, Link } from "react-router-dom"
import { toast } from "react-hot-toast"

const AdminLayout = () => {
  const { setAdmin, axios } = useContext(AppContext)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { path: "/", name: "Back to Home", icon: Home },   
    { path: "/admin", name: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/admin/add-category", name: "Add Category", icon: Plus },
    { path: "/admin/add-menu", name: "Add Menu", icon: Package },
    { path: "/admin/menus", name: "Menus", icon: Menu },
    { path: "/admin/categories", name: "All Categories", icon: Grid3x3 },
    { path: "/admin/orders", name: "Orders", icon: ShoppingCart },
    { path: "/admin/bookings", name: "Bookings", icon: BookAIcon }
  ]

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path
    return location.pathname === path
  }

  const pageTitle = () => {
    const current = menuItems.find(item => item.path === location.pathname)
    return current ? current.name : "Admin Panel"
  }

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout")
      if (data.success) {
        toast.success(data.message)
        setAdmin(false)
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <div
        className={`fixed lg:static z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 flex flex-col justify-between transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >

        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Admin</h1>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          {menuItems.map((item, i) => (
            <Link key={i} to={item.path} onClick={() => setSidebarOpen(false)}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition ${
                  isActive(item.path, item.exact) ? "bg-orange-600" : ""
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </div>
            </Link>
          ))}

          <button
            onClick={logout}
            className="mt-6 bg-red-500 px-4 py-2 rounded w-full hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex items-center text-sm border-t border-gray-700 pt-4">
          <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
          <div>
            <div className="font-medium">Admin User</div>
            <div className="text-gray-400 text-xs">admin@example.com</div>
          </div>
        </div>

      </div>

      <div className="flex-1 flex flex-col">

        <div className="lg:hidden bg-white p-4 shadow flex items-center">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="ml-4 font-semibold">{pageTitle()}</h1>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">{pageTitle()}</h1>
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default AdminLayout