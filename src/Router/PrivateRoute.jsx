import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    if (user){
        return children;
    } 
    if (loading){
        return <span className="loading loading-ring loading-xl mx-auto"></span>;
    } 
    return <Navigate to="/login" state={location?.pathname} />
};

export default PrivateRoute;