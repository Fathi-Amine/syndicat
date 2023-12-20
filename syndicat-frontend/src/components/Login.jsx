// import React from 'react';
// import {useState,useEffect} from "react";
// import {Link, useNavigate} from "react-router-dom"
// import {useDispatch, useSelector} from 'react-redux'
// import { CiLogin } from "react-icons/ci";
// import syndicatVid from '../assets/Syndic de copropriété rôle et missions d un syndic - Le Droit pour Moi.mp4';
// import {useLoginMutation} from "../slices/usersApiSlice.js";
// import {setCredentials} from "../slices/authSlice.js";
// import Spinner from "./Spinner.jsx";
// const Login = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//
//     const [login,{isLoading}] = useLoginMutation()
//     const {userInfo} = useSelector((state)=>state.auth)
//     useEffect(()=>{
//         if(userInfo){
//             navigate('/')
//         }
//     }, [navigate, userInfo])
//     const submitHandler = async (e)=>{
//         e.preventDefault()
//         try{
//             const res = await login({email, password}).unwrap()
//             dispatch(setCredentials({...res}))
//             navigate('/')
//         }catch (error) {
//             console.log(error)
//             // toast.error(error?.data?.msg || error.error)
//         }
//     }
//
//     return (
//         <div className={"flex justify-start items-center flex-col h-screen"}>
//             <div className={"relative w-full h-full"}>
//                 <video
//                     src={syndicatVid}
//                     typeof="video/mp4"
//                     loop
//                     controls={false}
//                     muted
//                     autoPlay
//                     className={"w-full h-full object-cover"}
//                     style={{ clipPath: "inset(1px 1px)"}}
//                 />
//                 <div className={"absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay"}>
//                     <div className={"shadow-2xl"}>
//
//                         <div className="mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8">
//                             <div className="mx-auto max-w-lg">
//                                 <h1 className="text-center text-2xl font-bold text-gray-200 sm:text-3xl">Syndic</h1>
//
//                                 <p className="mx-auto mt-4 max-w-md text-center text-gray-300">
//                                     Faciliter la gestion de paiement cotistation syndicale
//                                 </p>
//
//                                 <form
//                                     onSubmit={submitHandler}
//                                     className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
//                                     <p className="text-center text-lg font-medium text-gray-200">Sign in to your account</p>
//
//                                     <div>
//                                         <label htmlFor="email" className="sr-only">Email</label>
//
//                                         <div className="relative">
//                                             <input
//                                                 id={"email"}
//                                                 type="email"
//                                                 className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                                                 placeholder="Enter email"
//                                                 value={email}
//                                                 onChange={(e)=>setEmail(e.target.value)}
//                                             />
//
//                                             <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     className="h-4 w-4 text-gray-400"
//                                                     fill="none"
//                                                     viewBox="0 0 24 24"
//                                                     stroke="currentColor"
//                                                 >
//                                                   <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth="2"
//                                                       d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                                                   />
//                                                 </svg>
//                                             </span>
//                                         </div>
//                                     </div>
//
//                                     <div>
//                                         <label htmlFor="password" className="sr-only">Password</label>
//
//                                         <div className="relative">
//                                             <input
//                                                 id={"password"}
//                                                 type="password"
//                                                 className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                                                 placeholder="Enter password"
//                                                 value={password}
//                                                 onChange={(e)=>setPassword(e.target.value)}
//                                             />
//
//                                             <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     className="h-4 w-4 text-gray-400"
//                                                     fill="none"
//                                                     viewBox="0 0 24 24"
//                                                     stroke="currentColor"
//                                                 >
//                                                   <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth="2"
//                                                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                                   />
//                                                   <path
//                                                       strokeLinecap="round"
//                                                       strokeLinejoin="round"
//                                                       strokeWidth="2"
//                                                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                                                   />
//                                                 </svg>
//                                             </span>
//                                         </div>
//                                     </div>
//
//                                     <button
//                                         type="submit"
//                                         className="flex justify-center items-center gap-2 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
//                                         disabled={isLoading}
//                                     >
//                                         {isLoading ? (
//                                             <Spinner/>
//                                         ) : (
//                                             <>
//                                                 <CiLogin fontSize={22} /> {/* Icon */}
//                                                 Sign in
//                                             </>
//                                         )}
//                                     </button>
//
//                                     <p className="text-center text-sm text-gray-200">
//                                         No account?
//                                         <Link className="underline text-indigo-300 px-1 font-bold" to={"/register"}>Sign up</Link>
//                                     </p>
//                                     <p className="text-center text-sm text-gray-200">
//                                         Dont remember your password
//                                         <Link className="underline text-indigo-300 px-1 font-bold" to="/forgot"> Forgot</Link>
//                                     </p>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiLogin } from 'react-icons/ci';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import Spinner from './Spinner.jsx';
import {toast} from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if ( !formData.email || !formData.password) {
                toast.error('Please fill in all fields.');
                return
            }
            const res = await login({ ...formData }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (error) {
            toast.error(error?.data?.msg || error.error)
        }
    };

    return (
        <>
            <form
                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                onSubmit={submitHandler}
            >
                <p className="text-center text-lg font-medium text-gray-200">Authentication</p>
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name={"email"}
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter email"
                        defaultValue={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Password input */}
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name={"password"}
                        type="password"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter password"
                        defaultValue={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="flex justify-center items-center gap-2 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    disabled={isLoading}
                    onClick={submitHandler}
                >
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <CiLogin fontSize={22} /> {/* Icon */}
                            Sign in
                        </>
                    )}
                </button>

                {/* Links */}
                <p className="text-center text-sm text-gray-200">
                    No account?
                    <Link className="underline text-indigo-300 px-1 font-bold" to="/register">
                        Sign up
                    </Link>
                </p>
                <p className="text-center text-sm text-gray-200">
                    Forgot your password?
                    <Link className="underline text-indigo-300 px-1 font-bold" to="/forgot">
                        Forgot
                    </Link>
                </p>
            </form>
        </>
    );
};

export default Login;
