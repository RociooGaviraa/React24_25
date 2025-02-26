import { useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_URL_API;
//Crear contexto
const ProductContext = createContext();

//Crear provider
export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  return context;
}

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para hacer la petición fetch
  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      if (!response.ok) {
        throw new Error("Error en la API");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ products,loading,error,setLoading, setError }}>
      {children}
    </ProductContext.Provider>
  )

}

