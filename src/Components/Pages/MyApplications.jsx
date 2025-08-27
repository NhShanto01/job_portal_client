import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
// import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const MyApplications = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {

        // fetch(`http://localhost:5000/job-application?email=${user?.email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setJobs(data);
        //     })
        //     .catch(err => console.error('Error fetching applications:', err));

        // axios.get(`http://localhost:5000/job-application?email=${user?.email}`, { withCredentials: true })
        // .then(res => setJobs(res.data))

        axiosSecure.get(`/job-application?email=${user.email}`)
        .then(res => setJobs(res.data))

    }, [user.email, axiosSecure]);

    // Function to handle deletion of an application
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result.isConfirmed)
            if (result.isConfirmed) {


                fetch(`http://localhost:5000/job-application/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0 || data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success"
                            });
                            setJobs(prevJobs => prevJobs.filter(job => job._id !== id));

                        } else {
                            alert('Failed to delete application.');
                        }
                    })
                    .catch(err => {
                        console.error('Error deleting application:', err);
                        alert('Something went wrong. Try again later.');
                    });
            }
        });
    };


    return (
        <div>
            <div>
                <h1 className="text-2xl text-center my-4">My Applications  {jobs.length === 0 && (
                    <div className="text-center text-gray-500 my-6">You have not applied to any jobs yet.</div>
                )} </h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Deadline</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            jobs.map(job => <tr key={job._id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={job.company_logo}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{job.company}</div>
                                            <div className="text-sm opacity-50">{job.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {job.title}

                                </td>
                                <td>{job.applicationDeadline}</td>
                                <th>
                                    <Link to={`/jobs/${job.jobId}`}>
                                        <button className="btn btn-ghost btn-xs">Details</button>
                                    </Link>
                                    <button
                                        className="btn btn-error btn-xs"
                                        onClick={() => handleDelete(job._id)}
                                    >
                                        Delete
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;