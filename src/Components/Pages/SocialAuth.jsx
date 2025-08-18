import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SocialAuth = () => {

    const { loginWithGoogle } = useContext(AuthContext);
        const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        loginWithGoogle()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');

            })
            .catch(error => {
                console.error('Error during Google Sign In:', error);
            });
    }
    return (
        <div className='m-4'>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn">
                <FaGoogle />
                Google
            </button>
        </div>
    );
};

export default SocialAuth;