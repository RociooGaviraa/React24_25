import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const { addProduct, updateProduct, products } = useProducts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (id) {
      const product = products.find((p) => p._id === id);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
        });
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, formData);
      } else {
        await addProduct(formData);
      }
      navigate("/products");
    } catch (error) {
      console.log(`Error ${id ? "updating" : "adding"} product`, error);
    }
  };

  const isEditing = Boolean(id);

  return (
    <div className="max-w-md mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        {isEditing ? "EDITAR PRODUCTO" : "AÑADIR PRODUCTO"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xl font-semibold text-gray-900"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-xl font-semibold text-gray-900"
          >
            Descripcion
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-xl font-semibold text-gray-900"
          >
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label
            htmlFor="stock"
            className="block text-xl font-semibold text-gray-900"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {isEditing ? "Actualizar producto" : "Añadir producto"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
