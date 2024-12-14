// src/components/books/ReviewComponent.js
import React from 'react';

const ReviewComponent = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="p-4 border rounded shadow-sm">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">{review.username}</h4>
            <span className="text-yellow-500">{`${review.rating} ★`}</span>
          </div>
          <p className="mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewComponent;
