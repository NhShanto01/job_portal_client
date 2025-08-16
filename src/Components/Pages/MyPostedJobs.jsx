import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
            })
    }, [user.email]);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Posted Jobs - {jobs.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Job Title</th>
                            <th>Deadline</th>
                            <th>Applicants Count</th>
                            <th>View Applicants</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            jobs.map((job, index) =>
                                <tr key={job._id}>
                                    <th>{index + 1}</th>
                                    <td>{job.title}</td>
                                    <td>{job.applicationDeadline}</td>
                                    <td>{job.applicantsCount}</td>
                                    <td>
                                        <Link to={`/viewApplicants/${job._id}`}>
                                            <button className="btn btn-link"> View Applicants</button>
                                        </Link>

                                    </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;