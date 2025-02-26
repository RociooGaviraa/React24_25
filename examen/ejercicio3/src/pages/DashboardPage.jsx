import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    search != ""
      ? setFilteredProducts(
          products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase().trim())
          )
        )
      : setFilteredProducts(products);
  }, [products, search]);

  const handleLogout = () => {
    // Implementar lógica de cerrar sesión

    logOut();
    navigate("/");
  };
  if (error) {
    return <div>Error haciendo el fetching: {error.message}</div>;
  }
  return (
    <>
      <div>DashboardPage PROTEGIDO</div>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <div>
        <form className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              placeholder="Buscar"
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-rose-400"
            />
          </div>
        </form>
      </div>
      <div>
        <h1 className="font-bold text-xl">Product List</h1>
        <p>Here you can find all our products.</p>
        {loading ? (
          <p>Cargando los datos</p>
        ) : (
          <ul>
            {filteredProducts.map((product) => (
              <li key={product._id}>{product.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DashboardPage;