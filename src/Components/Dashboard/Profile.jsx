import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <div>
                {user ?
                    <>
                        <h1>User Profile</h1>
                        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl my-10">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Avatar"
                                        className="w-50 h-50 rounded-box border-2 object-cover"
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
                                <div>
                                    <h1 className="text-3xl font-bold">{user.displayName}</h1>
                                    <p className="text-gray-600">{user.email}</p>
                                    <p className="text-gray-600">User Role: {user?.role}</p>
                                </div>
                            </div>
                        </div>
                    </> : <></>}
            </div>
        </>
    );
};

export default Profile;