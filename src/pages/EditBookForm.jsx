import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const EditBookForm = () => {
  const { id } = useParams();  // Get book ID from URL params
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: '', 
    author: '', 
    genre: '', 
    description: '', 
    coverImageUrl: '' 
  });
  const [loading, setLoading] = useState(true);

  // Fetch the book data when the component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/admin/books/${id}`);  // Fetch book by ID
        setForm(res.data);  // Set form state with fetched data
        setLoading(false);  // Set loading to false once the data is fetched
      } catch (err) {
        console.error('Failed to load book', err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);  // Runs every time the `id` changes (e.g., when navigating to a different book)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });  // Update form state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/books/${id}`, form); 
      navigate('/admin');  
    } catch (err) {
      console.error('Failed to update book', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}  
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}  
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="genre" className="block">Genre</label>
          <input
            type="text"
            name="genre"
            value={form.genre} 
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            name="description"
            value={form.description}  // Pre-fill with the current description
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="coverImageUrl" className="block">Cover Image URL</label>
          <input
            type="text"
            name="coverImageUrl"
            value={form.coverImageUrl}  // Pre-fill with the current cover image URL
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
