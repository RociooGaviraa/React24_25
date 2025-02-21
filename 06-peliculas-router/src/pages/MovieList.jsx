import { useState, useEffect } from "react";
import { getAllMovies, getMoviesByYear, getMoviesByRating, getMoviesByLanguage, getLanguages } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import { useFetch } from "../hooks/useFetch";
import GridLoader from "../components/LoadingSpinner";

const MovieList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const years = Array.from({ length: 35 }, (_, i) => 2024 - i);
  const ratings = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getLanguages();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    fetchLanguages();
  }, []);

  const { data, loading } = useFetch(
    () => {
      if (selectedYear) return getMoviesByYear(selectedYear, page);
      if (selectedRating) return getMoviesByRating(selectedRating, page);
      if (selectedLanguage) return getMoviesByLanguage(selectedLanguage, page);
      return getAllMovies(page, sortBy);
    },
    [selectedYear, selectedRating, selectedLanguage, page, sortBy]
  );

  return (
    <div className="space-y-8 mx-6">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold text-sky-950">
          🎬 Catálogo Completo 🎬
        </h1>
        <p className="mt-4 text-gray-500">
          Todas las películas ordenadas por filtros
        </p>
      </header>

      <section>
        <div className="flex justify-center gap-4 mb-4">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedRating('');
              setSelectedLanguage('');
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Todos los años</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <select
            value={selectedRating}
            onChange={(e) => {
              setSelectedRating(e.target.value);
              setSelectedYear('');
              setSelectedLanguage('');
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Todas las puntuaciones</option>
            {ratings.map(rating => (
              <option key={rating} value={rating}>
                {rating}+ ⭐
              </option>
            ))}
          </select>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setSelectedYear('');
              setSelectedRating('');
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Todos los idiomas</option>
            {languages
              .sort((a, b) => a.english_name.localeCompare(b.english_name))
              .map(lang => (
                <option key={lang.iso_639_1} value={lang.iso_639_1}>
                  {lang.english_name}
                </option>
              ))}
          </select>
        </div>

        {loading ? ( 
          <GridLoader color="#327fa9" />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2 mb-10">
              <button
                className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span className="text-gray-800 flex items-center">
                Página {page} de {data?.total_pages}
              </span>
              <button
                className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                onClick={() => setPage(page + 1)}
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

export default MovieList;