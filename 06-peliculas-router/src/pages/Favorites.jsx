
import { useFavorites } from '../contexts/FavoritesContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-8 mx-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-sky-950">❤️ Mis Películas Favoritas</h1>
      </header>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No tienes películas favoritas aún</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;