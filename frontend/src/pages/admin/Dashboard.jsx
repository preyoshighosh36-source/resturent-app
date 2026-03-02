import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ShoppingCart, Users, Utensils, DollarSign } from "lucide-react";

const Dashboard = () => {
  const { axios } = useContext(AppContext);

  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    menus: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");

      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingCart,
      color: "bg-orange-500",
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Menus",
      value: stats.menus,
      icon: Utensils,
      color: "bg-green-500",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: DollarSign,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">

    
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
            </div>

            <div className={`${card.color} p-3 rounded-lg text-white`}>
              <card.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <a
            href="/admin/add-menu"
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Menu
          </a>

          <a
            href="/admin/add-category"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Category
          </a>

          <a
            href="/admin/orders"
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
          >
            View Orders
          </a>
        </div>
      </div>

      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  No recent orders
                </td>
              </tr>
            ) : (
              recentOrders.map((order, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{order._id.slice(-6)}</td>
                  <td className="p-3">{order.user?.name}</td>
                  <td className="p-3">₹{order.amount}</td>
                  <td className="p-3">
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;