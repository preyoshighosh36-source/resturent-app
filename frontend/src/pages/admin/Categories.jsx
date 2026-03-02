import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { Trash2, Edit, Upload, X } from "lucide-react";

const Categories = () => {
  const { axios, loading, setLoading } = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) setCategories(data.categories);
    } catch (error) {
      toast.error("Failed to load categories");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/category/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchCategories();
      } else toast.error(data.message);
    } catch (error) {
      toast.error("Failed to delete category");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (category) => {
    setEditCategory(category);
    setName(category.name);
    setPreview(category.image);
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editCategory) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      
      if (file) formData.append("image", file);

      const { data } = await axios.put(
        `/api/category/update/${editCategory._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
        setEditCategory(null);
        setName("");
        setFile(null);
        setPreview(null);
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update category");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">
        Categories
      </h1>

      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="relative border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 bg-white"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold">{cat.name}</h2>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEdit(cat)}
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      {editCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-xl shadow-lg w-96 p-6 relative flex flex-col gap-4"
          >
            <button
              onClick={() => setEditCategory(null)}
              type="button"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-2 text-center text-orange-500">
              Edit Category
            </h2>

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
              required
            />

            <input
              type="file"
              id="editFile"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <label
              htmlFor="editFile"
              className="flex items-center gap-2 cursor-pointer text-gray-600 mb-4"
            >
              <Upload className="w-5 h-5" /> {file ? file.name : "Change Image"}
            </label>

            <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              {loading ? "Updating..." : "Update Category"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;