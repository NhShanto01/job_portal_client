import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import logo from '../../assets/job-logo.png'
import { IoMdExit } from 'react-icons/io';

const Navbar = () => {

    const { user,logOutUser } = useContext(AuthContext);

    const handleLogout = () => {
        logOutUser()
            .then(() => {
                console.log('User logged out');
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    const links =
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/all-jobs">All Jobs</NavLink>
            </li>
            <li>
                <NavLink to="/addJob">Add Job</NavLink>
            </li>
            <li>
                <NavLink to="/myPostedJobs">My Posted Jobs</NavLink>
            </li>
            <li>
                <NavLink to="/myApplications">My Application</NavLink>
            </li>
        </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={logo} alt="Job Portal Logo" className="w-10 h-10 mr-2" />
                    Job Finder
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <span className="text-blue-600 mr-2 border-2 rounded-md p-1">{user.email}</span>
                        <button onClick={handleLogout} className="btn btn-neutral">Logout
                            <IoMdExit/>
                        </button>
                    </> : <>
                        <Link to="/register" className="text-blue-600 mr-2 cursor-pointer">Register</Link>
                        <Link to="/login" className="btn text-white bg-blue-600 cursor-pointer">Login</Link>
                    </>
                }

            </div>
        </div>
    );
};

export default Navbar;