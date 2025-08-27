import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }

    });

    const handleDeleteUser = user => {
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


                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => res.data)
                    .then(data => {
                        if (data.deletedCount > 0 || data.success) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success"
                            });

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
    }


    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-center">All Users</h1>
                <h1 className="text-2xl font-bold text-center">Total Users: {users.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td className='flex items-center space-x-2'>
                                        <div>
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null; // Prevent infinite loop
                                                        e.currentTarget.src = ""; // Remove src to fallback into text avatar
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white font-bold">
                                                    {user.name?.substring(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            {user.name}
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}

                                    </td>
                                    <td>
                                        {user.role}
                                    </td>
                                    <th>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-error btn-xs">Delete</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default AllUsers;
