import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const JobDetails = () => {
    const {
        _id,
        title,
        company,
        location,
        jobType,
        applicationDeadline,
        description,
        salaryRange,
        requirements,
        responsibilities,
        hr_email,
        hr_name,
        company_logo
    } = useLoaderData();

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl my-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-6 mb-6">
                <div className="flex items-center gap-4">
                    {company_logo && (
                        <img
                            src={company_logo}
                            alt="Company Logo"
                            className="w-20 h-20 rounded-xl object-cover border p-1"
                        />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-gray-600 font-medium">{company}</p>
                        <p className="text-gray-500 text-sm">{location}</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {jobType}
                    </span>
                    <div className="text-sm text-gray-500">Deadline: {applicationDeadline}</div>
                </div>
            </div>

            {/* Description */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Responsibilities */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {Array.isArray(responsibilities) && responsibilities.map((rule, index) => (
                        <li key={index} className='px-2'>{rule}</li>
                    ))}
                </ul>
            </div>

            {/* Requirements */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {Array.isArray(requirements) && requirements.map((skill, index) => (
                        <li key={index} className='px-2'>{skill}</li>
                    ))}
                </ul>
            </div>



            {/* Salary + Contact */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold">Salary Range</h3>
                    <p className="text-gray-700 mt-1">Salary:{salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold">HR Contact</h3>
                    <p className="text-gray-700 mt-1">{hr_name}</p>
                    <p className="text-gray-500 text-sm">{hr_email}</p>
                </div>
            </div>
            {/* Apply Button */}
            <div className="mt-8">
                {/* <Link to="/jobApply"  */}
                {/* <Link to={`/jobApply/${_id}`}  */}
                <Link to={`/jobApply/${_id}`} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                </Link>


            </div>
        </div >
    );
};

export default JobDetails;
