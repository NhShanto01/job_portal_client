import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import team1 from '../../assets/team/team-1.jpg';
import team2 from '../../assets/team/team-2.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [keyword, setKeyword] = useState('');

    // const handleSearch = async () => {
    //     const query = new URLSearchParams();
    //     if (industry) query.append('industry', industry);
    //     if (location) query.append('location', location);
    //     if (keyword) query.append('keyword', keyword);

    //     const url = `http://localhost:5000/jobs?${query.toString()}`;
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     console.log('Filtered Jobs:', data);
    // };

    return (
        <div className="hero bg-[#f9fbff] py-16 px-6 lg:px-24 text-gray-800">
            <div className="hero-content flex-col lg:flex-row gap-16">
                {/* Left: Text + Search */}
                <div className="flex-2">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                        The <span className="text-blue-600 bg-blue-100 px-2 rounded">Easiest Way</span> <br />
                        to Get Your New Job
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Each month, more than 3 million job seekers turn to our website, making over <strong>140,000</strong> applications every single day.
                    </p>

                    {/* Search Form */}
                    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col lg:flex-row gap-4">
                        {/* Industry Dropdown */}
                        <div className="flex items-center border rounded-md px-3 py-2 gap-2 flex-1">
                            <FaBriefcase className="text-gray-400" />
                            <select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="outline-none w-full text-sm bg-transparent"
                            >
                                <option value="">Select Industry</option>
                                <option value="IT">IT</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>

                        {/* Location Dropdown */}
                        <div className="flex items-center border rounded-md px-3 py-2 gap-2 flex-1">
                            <FaMapMarkerAlt className="text-gray-400" />
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="outline-none w-full text-sm bg-transparent"
                            >
                                <option value="">Select Location</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>

                        {/* Keyword input */}
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            type="text"
                            placeholder="Keyword"
                            className="border rounded-md px-3 py-2 text-sm flex-1 outline-none"
                        />

                        {/* Search Button */}
                        <Link to="/all-jobs" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                        
                            <FaSearch /> Search

                        </Link>

                    </div>

                    {/* Popular Searches */}
                    <div className="mt-6 text-sm text-gray-600">
                        <strong>Popular Searches: </strong>
                        <span className="text-blue-600 hover:underline cursor-pointer">Designer</span>,{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">Web</span>,{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">IOS</span>,{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">Developer</span>,{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">PHP</span>,{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">Senior</span>,{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">Engineer</span>
                    </div>
                </div>

                {/* Right: Images with Motion (hidden on sm, md) */}
                <div className="flex-1 hidden md:flex flex-col gap-6">
                    <motion.img
                        src={team1}
                        animate={{ y: [20, 50, 20] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="w-72 mx-auto lg:mx-0 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-600 shadow-2xl shadow-blue-400"
                    />
                    <motion.img
                        src={team2}
                        animate={{ x: [50, 70, 50] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-72 mx-auto lg:mx-0 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-600 shadow-2xl shadow-blue-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
