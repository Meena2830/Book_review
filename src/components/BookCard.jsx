// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axiosInstance';

// const BookCard = ({ book, onDelete }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   console.log("BookCard - user:", user);
//   const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
//   console.log("BookCard - isAdmin:", isAdmin);

//   const handleEdit = async () => {
//     try {

//       const response = await axios.get(`/admin/books/${book.id}`);
//       navigate(`/admin/edit-book/${book.id}`);
//     } catch (error) {
//       console.error("Error fetching book data for edit:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm(`Delete "${book.title}"?`)) {
//       try {

//         const response = await axios.delete(`/admin/books/${book.id}`);
//         onDelete(book.id);
//         console.log('Book deleted:', response.data);
//       } catch (error) {
//         console.error('Failed to delete the book', error);
//       }
//     }
//   };

//   const defaultImage = "https://www.ts-adyar.org/sites/default/files/default_images/Default-Book-Cover-image.jpg";

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all max-w-sm ">
//       <img
//         src={book.coverImageUrl || defaultImage}
//         alt={book.title}
//         className="w-full h-64 object-cover rounded-t-lg"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = defaultImage;
//         }}
//       />
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold">{book.title}</h2>
//         <p className="text-gray-600">{book.author}</p>
//         <Link
//           to={`/book/${book.id}`}
//           className="text-blue-600 mt-2 inline-block hover:underline"
//         >
//           View Details
//         </Link>

//         {isAdmin && (
//           <div className="mt-2 flex gap-4">
//             <button
//               onClick={handleEdit}
//               className="text-yellow-600 hover:underline text-sm"
//             >
//               Edit
//             </button>
//             <button
//               onClick={handleDelete}
//               className="text-red-600 hover:underline text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookCard;

// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axiosInstance';

// const BookCard = ({ book, onDelete }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   console.log("BookCard - user:", user);
//   const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
//   console.log("BookCard - isAdmin:", isAdmin);

//   const handleEdit = async () => {
//     try {
//       const response = await axios.get(`/admin/books/${book.id}`);
//       navigate(`/admin/edit-book/${book.id}`);
//     } catch (error) {
//       console.error("Error fetching book data for edit:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm(`Delete "${book.title}"?`)) {
//       try {
//         const response = await axios.delete(`/admin/books/${book.id}`);
//         onDelete(book.id); // Call parent to remove the book from UI
//         console.log('Book deleted:', response.data);
//       } catch (error) {
//         console.error('Failed to delete the book', error);
//       }
//     }
//   };

//   const defaultImage = "https://www.ts-adyar.org/sites/default/files/default_images/Default-Book-Cover-image.jpg";

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all max-w-sm">
//       <Link to={`/book/${book.id}`}>
//         <img
//           src={book.coverImageUrl || defaultImage}
//           alt={book.title}
//           className="w-full h-64 object-cover rounded-t-lg"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = defaultImage;
//           }}
//         />
//       </Link>

//       <div className="mt-4">
//         <h2 className="text-xl font-semibold">{book.title}</h2>
//         <p className="text-gray-600">{book.author}</p>

//         <Link
//           to={`/book/${book.id}`}
//           className="text-blue-600 mt-2 inline-block hover:underline"
//         >
//           View Details
//         </Link>

//         {isAdmin && (
//           <div className="mt-2 flex gap-4">
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 handleEdit();
//               }}
//               className="text-yellow-600 hover:underline text-sm"
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 handleDelete();
//               }}
//               className="text-red-600 hover:underline text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookCard;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosInstance'; // Your axiosInstance with interceptors

const BookCard = ({ book, onDelete }) => {
  const { user } = useAuth(); // Get user info from AuthContext
  const navigate = useNavigate();

  // Check if the user is an admin
  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';

  // Default book cover image
  const defaultImage =
    'https://www.ts-adyar.org/sites/default/files/default_images/Default-Book-Cover-image.jpg';

  // Handle edit action
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/admin/edit-book/${book.id}`);
  };

  // Handle delete action
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmDelete) return;

    try {
      // Make the DELETE request using axiosInstance
      const response = await axios.delete(`/admin/books/${book.id}`);
      console.log('Book deleted:', response.data);

      // Update UI after deletion (callback to parent component)
      if (onDelete) {
        onDelete(book.id); // Tell parent to update UI
      }
    } catch (error) {
      console.error('Failed to delete the book:', error);
      alert('Failed to delete the book. Please try again.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all max-w-sm">
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/book/${book.id}`)}
      >
        <img
          src={book.coverImageUrl || defaultImage}
          alt={book.title}
          className="w-full h-64 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        

        <Link
          to={`/book/${book.id}`}
          className="text-blue-600 mt-2 inline-block hover:underline"
        >
          View Details
        </Link>

        {isAdmin && (
          <div className="mt-2 flex gap-4">
            <button
              type="button"
              onClick={handleEdit}
              className="text-yellow-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
