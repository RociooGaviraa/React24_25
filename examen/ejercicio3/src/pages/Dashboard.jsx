import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const { logoutUser } = useAuth();
  const handleLogout = () => {
    // Implementar lógica de cerrar sesión
    logoutUser();
    navigate("/");
  };

  if (error) {
    return <div>Error haciendo el fetching: {error.message}</div>
  }

  return (
    <>
      <div>Dashboard</div>
      <button className="" onClick={handleLogout}>
        Cerrar Sesion
      </button>

      {/* Quiero crear en el dashboard un formulario para filtrar los productos por nombre en tiempo real.  */}
      <div>
        <input 
        type="text"
        placeholder="Buscar películas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=""
        />
        <button>
          Buscar
        </button>
      </div><br />

      {/* mostar la lista de productos */}
      <div>
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


    </>
  );
};

export default Dashboard;
