import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import loginLottieData from '../../assets/lottie/login.json';
import AuthContext from '../../Context/AuthContext';
import SocialAuth from './SocialAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {

    const { loginUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const form = location.state || '/';
    const axiosPublic = useAxiosPublic();
    const [loggedUser, setLoggedUser] = useState(null);
    console.log('Form location:', form);
    console.log('Logged user:', loggedUser);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // start
        // In your login component
       loginUser(email, password)
        .then(result => {
            setLoggedUser(result.user);
            // Use result.user directly
            return axiosPublic.get(`/users/${result.user.email}`).then(response => ({
            user: result.user,
            dbData: response.data
            }));
        })
        .then(({ user, dbData }) => {
            if (dbData.success) {
            const completeUserData = {
                ...user,
                role: dbData.user.role
            };
            console.log('Complete User Data:', completeUserData);
            setUser(completeUserData);
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
            form.reset();
            } else {
            throw new Error('User data not found in database');
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert(error.message);
        });
        // end

        console.log('Email:', email, 'Password:', password);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-md">
                    <Lottie animationData={loginLottieData}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
                    <div className="card-body">
                        <form onSubmit={handleLogin} className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" required />
                            <label className="label">Password</label>
                            <input type="password" name="password" className="input" placeholder="Password" required />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </form>
                        <SocialAuth />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;