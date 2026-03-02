import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AdminLogin = () => {

  const { navigate, loading, setLoading, axios, setAdmin } = useContext(AppContext);

  const [formdata, setFormData] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {

    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await axios.post("/api/auth/admin/login", formdata);

      if (data.success) {

        setAdmin(true);
        toast.success(data.message);
        navigate("/admin");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);
      toast.error("Server error");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900">

      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-800 shadow-2xl rounded-2xl px-8 py-10 border border-gray-700"
      >

        <h1 className="text-3xl font-semibold text-white text-center">
          Admin Login
        </h1>

        <p className="text-gray-400 text-sm text-center mt-2">
          Login to FlavorNest 🍽️
        </p>

        <div className="mt-6 flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3">
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={onChangeHandler}
            placeholder="Email"
            className="w-full h-12 bg-transparent px-3 text-white outline-none"
            required
          />
        </div>

        <div className="mt-4 flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3">
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={onChangeHandler}
            placeholder="Password"
            className="w-full h-12 bg-transparent px-3 text-white outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-lg text-white bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </form>

    </div>
  );
};

export default AdminLogin;