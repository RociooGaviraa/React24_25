import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const navigate = useNavigate();

  if (error) {
    return <div>Error haciendo el fetching: {error.message}</div>;
  }

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        <button
          onClick={() => navigate("/products/new")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Añadir Nuevo Producto
        </button>
      </div>
      {loading ? (
        <p>Cargando los datos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800">Precio: ${product.price}</p>
              <p className="text-gray-800">Stock: {product.stock}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
