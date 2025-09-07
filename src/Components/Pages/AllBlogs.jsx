import React, { useEffect, useState } from 'react';
import BlogCard from '../Pages/BlogCard'

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.b_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.a_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-6 text-center">All Blog Posts</h2>

      {/* Search bar */}
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="px-4 py-2 w-full max-w-md border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid of blogs */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.b_id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default AllBlogs;
