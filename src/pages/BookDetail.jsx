import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import RatingStars from '../components/RatingStars';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { AuthContext } from '../context/AuthContext';

const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user } = useContext(AuthContext); 
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const endpoint = user?.role === 'ADMIN' ? `/admin/books/${id}` : `/user/books/${id}`;
        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setBook(res.data);
      } catch (error) {
        console.error('Failed to fetch book details', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/user/books/${id}/reviews`);
        setReviews(res.data);
      } catch (error) {
        console.error('Failed to load reviews', error);
      }
    };

    if (user) {
      fetchBookDetails();
      fetchReviews();
    }
  }, [id, user]);

  if (!book) return <div>Loading...</div>;

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating();
  
  const defaultImage = "https://www.ts-adyar.org/sites/default/files/default_images/Default-Book-Cover-image.jpg"; 
  return (
    <div className="container mx-auto mt-10">
      <div className="relative flex flex-col sm:flex-row items-center bg-white  rounded-lg">
      {/* Back Button positioned at the top-right corner */}
      <button
        onClick={() => navigate(-1)} // This will go back to the previous page
        className="absolute top-4 right-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
      >
        Go Back
      </button>

      {/* Book Cover */}
      <img
        src={book.coverImageUrl || defaultImage}
        alt={book.title}
        className="w-48 h-72 object-cover mr-6"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />

      {/* Book Information */}
      <div>
        <h2 className="text-3xl font-bold">{book.title}</h2>
        <p className="text-lg mt-2 text-gray-700 font-medium">{book.author}</p>
        
        
        <RatingStars rating={averageRating} />
        

        <p className="mt-4 text-gray-600">{book.description}</p>
        
        <p className="mt-2 text-sm text-blue-600 italic">Genre: {book.genre}</p>
      </div>
    </div>

      

      {/* Show review form only if the logged-in user is not an ADMIN */}
      {user?.role !== 'ADMIN' && <ReviewForm bookId={id} />
      }
      <ReviewList bookId={id} user={user} />
    </div>
  );
};

export default BookDetail;




// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from '../api/axiosInstance';
// import RatingStars from '../components/RatingStars';
// import ReviewForm from '../components/ReviewForm';
// import ReviewList from '../components/ReviewList';
// import { useAuth } from '../context/AuthContext'; // ✅ Corrected

// const BookDetail = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const { user, token } = useAuth(); // ✅ Corrected to get token

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const endpoint = user?.role === 'ADMIN' ? `/admin/books/${id}` : `/user/books/${id}`;
//         const res = await axios.get(endpoint, {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ Corrected token usage
//           },
//         });
//         setBook(res.data);
//       } catch (error) {
//         console.error('Failed to fetch book details', error);
//       }
//     };

//     if (user && token) fetchBookDetails(); // ✅ Also check token
//   }, [id, user, token]);

//   if (!book) return <div>Loading...</div>;

//   const defaultImage = "https://www.ts-adyar.org/sites/default/files/default_images/Default-Book-Cover-image.jpg";

//   return (
//     <div className="container mx-auto mt-10">
//       <div className="flex flex-col sm:flex-row items-center">
//         <img
//           src={book.coverImageUrl || defaultImage}
//           alt={book.title}
//           className="w-48 h-72 object-cover mr-6"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = defaultImage;
//           }}
//         />
//         <div>
//           <h2 className="text-3xl font-bold">{book.title}</h2>
//           <p className="text-lg mt-2 text-gray-700 font-medium">{book.author}</p>
//           <RatingStars rating={book.averageRating || 0} />
//           <p className="mt-4 text-gray-600">{book.description}</p>
//           <p className="mt-2 text-sm text-blue-600 italic">Genre: {book.genre}</p>
//         </div>
//       </div>

//       {/* Show review form only if the logged-in user is not an ADMIN */}
//       {user?.role !== 'ADMIN' && <ReviewForm bookId={id} />}
      
//       <ReviewList bookId={id} />
//     </div>
//   );
// };

// export default BookDetail;
