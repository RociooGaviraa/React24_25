import { createContext, useContext, useState, useEffect } from 'react';

const ReviewsContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('movieReviews');
    return savedReviews ? JSON.parse(savedReviews) : {};
  });

  useEffect(() => {
    localStorage.setItem('movieReviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review) => {
    const newReview = {
      id: Date.now(),
      ...review,
      date: new Date().toISOString(),
    };
    setReviews(prev => {
      const movieId = review.movieId;
      return {
        ...prev,
        [movieId]: [...(prev[movieId] || []), newReview]
      };
    });
  };

  const deleteReview = (movieId, reviewId) => {
    setReviews(prev => ({
      ...prev,
      [movieId]: prev[movieId].filter(review => review.id !== reviewId)
    }));
  };

  const getAllReviews = () => {
    return Object.values(reviews).flat();
  };

  return (
    <ReviewsContext.Provider value={{
      reviews,
      addReview,
      deleteReview,
      getAllReviews,
    }}>
      {children}
    </ReviewsContext.Provider>
  );
};