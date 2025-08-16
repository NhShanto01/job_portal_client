import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2'

const JobApply = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();


    const submitApplication = (e) => {
        e.preventDefault();
        const form = e.target;
        const linkedin = form.linkedin.value;
        const github = form.github.value;
        const resume = form.resume.value;


        const applicationData = {
            jobId: id,
            applicantEmail: user.email,
            linkedin,
            github,
            resume
        }

        fetch('http://localhost:5000/job-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Something went wrong!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myApplications');
                }
            }).catch(error => {
                console.error('Error submitting application:', error);
            })
    }

    return (
        <div>
            <h1>Job Apply</h1>
            <div className="card-body">
                <form onSubmit={submitApplication} className="fieldset">
                    <label className="label">LinkedIn URL</label>
                    <input type="url" name="linkedin" className="input" placeholder="LinkedIn URL" required />
                    <label className="label">GitHub URL</label>
                    <input type="url" name="github" className="input" placeholder="GitHub URL" required />
                    <label className="label">Resume URL</label>
                    <input type="url" name="resume" className="input" placeholder="Resume URL" required />
                    {/* <fieldset className="fieldset">
                        <legend className="fieldset-legend">your Picture</legend>
                        <input type="file" className="file-input" />
                        <label className="label">Max size 2MB</label>
                    </fieldset> */}
                    <button className="btn btn-neutral mt-4">Apply</button>
                </form>
            </div>
        </div>
    );
};

export default JobApply;