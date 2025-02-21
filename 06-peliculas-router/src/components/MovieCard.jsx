import { Link } from "react-router-dom"
import { getImageURL } from "../services/tmdb"
import { useFavorites } from "../contexts/FavoritesContext";

const MovieCard = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isMovieFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="relative group">
      <div className="relative">
        <img
          src={getImageURL(movie.poster_path)}
          alt={movie.title}
          className="w-full h-auto rounded-lg shadow-md transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-sky-900 bg-opacity-40 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white font-medium text-sm">{movie.vote_average.toFixed(1)}</span>
          <span className="text-yellow-400">⭐</span>
        </div>
        <button
          onClick={handleFavoriteClick}
          className="absolute bottom-2 right-2 text-2xl cursor-pointer hover:scale-110 transition-transform bg-sky-900 bg-opacity-40 backdrop-blur-sm rounded-full p-1"
        >
          {isMovieFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-sky-950">
        {movie.title}
      </h3>
    </Link>
  );
};

export default MovieCard;