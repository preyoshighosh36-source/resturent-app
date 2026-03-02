import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { orders } = useContext(AppContext);
  const navigate = useNavigate();

  
  if (!orders || orders.length === 0) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center gap-6">

        <h1 className="text-4xl font-bold text-gray-700">
          No Orders Yet 🍔
        </h1>

        <p className="text-gray-500">
          Looks like you haven’t ordered anything.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition"
        >
          Go Back Home
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <div className="max-w-6xl mx-auto">

        
        <div className="flex justify-between items-center mb-12">

          <div>
            <h1 className="text-4xl font-bold">
              My Orders
            </h1>
            <p className="text-gray-500">
              Track all your delicious orders
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:scale-105 transition"
          >
            Home
          </button>

        </div>

        
        <div className="grid md:grid-cols-2 gap-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            >

              
              <div className="flex justify-between mb-4">

                <div>
                  <p className="font-semibold text-gray-700">
                    Order Date
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.date}
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Confirmed
                </span>

              </div>

              
              <div className="mb-5">
                <p className="text-gray-600 text-sm">
                  Delivery Address
                </p>
                <p className="font-medium">
                  {order.address}, {order.city}
                </p>
              </div>

              
              <div className="space-y-2">

                {order.items?.map((item) => (

                  <div
                    key={item._id}
                    className="flex justify-between text-gray-700"
                  >
                    <p>
                      {item.name} × {item.quantity}
                    </p>

                    <p className="font-medium">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                ))}

              </div>

              <hr className="my-4" />

            
              <div className="flex justify-between items-center">

                <p className="text-lg font-semibold">
                  Total
                </p>

                <p className="text-xl font-bold">
                  ₹{order.total}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MyOrders;