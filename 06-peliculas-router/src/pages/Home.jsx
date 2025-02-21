import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getPopularMovies } from "../services/tmdb";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import GridLoader from "../components/LoadingSpinner";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(() => getPopularMovies(page), [page]);

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(newPage);
  };

  if(error) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl font-bold text-red-500">
          Error al cargar las películas {error}
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8 mx-6">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold text-sky-950">
          🎬 Bienvenido al Videoclub de Rocío 🎬
        </h1>
        <p className="mt-4 text-gray-500">
          Aquí podrás encontrar las películas más populares del momento
        </p>
      </header>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-sky-900">
            Películas Populares
          </h2>
        </div>

        {loading ? ( 
          <GridLoader color="#327fa9" />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2 mb-10">
              <button 
                className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span className="text-gray-800 flex items-center">
                Página {data?.page} de {data?.total_pages}
              </span>
              <button 
                className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === data?.total_pages}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;