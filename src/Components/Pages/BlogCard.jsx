import React from 'react';

const BlogCard = ({blog}) => {
    const { b_image, b_title, b_text, b_date, a_name, b_author } = blog;
    return (
        <div>
          <div  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            <img src={b_image} alt={b_title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <img src={b_author} alt={a_name} className="w-10 h-10 rounded-full border object-cover" />
                <div>
                  <p className="text-sm font-semibold">{a_name}</p>
                  <p className="text-xs text-gray-500">{b_date}</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{b_title}</h3>
              <p className="text-gray-700 text-sm mb-4">{b_text.slice(0, 100)}...</p>
              <button className="mt-auto text-blue-600 font-medium hover:underline">
                Read More →
              </button>
            </div>
          </div>
        </div>
    );
};

export default BlogCard;