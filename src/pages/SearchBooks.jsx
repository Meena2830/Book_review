import { useEffect, useState } from 'react';

const SearchBooks = ({ search, setSearch, genre, setGenre, rating, setRating }) => {
  const [localSearch, setLocalSearch] = useState(search);

  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearch(localSearch);
    }, 500); 
    return () => clearTimeout(delayDebounce); 
  }, [localSearch, setSearch]);

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by title or author"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="border p-2 rounded w-1/3"
      />

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Tech">Tech</option>
        <option value="Fantasy">Fantasy</option>
      </select>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Ratings</option>
        <option value="5">5 </option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
    </div>
  );
};

export default SearchBooks;




// SearchBooks.jsx
// import { useEffect, useState } from 'react';

// const SearchBooks = ({ search, setSearch, genre, setGenre, rating, setRating }) => {
//   const [localSearch, setLocalSearch] = useState(search);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       console.log('Updating search term:', localSearch);
//       setSearch(localSearch);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [localSearch, setSearch]);

//   const handleGenreChange = (e) => {
//     console.log('Selected genre:', e.target.value);
//     setGenre(e.target.value);
//   };

//   const handleRatingChange = (e) => {
//     console.log('Selected rating:', e.target.value);
//     setRating(e.target.value);
//   };

//   return (
//     <div className="flex gap-4 mb-4">
//       <input
//         type="text"
//         placeholder="Search by title or author"
//         value={localSearch}
//         onChange={(e) => setLocalSearch(e.target.value)}
//         className="border p-2 rounded w-1/3"
//       />

//       <select
//         value={genre}
//         onChange={handleGenreChange}
//         className="border p-2 rounded"
//       >
//         <option value="">All Genres</option>
//         <option value="Fiction">Fiction</option>
//         <option value="Tech">Tech</option>
//         <option value="Fantasy">Fantasy</option>
//       </select>

//       <select
//         value={rating}
//         onChange={handleRatingChange}
//         className="border p-2 rounded"
//       >
//         <option value="">All Ratings</option>
//         <option value="5">5</option>
//         <option value="4">4</option>
//         <option value="3">3</option>
//         <option value="2">2</option>
//         <option value="1">1</option>
//       </select>
//     </div>
//   );
// };

// export default SearchBooks;
