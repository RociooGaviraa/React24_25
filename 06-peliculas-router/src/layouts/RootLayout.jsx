import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegación */}
      <nav className="bg-sky-950 text-white shadow-lg mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
            {/* Logo del videoclub */}
            <Link to="/" className="text-xl font-bold px-5">
              Videoclub 
            </Link>
            <div className="flex gap-4 my-6">
              {/*Buscar */}
              <Link to="/search" className="text-white font-bold py-2 rounded-lg shadow-md">
                🔍 Buscar
              </Link>
              {/*Catálogo */}
              <Link to="/movies" className="text-white font-bold py-2 rounded-lg shadow-md">
                🎬 Catálogo
              </Link>
              {/*Reseñas */}
              <Link to="/reviews" className=" text-white font-bold py-2 rounded-lg shadow-md">
                ✍️ Reseñas
              </Link>
              {/*Favoritos */}
              <Link to="/favorites" className=" text-white font-bold py-2  rounded-lg shadow-md">
                ❤️ Favoritos
              </Link>
            </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet/>
      </main>
      <footer className="bg-sky-900 text-white mx-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center">
            &copy; 2021 Videoclub. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
};

export default RootLayout;