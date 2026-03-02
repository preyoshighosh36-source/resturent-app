import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const { navigate, axios, loading, setLoading } = useContext(AppContext);

  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (formdata.password !== formdata.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/register", formdata);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }

    console.log(formdata);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-800 shadow-2xl rounded-2xl px-8 py-10 border border-gray-700"
      >
        <h1 className="text-3xl font-semibold text-white text-center">
          Register
        </h1>
        <p className="text-gray-400 text-sm text-center mt-2">
          Join FlavorNest today 🍽️
        </p>

        
        <div className="mt-6 flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3">
          <span className="text-gray-400">👤</span>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={onChangeHandler}
            placeholder="Full Name"
            className="w-full h-12 bg-transparent px-3 text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        
        <div className="mt-4 flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3">
          <span className="text-gray-400">📧</span>
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={onChangeHandler}
            placeholder="Email Address"
            className="w-full h-12 bg-transparent px-3 text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        
        <div className="mt-4 flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3">
          <span className="text-gray-400">🔒</span>
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={onChangeHandler}
            placeholder="Password"
            className="w-full h-12 bg-transparent px-3 text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        
        <div className="mt-4 flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3">
          <span className="text-gray-400">🔒</span>
          <input
            type="password"
            name="confirmPassword"
            value={formdata.confirmPassword}
            onChange={onChangeHandler}
            placeholder="Confirm Password"
            className="w-full h-12 bg-transparent px-3 text-white placeholder-gray-400 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?
          <Link to="/Login" className="text-orange-400 cursor-pointer ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;