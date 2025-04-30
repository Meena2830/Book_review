import { useState } from 'react';
import axios from '../api/axiosInstance';
import RatingStars from './RatingStars';

const ReviewForm = ({ bookId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.trim() === '') {
      alert('Please write a review');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`/user/books/${bookId}/reviews`, {
        rating,
        reviewText: review,
      })
      alert('Review submitted successfully!');
      setReview('');
      setRating(0);
    } catch (error) {
      console.error('Failed to submit review', error);
      alert('Error submitting review. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold">Submit a Review</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Write your review here..."
          />
        </div>
        <div className="mb-4">
          <h4 className="text-lg">Rating:</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setRating(index + 1)}
                className={`text-2xl ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
