import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SocialAuth = () => {

    const { loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        loginWithGoogle()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photoURL: result.user?.photoURL,
                    role: "" 
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    console.log('User info saved:', res.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Google Login Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
                })

            })
            .catch(error => {
                console.error('Error during Google Sign In:', error);
            });
    }
    return (
        <div className='m-4'>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn w-full shadow-md">
                <FaGoogle />
                Google
            </button>
        </div>
    );
};

export default SocialAuth;