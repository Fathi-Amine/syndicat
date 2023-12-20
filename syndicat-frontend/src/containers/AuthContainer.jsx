
import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import syndicatVid from "../assets/Syndic de copropriété rôle et missions d un syndic - Le Droit pour Moi.mp4"; // Import your NavBar component
import Login from '../components/Login.jsx';
import Register from "../components/Register.jsx";
import Verify from "../components/Verify.jsx";

const AuthContainer = () => {
    const location = useLocation();
    const currentRoute = location.pathname;

    const [showButtons, setShowButtons] = useState(true);

    useEffect(() => {
        setShowButtons(currentRoute !== '/login' && currentRoute !== '/register' && currentRoute !== '/mail/verify-email');
    }, [currentRoute]);
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={syndicatVid}
                    typeof="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className={"w-full h-full object-cover"}
                    style={{ clipPath: "inset(1px 1px)"}}
                />

                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="shadow-2xl">
                    {/* Auth form container */}

                        {/* Include your Login and Register forms here */}
                        <Routes>
                            <Route path="/login" element={<Login />} />

                            <Route path="/register" element={<Register />} />

                            <Route path="/mail/verify-email" element={<Verify />}></Route>

                        </Routes>

                        {/* Navigation links */}
                        <div className="flex justify-center space-x-4">
                            {showButtons && (
                                <>
                                    <Link
                                        to="/login"
                                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;