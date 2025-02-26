import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";

export const useFilter = () => {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [formData, setFormData] = useState({
    search: "",
    // Stock tiene que ser mayor o distinto de 0
    stock: "",
    // El precio tiene que ser menor que el filtro si el filtro es distinto de 0
    price: "",
  });

  useEffect(() => {
    formData.search != ""
      ? setFilteredProducts(
          products.filter((product) =>
            product.name.toLowerCase.includes(
              formData.search.toLowerCase().trim()
            )
          )
        )
      : setFilteredProducts(products);
    formData.stock > 0
      ? setFilteredProducts((prevStock) =>
          prevStock.filter((product) => product.stock >= formData)
        )
      : null;
    formData.price > 0
      ? setFilteredProducts((prevPrice) =>
          prevPrice.filter((product) => product.price <= formData.price)
        )
      : null;
  }, [products, formData]);

  return { formData, setFormData, filteredProducts, error, loading };
};
