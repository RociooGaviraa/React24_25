
import { useState } from "react";
import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import GridLoader from "../components/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";

const Search = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  
  const { data, loading, error } = useFetch(
    () => query ? searchMovies(query, page) : null,
    [query, page]
  );

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(newPage);
  };

  return (
    <div className="space-y-8 mx-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-sky-950">🔍 Buscar Películas</h1>
      </header>

      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-900"
        />
      </div>

      <section className="mt-8">
        {loading ? (
          <div className="flex justify-center">
            <GridLoader color="#327fa9" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {data?.total_pages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-sky-700 disabled:bg-gray-400"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Anterior
                </button>
                <span className="flex items-center">
                  Página {page} de {data.total_pages}
                </span>
                <button
                  className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-sky-700 disabled:bg-gray-400"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === data.total_pages}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Search;
