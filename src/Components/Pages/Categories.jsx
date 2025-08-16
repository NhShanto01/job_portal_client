import React from 'react';

const Categories = () => {
    return (
        <div>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center my-8 '>
                <div className=' bg-gray-50 hover:bg-blue-100 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:text-blue-500'>
                    <p>Engineer</p>
                </div>
                <div className=' bg-gray-50 hover:bg-blue-100 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:text-blue-500'>
                    <p>Developer</p>
                </div>
                <div className=' bg-gray-50 hover:bg-blue-100 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:text-blue-500'>
                    <p>Marketing & Sales</p>
                </div>
                <div className=' bg-gray-50 hover:bg-blue-100 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:text-blue-500'>
                    <p>Management</p>
                </div>
                <div className=' bg-gray-50 hover:bg-blue-100 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:text-blue-500'>
                    <p>Designer</p>
                </div>
                <div className=' bg-gray-50 hover:bg-blue-100 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:text-blue-500'>
                    <p>Finance</p>
                </div>
            </div>
        </div>
    );
};

export default Categories;