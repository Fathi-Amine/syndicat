import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiLogin } from 'react-icons/ci';
import { useRegisterMutation } from '../slices/usersApiSlice.js';
import Spinner from './Spinner.jsx';
import { toast } from 'react-toastify';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

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
            if (!formData.username|| !formData.email || !formData.password || !formData.confirmPassword) {
                toast.error('Please fill in all fields.');
                return
            }

            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match.');
                return;
            }
            const res = await register({ username: formData.username, email: formData.email, password: formData.password }).unwrap();
            const {msg} = res
            toast.success(msg)
            navigate('/login');
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
                <label htmlFor="username" className="sr-only">
                    Name
                </label>
                <input
                    id="username"
                    name={"username"}
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter your name"
                    defaultValue={formData.username}
                    onChange={(e)=>handleChange(e)}
                />
            </div>


            <div>
                <label htmlFor="email" className="sr-only">
                    Email
                </label>
                <input
                    id="email"
                    name={"email"}
                    type="email"
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

            {/* Confirm Password input */}
            <div>
                <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name={"confirmPassword"}
                    type="password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Confirm password"
                    defaultValue={formData.confirmPassword}
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
                        Register
                    </>
                )}
            </button>

            {/* Links */}
            <p className="text-center text-sm text-gray-200">
                Already have an account?
                <Link className="underline text-indigo-300 px-1 font-bold" to="/auth/login">
                    Login
                </Link>
            </p>
            </form>
        </>
    );
};

export default RegisterForm;
