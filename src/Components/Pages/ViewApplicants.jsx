import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplicants = () => {
    const applications = useLoaderData();

    const handleStatusUpdate = (id, e) => {
        console.log(id, e.target.value);

        const data = {
            status: e.target.value
        };
        fetch(`http://localhost:5000/job-application/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Status Has Been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                }
        })
    }
    


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Applicant Email</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            applications.map((app, index) =>
                                <tr key={app._id}>
                                    <th>{index + 1}</th>
                                    <td>{app.applicantEmail}</td>
                                    <td>
                                        <button className="btn btn-link btn-accent">View Resume</button>
                                    </td>
                                    <td>
                                        <select 
                                        onChange={(e) => handleStatusUpdate(app._id, e)}
                                        defaultValue={app.status || 'Change Status'} className="select select-xs">
                                            <option disabled={true}>Change Status</option>
                                            <option>Under Review</option>
                                            <option>Set Interview</option>
                                            <option>Hired</option>
                                            <option>Rejected</option>
                                        </select>
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

export default ViewApplicants;