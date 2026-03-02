import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ShoppingCart, Star, Plus, Minus, Flame } from "lucide-react"
import { AppContext } from "../context/AppContext"

const MenuDetails = () => {
  const { id } = useParams()
  const { addToCart } = useContext(AppContext)

  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/menu/${id}`)
        setMenu(res.data.menuItem)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [id])

  const increase = () => setQty(qty + 1)
  const decrease = () => qty > 1 && setQty(qty - 1)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-semibold">
        🍽️ Loading delicious food...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-16 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        
        <div className="relative group">

          <img
            src={menu.image}
            className="rounded-3xl shadow-2xl w-full h-[420px] object-cover transform group-hover:scale-105 transition duration-500"
          />

          
          <div className="absolute top-5 left-5">
            {menu.isAvailable ? (
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm shadow">
                Available
              </span>
            ) : (
              <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm shadow">
                Out Of Stock
              </span>
            )}
          </div>

          
          <div className="absolute bottom-5 right-5 bg-white px-3 py-1 rounded-full shadow flex items-center gap-1">
            <Flame size={16} className="text-orange-500" />
            Popular
          </div>

        </div>

        
        <div>

          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {menu.name}
          </h1>

          
          <div className="flex items-center gap-1 mb-4 text-yellow-500">
            <Star fill="currentColor" size={18} />
            <Star fill="currentColor" size={18} />
            <Star fill="currentColor" size={18} />
            <Star fill="currentColor" size={18} />
            <Star size={18} />
            <span className="text-gray-600 ml-2">(4.2)</span>
          </div>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {menu.description}
          </p>

          <p className="text-4xl font-bold text-orange-600 mb-6">
            ₹{menu.price}
          </p>

          
          <div className="flex items-center gap-6 mb-8">

            <div className="flex items-center bg-white shadow rounded-full px-4 py-2 gap-4">

              <button
                onClick={decrease}
                className="hover:text-red-500"
              >
                <Minus size={20} />
              </button>

              <span className="text-lg font-semibold">
                {qty}
              </span>

              <button
                onClick={increase}
                className="hover:text-green-600"
              >
                <Plus size={20} />
              </button>

            </div>

            <span className="text-gray-500">
              Total: ₹{menu.price * qty}
            </span>

          </div>

          
          <button
            disabled={!menu.isAvailable}
            onClick={() => addToCart(menu, qty)}
            className={`px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-3 shadow-lg transition ${
              menu.isAvailable
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-400 cursor-not-allowed text-white"
            }`}
          >
            <ShoppingCart size={20} />
            {menu.isAvailable ? "Add To Cart" : "Currently Unavailable"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default MenuDetails