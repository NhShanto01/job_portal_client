import Lottie from 'lottie-react';
import regLottieData from '../../assets/lottie/register.json';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import SocialAuth from './SocialAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Register = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;

        // Simple password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 6 characters long, contain one uppercase letter, and one number.");
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log('User created:', result.user);
                updateUserProfile(name, photoURL)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            photoURL: photoURL,
                            role: role,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('User info saved:', res.data);
                                    form.reset(); // Reset the form after successful registration
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Registration successful!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })
                    })

            })
            .catch(error => {
                console.error('Error creating user:', error);
                alert(error.message);
            });

        console.log('Email:', email, 'Password:', password, 'Role:', role);
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
                            <label className="label">Your Name</label>
                            <input type="text" name="name" className="input" placeholder="Your Name" required />
                            <label className="label">Photo URL</label>
                            <input type="url" name="photoURL" className="input" placeholder="Your Photo URL" required />
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" required />
                            <label className="label">Password</label>
                            <input type="password" name="password" className="input" placeholder="Password" required />
                            <div className='mt-5 mb-2 flex items-center gap-2'>
                                <input type="radio" name="role" value="Candidate" className="radio" defaultChecked />
                                <label>Candidate</label>
                            </div>
                            <div className='mb-5 flex items-center gap-2'>
                                <input type="radio" name="role" value="Recruiter" className="radio" />
                                <label>Recruiter</label>
                            </div>

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
