import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const AddMenu = () => {

  const { axios } = useContext(AppContext);

  const [categories, setCategories] = useState([]);

  const [menu, setMenu] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null
  });

  

  const handleChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value
    });
  };

  

  const handleImage = (e) => {
    setMenu({
      ...menu,
      image: e.target.files[0]
    });
  };

  

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!menu.name || !menu.description || !menu.price || !menu.category) {
      toast.error("Please fill all fields");
      return;
    }

    if (!menu.image) {
      toast.error("Please select an image");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("name", menu.name);
      formData.append("description", menu.description);
      formData.append("price", menu.price);
      formData.append("category", menu.category);
      formData.append("image", menu.image);

      const { data } = await axios.post(
        "/api/menu/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (data.success) {

        toast.success(data.message);

        setMenu({
          name: "",
          description: "",
          price: "",
          category: "",
          image: null
        });

      } else {
        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);
      toast.error(error?.response?.data?.message || "Error adding menu");

    }
  };

  

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-6">
        Add Menu
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl max-w-md"
      >

        <input
          name="name"
          placeholder="Food name"
          value={menu.name}
          onChange={handleChange}
          className="w-full h-12 mb-4 px-4 rounded bg-gray-900 border border-gray-700"
        />

        <input
          name="description"
          placeholder="Description"
          value={menu.description}
          onChange={handleChange}
          className="w-full h-12 mb-4 px-4 rounded bg-gray-900 border border-gray-700"
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          value={menu.price}
          onChange={handleChange}
          className="w-full h-12 mb-4 px-4 rounded bg-gray-900 border border-gray-700"
        />

        

        <select
          name="category"
          value={menu.category}
          onChange={handleChange}
          className="w-full h-12 mb-4 px-4 rounded bg-gray-900 border border-gray-700"
        >

          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}

        </select>

        

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full mb-4"
        />

        <button className="w-full h-12 bg-orange-600 rounded hover:bg-orange-700">
          Add Menu
        </button>

      </form>

    </div>
  );
};

export default AddMenu;