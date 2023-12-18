import React from 'react';
import {useSelector} from "react-redux";
import Hbg from '../assets/home-bg.png'
import {Link} from "react-router-dom";

const Hero = () => {

    // const {userInfo} = useSelector((state)=>state.auth)
    return (
        <div className="relative h-screen">
            {/* Background Image */}
            <img
                src={Hbg}
                alt="Background"
                className="absolute inset-0 object-cover w-full h-full"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl mb-4">Welcome to Your Website</h1>
                <p className="mb-8">p</p>

                <div className="flex space-x-4">
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </Link>
                    <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Register
                    </Link>
                </div>
            </div>
        </div>    );
};

export default Hero;