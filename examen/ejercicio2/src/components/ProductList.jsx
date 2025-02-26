import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
const API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {
  
  const { products, loading, error } = useProducts();

  if (error) {
    return <div>Error haciendo el fetching: {error.message}</div>
  }
  return (
    <div>
      <h1>Product List</h1>
      <p>Here you can find all our products.</p>
      {loading ? (
        <p>Cargando los datos</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;