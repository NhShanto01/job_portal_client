import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { IoMdExit } from 'react-icons/io';

const Dashboard = () => {
  const { user, loading, logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        console.log('User logged out');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-blue-900 font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  const userRole = user.role; // 'recruiter' 'candidate' 'admin'
  const isAdmin = userRole === 'Admin';
  const isCandidate = userRole === 'Candidate';
  const isRecruiter = userRole === 'Recruiter';

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md ${isActive
      ? 'bg-white text-blue-900 font-semibold'
      : 'text-white hover:bg-white hover:text-blue-900'
    }`;

  return (
    <div className="flex ">
      {/* Dashboard Sidebar */}
      <div className="w-64 min-h-screen bg-blue-900 flex flex-col">
        {/* Sidebar Menu */}
        <ul className="menu p-4 flex-grow">
          {/* Admin Routes */}
          {isAdmin && (
            <>
              <li className="my-2">
                <NavLink to="/dashboard" end className={linkClass}>
                  Profile
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/all-users" className={linkClass}>
                  All Users
                </NavLink>
              </li>
            </>
          )}

          {/* Candidate Routes */}
          {isCandidate && (
            <>
              <li className="my-2">
                <NavLink to="/dashboard" end className={linkClass}>
                  Profile
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/myApplications" className={linkClass}>
                  My Applications
                </NavLink>
              </li>
            </>
          )}

          {/* Recruiter Routes */}
          {isRecruiter && (
            <>
              <li className="my-2">
                <NavLink to="/dashboard" end className={linkClass}>
                  Profile
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/addJob" className={linkClass}>
                  Add Jobs
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/myPostedJobs" className={linkClass}>
                  My Posted Jobs
                </NavLink>
              </li>
            </>
          )}

          <hr className="text-white my-3" />

          {/* Common Navigation */}
          <li className="my-2">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/all-jobs" className={linkClass}>
              All Jobs
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/about-us" className={linkClass}>
              About
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/contacts" className={linkClass}>
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* Logout Button at Bottom */}
        <button
          onClick={handleLogout}
          className="mt-auto m-4 flex items-center gap-2 text-white font-bold cursor-pointer"
        >
          <IoMdExit size={20} />
          Logout
        </button>
      </div>


      {/* Dashboard Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
