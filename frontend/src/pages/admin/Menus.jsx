import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Menus = () => {

  const { axios } = useContext(AppContext);

  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");

      if (data.success) {
        setMenus(data.menuItems);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  
  const deleteMenu = async (id) => {

    if (!window.confirm("Delete this menu item?")) return;

    try {

      const { data } = await axios.delete(`/api/menu/delete/${id}`);

      if (data.success) {
        toast.success(data.message);
        fetchMenus(); 
      }

    } catch (error) {
      toast.error("Delete failed");
      console.log(error);
    }
  };

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-8">Menus</h1>

      <div className="grid md:grid-cols-4 gap-6">

        {menus.map((item) => (

          <div
            key={item._id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >

            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">

              <h2 className="text-lg font-semibold">
                {item.name}
              </h2>

              <p className="text-gray-400 text-sm">
                {item.description}
              </p>

              <p className="text-orange-500 font-bold mt-2">
                ₹{item.price}
              </p>

              <p className="text-xs text-gray-500">
                {item.category?.name}
              </p>

            
              <button
                onClick={() => deleteMenu(item._id)}
                className="mt-3 w-full bg-red-500 hover:bg-red-600 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Menus;