import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFilter } from "../hooks/useFilter";

const DashboardPageV2 = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { formData, setFormData, filteredProducts, error, loading } =
    useFilter();

  const handleLogout = () => {
    // Implementar lógica de cerrar sesión

    logOut();
    navigate("/");
  };

  const handleChange = (e) => {
    const nombre = e.target.name;
    setFormData({ ...formData, [nombre]: e.target.value.trim() });
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
              value={formData.search}
              placeholder="Buscar"
              name="search"
              id="search"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-rose-400"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={formData.price}
              placeholder="Precio menor que"
              name="price"
              id="price"
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-rose-400"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.stock}
              placeholder="Stock mayor que"
              name="stock"
              id="stock"
              onChange={handleChange}
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

export default DashboardPageV2;
