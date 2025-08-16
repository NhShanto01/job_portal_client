import Lottie from 'lottie-react';
import regLottieData from '../../assets/lottie/register.json';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import SocialAuth from './SocialAuth';
import Swal from 'sweetalert2';

const Register = () => {

    const { createUser } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Simple password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 6 characters long, contain one uppercase letter, and one number.");
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log('User created:', result.user);
                form.reset(); // Reset the form after successful registration
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration successful! Please log in.",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error creating user:', error);
                alert(error.message);
            });

        console.log('Email:', email, 'Password:', password);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-lg">
                    <Lottie animationData={regLottieData}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
                    <div className="card-body">
                        <form onSubmit={handleRegister} className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" required />
                            <label className="label">Password</label>
                            <input type="password" name="password" className="input" placeholder="Password" required />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Register</button>
                        </form>
                        <SocialAuth />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
