import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';



const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // Include credentials for cross-origin requests
});

const useAxiosSecure = () => {
    const { logOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                console.error('Response error:', error);

                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    logOutUser()
                        .then(() => {
                            console.log('User signed out due to unauthorized access');
                            navigate('/login');
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
                return Promise.reject(error);
            }
        );
    }, [ logOutUser, navigate ]);

        return axiosInstance;

    };

    export default useAxiosSecure;