import React, { useEffect, useState } from 'react';
import JobCard from '../Pages/JobCard.jsx';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('none');



    useEffect(() => {
        fetch('http://localhost:5000/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
            })

    }, []);

    useEffect(() => {
        let updatedJobs = [...jobs];

        // Filter by category
        if (selectedCategory !== 'All') {
            updatedJobs = updatedJobs.filter(job => job.category === selectedCategory);
        }

        // Filter by search (job title or company)
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            updatedJobs = updatedJobs.filter(job =>
                job.title.toLowerCase().includes(term) ||
                job.company.toLowerCase().includes(term)
            );
        }

        // Sort by salaryRange.minimum
        if (sort === 'asc') {
            updatedJobs.sort((a, b) => a.salaryRange?.minimum - b.salaryRange?.minimum);
        } else if (sort === 'desc') {
            updatedJobs.sort((a, b) => b.salaryRange?.minimum - a.salaryRange?.minimum);
        }

        setFilteredJobs(updatedJobs);
    }, [jobs, selectedCategory, sort, searchTerm]);
    // sortOrder

    const uniqueCategories = ['All', ...new Set(jobs.map(job => job.category))];


    return (
        <div>
            <div className='text-center my-8'>
                <h1 className='text-3xl font-bold'>Jobs of the day</h1>
                <p className='text-gray-500 font-bold'>Explore the latest job opportunities</p>
            </div>
            {/* Search + Filter + Sort */}
            <div className='flex flex-col lg:flex-row justify-between items-center gap-4 mb-6'>

                {/* Fancy Search Input */}
                <div className='relative w-full max-w-md'>
                    <input
                        type='text'
                        placeholder='Search by job title or company...'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className='w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    <div className='absolute left-3 top-2.5 text-gray-400'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.65 6.15z' />
                        </svg>
                    </div>
                </div>

                {/* Filter by Category */}
                <div>
                    <label className='mr-2 font-medium'>Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className='border px-3 py-1 rounded'
                    >
                        {uniqueCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Sort by Salary */}
                <div>
                    <label className='mr-2 font-medium'>Sort:</label>
                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className='border px-3 py-1 rounded'
                    >
                        <option value='none'>None</option>
                        <option value='asc'>Salary Low to High</option>
                        <option value='desc'>Salary High to Low</option>
                    </select>
                </div>

                {/* <div className='w-11/12 mx-auto bg-base-200 flex items-center py-5'>
                    <button 
                    className='btn btn-nutral'
                    onClick={()=> setSort(!sort)}>
                        {sort == true ? "Sorted by Salary" : "Sort by Salary"}
                    </button>
                </div> */}

            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredJobs.map(job => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default AllJobs;