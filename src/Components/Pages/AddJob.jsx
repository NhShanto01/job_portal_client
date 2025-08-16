import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddJob = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        const { min, max, currency, ...newJob } = initialData;
        newJob.salaryRange = { min, max, currency }
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');

        console.log(newJob);
        fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Job Has Been Added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myPostedJobs');
                    e.target.reset();
                }
            })
            .catch(error => {
                console.error('Error adding job:', error);
            });



    }
    return (
        <div>
            <h1 className='text-center mt-6 text-3xl font-bold'>Add a New Job</h1>
            {/* onSubmit={submitApplication} */}
            <div className="card-body ">
                <form onSubmit={handleAddJob} className="fieldset mx-auto border-2 p-4 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-8">
                        <fieldset className="fieldset p-4">
                            {/* Job title */}
                            <label className="label">Job Title</label>
                            <input type="text" name="title" className="input" placeholder="Job Title" required />
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Company Name */}
                            <label className="label">Company Name</label>
                            <input type="text" name="company" className="input" placeholder="Company Name" required />
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Company Logo */}
                            <label className="label">Company Logo</label>
                            <input type="text" name="company_logo" className="input" placeholder="Company Logo" required />
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Job Field */}
                            <label className="label">Job Field</label>
                            <select defaultValue="Pick a Job Field" className="select -2" name="category" required>
                                <option disabled={true}>Pick a Job Field</option>
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>Finence</option>
                                <option>Development</option>
                            </select>
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Job Type */}
                            <label className="label">Job Type</label>
                            <select defaultValue="Pick a Job Type" className="select -2" name="jobType" required>
                                <option disabled={true}>Pick a Job Type</option>
                                <option>Full-Time</option>
                                <option>Intern</option>
                                <option>Remote</option>
                                <option>Hybrid</option>
                            </select>
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Application Deadline */}
                            <label className="label">Application Deadline</label>
                            <input type="date" name="applicationDeadline" className="input" placeholder="Application Deadline" required />
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Job Location */}
                            <label className="label">Job Location</label>
                            <input type="text" name="location" className="input" placeholder="Job Location" required />
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Company HR Name and Email */}
                            <label className="label">Company HR Name</label>
                            <input type="text" name="hr_name" className="input" placeholder="HR Name" required />
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            <label className="label">Company HR Email</label>
                            <input type="email"
                                defaultValue={user?.email}
                                name="hr_email" className="input" placeholder="HR Email" readOnly />
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Job Description */}
                            <label className="label">Job Description</label>
                            <textarea name="description" className="textarea" placeholder="Job Description" required></textarea>
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Job Requirements */}
                            <label className="label">Job Requirements</label>
                            <textarea name="requirements" className="textarea" placeholder="Put each requirements in a new line" required></textarea>
                        </fieldset>
                        <fieldset className="fieldset p-4">
                            {/* Job Reponsibilites */}
                            <label className="label">Job Reponsibilites</label>
                            <textarea name="responsibilities" className="textarea" placeholder="Put each reponsibilites in a new line" required></textarea>
                        </fieldset>
                    </div>
                    {/* Job Salary Range */}
                    <p>Salary Range</p>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 mb-8'>
                        <div>
                            <input type="number" name="min" className="input" placeholder="Min" required />
                        </div>
                        <div>
                            <input type="number" name="max" className="input" placeholder="Max" required />
                        </div>
                        <div>
                            <select defaultValue="Pick a Currency" className="select -2" name="currency" required>
                                <option disabled={true}>Pick a Currency</option>
                                <option>BDT</option>
                                <option>USD</option>
                                <option>EUR</option>
                                <option>INR</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-neutral mt-4">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddJob;