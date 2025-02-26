import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_URL_API;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products", error);
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>Error haciendo el fetching: {error.message}</div>
  }

  return (
    <>
      {/* Mostrar los productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <p className="">ID: {product._id}</p>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <p className="text-lg font-bold text-indigo-600">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
