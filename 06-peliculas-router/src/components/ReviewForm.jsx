import { useState, useEffect } from 'react';
import { useReviews } from '../contexts/ReviewsContext';
import { searchMovies } from '../services/tmdb';

const ReviewForm = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [movieSearch, setMovieSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { addReview } = useReviews();

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (movieSearch.length >= 2) {
        try {
          const data = await searchMovies(movieSearch);
          setSearchResults(data.results);
        } catch (error) {
          console.error("Error searching movies:", error);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [movieSearch]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setMovieSearch(movie.title);
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && selectedMovie) {
      addReview({
        movieId: selectedMovie.id,
        movieTitle: selectedMovie.title,
        moviePoster: selectedMovie.poster_path,
        rating,
        comment,
      });
      setRating(5);
      setComment('');
      setMovieSearch('');
      setSelectedMovie(null);
    }
  };

  return (
    <article className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-sky-950 mb-4">Escribir una reseña</h2>
        
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Película
            </label>
            <input
              type="text"
              value={movieSearch}
              onChange={(e) => setMovieSearch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
              placeholder="Buscar película..."
              required/>
            {searchResults.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    onClick={() => handleMovieSelect(movie)}
                    className="p-2 hover:bg-gray-100 cursor-pointer">
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Puntuación
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} ⭐
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Comentario
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
              rows="4"
              placeholder="Escribe tu opinión sobre la película..."></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors">
            Publicar Reseña
          </button>
        </div>
      </form>
    </article>
  );
};

export default ReviewForm;