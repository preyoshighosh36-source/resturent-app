import React, { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

const Checkout = () => {

  const { cartItems, cartTotal, addOrder } = useContext(AppContext)
  const navigate = useNavigate()

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [payment, setPayment] = useState("cod")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const placeOrder = () => {

    if (!address || !city || !phone) {
      alert("Please fill all fields")
      return
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: cartTotal,
      address,
      city,
      phone,
      payment,
      date: new Date().toLocaleString()
    }

    addOrder(newOrder)

    setOrderPlaced(true)

    setTimeout(() => {
      navigate("/my-orders")
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">

        <h1 className="text-4xl font-bold mb-4">
          Order Confirmed 🎉
        </h1>

        <p>
          Your delicious food is on the way!
        </p>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>

          <input
            type="text"
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 mb-4 rounded"
          />

          <h2 className="text-xl font-bold mt-6 mb-3">
            Payment Method
          </h2>

          <div className="space-y-2">

            <label className="flex gap-2">
              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Cash on Delivery
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                checked={payment === "upi"}
                onChange={() => setPayment("upi")}
              />
              UPI
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
              />
              Credit / Debit Card
            </label>

          </div>

        </div>


        

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (

              <div key={item._id} className="flex justify-between">

                <p>
                  {item.name} x {item.quantity}
                </p>

                <p>
                  ₹{item.price * item.quantity}
                </p>

              </div>

            ))}

          </div>

          <hr className="my-6" />

          <h2 className="text-2xl font-bold">
            Total: ₹{cartTotal}
          </h2>

          <button
            onClick={placeOrder}
            className="w-full bg-black text-white py-3 rounded-lg mt-6"
          >
            Confirm Order
          </button>

        </div>

      </div>

    </div>
  )
}

export default Checkout