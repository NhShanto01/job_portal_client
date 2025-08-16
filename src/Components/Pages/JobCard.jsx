import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    const { _id, title, company, company_logo, requirements, description, location, salaryRange } = job;

    const getNumber = (val) => {
        if (!val) return 0;
        if (typeof val === "number") return val;
        if (val.$numberInt) return parseInt(val.$numberInt, 10);
        if (val.$numberDouble) return parseFloat(val.$numberDouble);
        return 0;
    };

    const minSalary = getNumber(salaryRange?.min);
    const maxSalary = getNumber(salaryRange?.max);

    // Format numbers nicely with commas
    const formatSalary = (num) => num ? num.toLocaleString() : 0;

    return (
        <div className="card bg-base-100 shadow-sm border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50">
            <div className='flex items-center gap-4 p-2'>
                <figure>
                    <img
                        className='w-16'
                        src={company_logo}
                        alt="Company Logo"
                    />
                </figure>
                <div>
                    <h4 className='text-2xl font-semibold'>{company}</h4>
                    <p className='text-gray-600'>{location}</p>
                </div>
            </div>

            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>

                <p className="text-gray-700">{description}</p>

                {/* Skills */}
                <div className='flex gap-2 flex-wrap mt-2'>
                    {requirements.map((skill, index) => (
                        <span
                            key={index}
                            className='border rounded-md text-sm px-2 py-1 hover:text-blue-500 hover:bg-blue-100 transition'
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Salary + Apply */}
                <div className="card-actions flex justify-between items-center mt-4">
                    <p className="font-semibold text-blue-600">
                        Salary: {formatSalary(minSalary)} - {formatSalary(maxSalary)} {salaryRange?.currency?.toUpperCase()}
                    </p>
                    <Link to={`/jobs/${_id}`}>
                        <button className="btn border-blue-600 text-blue-600 hover:text-white hover:bg-blue-500 transition">
                            Apply
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
