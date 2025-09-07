import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
// import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const HotBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
            })

    }, []);

    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 2
    //             }
    //         },
    //         {
    //             breakpoint: 640,
    //             settings: {
    //                 slidesToShow: 1
    //             }
    //         }
    //     ]
    // };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Job Tips & Blogs</h2>

            {/* <Slider {...settings}> */}
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {blogs.slice(0, 3).map(blog => (
                    <div key={blog.b_id} className="px-2">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>

            {/* </Slider> */}
            <Link to="/all-blogs" className="block text-center mt-6">
                <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    See All Blogs
                </button>
            </Link>
        </div>
    );
};
export default HotBlogs;

