import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegación */}
      <nav className="bg-sky-950 text-white shadow-lg mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
            {/* Logo del videoclub */}
            <Link to="/" className="text-xl font-bold ">
              Videoclub 
            </Link>
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