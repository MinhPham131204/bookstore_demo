// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const ReviewComponent = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {Array.isArray(reviews) && reviews.map((review, index) => (
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

ReviewComponent.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ReviewComponent;