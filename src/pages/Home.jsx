//Home.jsx
// import { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from '../api/axiosInstance';
// import BookCard from '../components/BookCard';
// import SearchBooks from './SearchBooks';
// import { AuthContext } from '../context/AuthContext';

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [genre, setGenre] = useState('');
//   const [rating, setRating] = useState('');
//   const { user } = useContext(AuthContext);

//   // Fetch books (initial + filtered)
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         let res;
//         if (rating && !search && !genre) {
//           res = await axios.get(`/user/books/filter/${rating}`);
//         } else {
//           const params = new URLSearchParams();

//           if (search) {
//             if (search.startsWith("author:")) {
//               const author = search.replace("author:", "").trim();
//               params.append('author', author);
//             } else if (search.startsWith("title:")) {
//               const title = search.replace("title:", "").trim();
//               params.append('title', title);
//             } else {
//               params.append('search', search);
//             }
//           }

//           if (genre) params.append('genre', genre);
//           if (rating) params.append('rating', rating);

//           res = await axios.get(`/user/books/search?${params.toString()}`);
//         }

//         setBooks(res.data);
//       } catch (err) {
//         console.error('Failed to fetch books:', err);
//       }
//     };

//     if (user?.role === 'USER') {
//       fetchBooks();
//     }
//   }, [user, search, genre, rating]);

//   // Client-side filtering (if needed)
//   useEffect(() => {
//     let filtered = books;

//     if (search) {
//       if (search.startsWith("author:")) {
//         const author = search.replace("author:", "").trim().toLowerCase();
//         filtered = filtered.filter(book => book.author.toLowerCase().includes(author));
//       } else if (search.startsWith("title:")) {
//         const title = search.replace("title:", "").trim().toLowerCase();
//         filtered = filtered.filter(book => book.title.toLowerCase().includes(title));
//       } else {
//         filtered = filtered.filter(book =>
//           book.title.toLowerCase().includes(search.toLowerCase()) ||
//           book.author.toLowerCase().includes(search.toLowerCase())
//         );
//       }
//     }

//     if (genre) {
//       filtered = filtered.filter(book => book.genre === genre);
//     }

//     if (rating && (search || genre)) {
//       filtered = filtered.filter(book => book.averageRating >= parseInt(rating));
//     }

//     setFilteredBooks(filtered);
//   }, [books, search, genre, rating]);

//   return (
//     <div className="container mx-auto mt-10">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold">Browse Books</h1>
//         {user?.role === 'ADMIN' && (
//           <Link
//             to="/admin/add-book"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add New Book
//           </Link>
//         )}
//       </div>

//       {/* Search bar for USER */}
//       {user?.role === 'USER' && (
//         <SearchBooks
//           search={search}
//           setSearch={setSearch}
//           genre={genre}
//           setGenre={setGenre}
//           rating={rating}
//           setRating={setRating}
//         />
//       )}

//       {/* Book display with "No books found" fallback */}
//       {(user?.role === 'USER' ? filteredBooks : books).length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {(user?.role === 'USER' ? filteredBooks : books).map((book) => (
//             <BookCard key={book.id} book={book} />
//           ))}
//         </div>
//       ) : (
//         <p>No books found</p>
//       )}
//     </div>
//   );
// };

// export default Home;



import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosInstance';
import BookCard from '../components/BookCard';
import SearchBooks from './SearchBooks';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const { user } = useContext(AuthContext);

  // Function to fetch and filter books
  const fetchAndFilterBooks = async () => {
    try {
      let res;
      if (rating && !search && !genre) {
        // If only rating is provided, use filter endpoint
        res = await axios.get(`/user/books/filter/${rating}`);
      } else {
        // Prepare search params
        const params = new URLSearchParams();

        if (search) {
          if (search.startsWith('author:')) {
            const author = search.replace('author:', '').trim();
            params.append('author', author);
          } else if (search.startsWith('title:')) {
            const title = search.replace('title:', '').trim();
            params.append('title', title);
          } else {
            params.append('search', search);
          }
        }

        if (genre) params.append('genre', genre);
        if (rating) params.append('rating', rating);

        // Fetch data
        res = await axios.get(`/user/books/search?${params.toString()}`);
      }

      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  // Function to filter books based on search, genre, and rating
  const filterBooks = () => {
    let filtered = books;

    if (search) {
      if (search.startsWith('author:')) {
        const author = search.replace('author:', '').trim().toLowerCase();
        filtered = filtered.filter(book => book.author.toLowerCase().includes(author));
      } else if (search.startsWith('title:')) {
        const title = search.replace('title:', '').trim().toLowerCase();
        filtered = filtered.filter(book => book.title.toLowerCase().includes(title));
      } else {
        filtered = filtered.filter(book =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    if (genre) {
      filtered = filtered.filter(book => book.genre === genre);
    }

    if (rating && (search || genre)) {
      filtered = filtered.filter(book => book.averageRating >= parseInt(rating));
    }

    setFilteredBooks(filtered);
  };

  // UseEffect to fetch books and apply client-side filtering
  useEffect(() => {
    if (user?.role === 'USER') {
      const fetchAndApplyFilter = async () => {
        await fetchAndFilterBooks(); // Fetch books
        filterBooks(); // Apply client-side filtering
      };
      
      fetchAndApplyFilter(); // Call the function to fetch and filter
    }
  }, [user, search, genre, rating, books]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Browse Books</h1>
        {user?.role === 'ADMIN' && (
          <Link
            to="/admin/add-book"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Book
          </Link>
        )}
      </div>

      {/* Search bar for USER */}
      {user?.role === 'USER' && (
        <SearchBooks
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          rating={rating}
          setRating={setRating}
        />
      )}

      {/* Book display with "No books found" fallback */}
      {(user?.role === 'USER' ? filteredBooks : books).length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(user?.role === 'USER' ? filteredBooks : books).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
};

export default Home;
