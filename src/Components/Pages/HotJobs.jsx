import React, { useEffect, useState } from 'react';
import JobCard from '../Pages/JobCard.jsx';
import Categories from './Categories.jsx';
import { Link } from 'react-router-dom';

const HotJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
            })

    }, []);

    return (
        <div>
            <div className='text-center my-8'>
                <h1 className='text-3xl font-bold'>Jobs of the day</h1>
                <p className='text-gray-500 font-bold'>Explore the latest job opportunities</p>
            </div>

            <Categories />
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                {
                    jobs.slice(0, 6).map(job => (
                        <JobCard key={job._id} job={job}></JobCard>
                    ))
                }
            </div>

            <Link to="/all-jobs" className="block text-center mt-6">
                <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    See All Jobs
                </button>
            </Link>
        </div>
    );
};

export default HotJobs;