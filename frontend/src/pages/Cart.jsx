import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Cart = () => {

  const navigate = useNavigate()

  const {
    cartItems,
    removeFromCart,
    updateCartQty,
    cartTotal
  } = useContext(AppContext)

  if (cartItems.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Your Cart is Empty
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Your Cart
        </h1>

        <div className="space-y-6">

          {cartItems.map((item) => (

            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-5 rounded-xl shadow"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p>₹{item.price}</p>
                </div>
              </div>

              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateCartQty(item._id, Number(e.target.value))
                }
                className="w-16 border rounded p-1"
              />

              <p className="font-bold">
                ₹{item.price * item.quantity}
              </p>

              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => removeFromCart(item._id)}
              />

            </div>
          ))}

        </div>

        <div className="text-right mt-10 space-y-4">

          <h2 className="text-3xl font-bold">
            Total: ₹{cartTotal}
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:opacity-80"
          >
            Checkout
          </button>

        </div>

      </div>

    </div>
  )
}

export default Cart