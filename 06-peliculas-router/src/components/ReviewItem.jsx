import React from 'react';

const ReviewItem = ({ movieId, movieTitle, rating, comment, formattedDate, author }) => {
  const starRating = Math.max(0, Math.round(rating));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-bold text-lg">
            Autor: <span className="text-gray-600">{author}</span>
          </p>
          <h3 className="text-sky-700 text-lg font-semibold mt-1">
            {movieTitle}
          </h3>
          <div className="text-yellow-400">
            {"⭐".repeat(starRating)}
          </div>
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>
      <p className="text-gray-700 mt-2">{comment}</p>
    </div>
  );
};

export default ReviewItem;