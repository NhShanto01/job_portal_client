import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { FaGoogle } from 'react-icons/fa';

const SocialAuth = () => {

    const { loginWithGoogle } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        loginWithGoogle()
            .then(result => {
                console.log(result.user);
                console.log('Google Sign In Successful:',
                    result.user);

            })
            .catch(error => {
                console.error('Error during Google Sign In:', error);
            });
    }
    return (
        <div className='m-4'>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn">
                <FaGoogle/>
                Google
            </button>
        </div>
    );
};

export default SocialAuth;