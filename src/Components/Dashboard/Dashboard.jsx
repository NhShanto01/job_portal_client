import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-blue-900 font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  // Normalize role to lowercase to avoid comparison issues
  const userRole = user?.role?.toLowerCase() || 'admin'; // 'recruiter' 'candidate'
  const isAdmin = userRole === 'admin';
  const isCandidate = userRole === 'candidate';
  const isRecruiter = userRole === 'recruiter';

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md ${
      isActive
        ? 'bg-white text-blue-900 font-semibold'
        : 'text-white hover:bg-white hover:text-blue-900'
    }`;

  return (
    <div className="flex">
      {/* Dashboard Sidebar */}
      <div className="w-64 min-h-screen bg-blue-900">
        <ul className="menu p-4">
          {/* Admin Routes */}
          {isAdmin && (
            <>
              <li className="my-2">
                <NavLink to="/dashboard/all-users" className={linkClass}>
                  All Users
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/manage-jobs" className={linkClass}>
                  Manage Jobs
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/manage-candidates" className={linkClass}>
                  Manage Candidates
                </NavLink>
              </li>
            </>
          )}

          {/* Candidate Routes */}
          {isCandidate && (
            <>
              <li className="my-2">
                <NavLink to="/dashboard/profile" className={linkClass}>
                  Profile
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/my-applications" className={linkClass}>
                  My Applications
                </NavLink>
              </li>
            </>
          )}

          {/* Recruiter Routes */}
          {isRecruiter && (
            <>
              <li className="my-2">
                <NavLink to="/dashboard/add-jobs" className={linkClass}>
                  Add Jobs
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/my-posted-jobs" className={linkClass}>
                  My Posted Jobs
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink to="/dashboard/view-candidates" className={linkClass}>
                  View Candidates
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
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
