// import { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from '../api/axiosInstance';
// import BookCard from '../components/BookCard';
// import { AuthContext } from '../context/AuthContext';

// const AdminDashboard = () => {
//   const [books, setBooks] = useState([]);
//   const { user } = useContext(AuthContext);

//   const fetchBooks = async () => {
//     try {
//       // Use the correct endpoint based on user role
//       const endpoint = user?.role === 'ADMIN' ? '/admin/books' : '/books';
//       const res = await axios.get(endpoint);
//       setBooks(res.data);
//     } catch (error) {
//       console.error('Error fetching books', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     console.log('Deleting book with id:', id); // Debugging line
//     try {
//       const endpoint = user?.role === 'ADMIN' ? `/admin/books/${id}` : `user/books/${id}`;
//       console.log('Delete endpoint:', endpoint); // Debugging line
//       await axios.delete(endpoint);
//       fetchBooks(); // Refresh list
//     } catch (err) {
//       console.error('Delete failed', err);
//     }
//   };
  

//   useEffect(() => {
//     fetchBooks();
//   }, [user]); 

//   return (
//     <div className="container mx-auto mt-10">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold">Admin Dashboard</h1>
//         {user?.role === 'ADMIN' && (
//           <Link
//             to="/admin/add-book"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add New Book
//           </Link>
//         )}
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {books.map((book) => (
//           <BookCard key={book.id} book={book} onDelete={handleDelete} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosInstance';
import BookCard from '../components/BookCard';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchBooks = async () => {
    try {
      const endpoint = user?.role === 'ADMIN' ? '/admin/books' : '/books';
      const res = await axios.get(endpoint);
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  const handleDelete = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        {user?.role === 'ADMIN' && (
          <Link
            to="/admin/add-book"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Book
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
