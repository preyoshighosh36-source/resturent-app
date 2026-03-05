import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);


  const [bookings, setBookings] = useState([]);

  
  const [cartItems, setCartItems] = useState([]);

  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  
  const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // points to your deployed backend
  withCredentials: true,
});

  
  const addToCart = (menu, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === menu._id);

      if (existing) {
        return prev.map((item) =>
          item._id === menu._id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [...prev, { ...menu, quantity: qty }];
    });
  };

  
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  
  const updateCartQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  
  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  
  const checkAuth = async () => {
    try {
      const { data } = await axiosInstance.get("/api/auth/is-auth");
      if (data.success) {
        if (data.user.role === "admin") setAdmin(true);
        else setUser(data.user);
      }
    } catch (error) {
      console.log("Auth check error:", error);
    }
  };

  
  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/api/category/all");
      if (data.success) setCategories(data.categories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  
  const fetchMenus = async () => {
    try {
      const { data } = await axiosInstance.get("/api/menu/all");
      if (data.success) setMenus(data.menuItems);
      else setMenus([]);
    } catch (error) {
      console.log("Error fetching menus:", error);
      setMenus([]);
    }
  };

  
  const logout = async () => {
    try {
      const { data } = await axiosInstance.post("/api/auth/logout");
      if (data.success) {
        setAdmin(null);
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    checkAuth();
    fetchCategories();
    fetchMenus();
  }, []);

  const value = {
    axios: axiosInstance,
    navigate,
    user,
    setUser,
    admin,
    setAdmin,
    loading,
    setLoading,
    logout,
    categories,
    setCategories,
    menus,
    setMenus,
    fetchCategories,
    fetchMenus,

    
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQty,
    cartTotal,
    cartCount,

    
    orders,
    addOrder,

    
    bookings,
    addBooking,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;