import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import RatingStars from './RatingStars'; // Make sure the path is correct

const ReviewList = ({ bookId, user }) => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedRating, setEditedRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/user/books/${bookId}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.error('Failed to load reviews', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`/user/books/${bookId}/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review', error);
    }
  };

  const handleUpdate = async (reviewId) => {
    try {
      await axios.put(`/user/books/${bookId}/reviews/${reviewId}`, {
        rating: editedRating,
        reviewText: editedText,
      });
      setEditingReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error('Error updating review', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded mb-3">
            {editingReviewId === review.id ? (
              <>
                <textarea
                  className="w-full border p-2 rounded mb-2"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <div className="mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditedRating(idx + 1)}
                      className={`text-xl ${idx < editedRating ? 'text-yellow-500' : 'text-gray-400'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleUpdate(review.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingReviewId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <RatingStars rating={review.rating} />
                <p className="mt-1 mb-2">{review.reviewText}</p>
                {user?.role === 'ADMIN' && user.id === review.userId && (
                  <>
                    <button
                      onClick={() => {
                        setEditingReviewId(review.id);
                        setEditedText(review.reviewText);
                        setEditedRating(review.rating);
                      }}
                      className="text-blue-600 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
