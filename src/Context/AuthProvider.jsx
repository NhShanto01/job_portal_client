import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to create a new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Function to sign in an existing user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Function to log out the user
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo, role) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo, role: role
        });
    }

    // Capture the authentication state
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         console.log('State Captured:', currentUser?.email);

    //         if (currentUser?.email) {
    //             const user = { email: currentUser.email };
    //             axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
    //                 .then(res => {
    //                     console.log('Login Token:', res.data);
    //                     setLoading(false);
    //                 })
    //         }
    //         else {
    //             axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
    //                 .then(res => {
    //                     console.log('logout:', res.data);
    //                     setLoading(false);
    //                 })

    //         }

    //     })
    //     return () => {
    //         unsubscribe();
    //     }
    // });


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);

            if (currentUser?.email) {
                try {
                    // Fetch user data from your backend (including role)
                    const res = await axios.get(`http://localhost:5000/users/${currentUser.email}`);
                    const dbUser = res.data.user;

                    // ✅ Enrich Firebase user with role
                    const enrichedUser = {
                        ...currentUser,
                        role: dbUser?.role || 'candidate', // fallback role
                    };

                    setUser(enrichedUser);

                    // Set JWT cookie
                    await axios.post(
                        'http://localhost:5000/jwt',
                        { email: currentUser.email },
                        { withCredentials: true }
                    );
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    // Still log in user, but without role
                    setUser({ ...currentUser, role: 'candidate' });
                }
            } else {
                // No user logged in
                setUser(null);

                // Clear JWT cookie
                try {
                    await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
                } catch (err) {
                    console.error('Logout cleanup failed:', err);
                }
            }

            // ✅ Always end loading
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    
    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        loginWithGoogle,
        logOutUser,
        updateUserProfile,
        setUser: setUser,
    };
    // console.log(setUser);


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;