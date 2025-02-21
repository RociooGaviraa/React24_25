
import { useReviews } from '../contexts/ReviewsContext';
import { Link } from 'react-router-dom';
import { getImageURL } from '../services/tmdb';
import ReviewForm from '../components/ReviewForm';

const Reviews = () => {
  const { reviews } = useReviews();

  const getAllReviews = () => {
    const allReviews = [];
    Object.entries(reviews).forEach(([movieId, movieReviews]) => {
      movieReviews.forEach(review => {
        allReviews.push({
          ...review,
          movieId
        });
      });
    });
    return allReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const reviewsList = getAllReviews();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-sky-950">📝 Mis Reseñas</h1>
      </header>

      <ReviewForm />

      {reviewsList.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">
            Aún no has escrito ninguna reseña
          </p>
          <Link 
            to="/" 
            className="text-sky-600 hover:text-sky-800 underline"
          >
            Explorar películas
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviewsList.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-lg shadow-md p-6 flex gap-4"
            >
              {review.moviePoster && (
                <Link to={`/movie/${review.movieId}`}>
                  <img
                    src={getImageURL(review.moviePoster)}
                    alt={review.movieTitle}
                    className="w-24 h-36 object-cover rounded"
                  />
                </Link>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link 
                      to={`/movie/${review.movieId}`}
                      className="text-xl font-bold text-sky-900 hover:text-sky-700"
                    >
                      {review.movieTitle}
                    </Link>
                    <div className="flex items-center mt-2">
                      <span className="text-lg font-semibold mr-2">
                        {review.rating}
                      </span>
                      <span className="text-yellow-400">⭐</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-gray-700">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;