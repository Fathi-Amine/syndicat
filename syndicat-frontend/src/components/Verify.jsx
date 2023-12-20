// import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom"
import {useDispatch} from 'react-redux'
import {useVerifyEmailMutation} from "../slices/usersApiSlice.js";

import {toast} from "react-toastify";
import Spinner from "./Spinner.jsx";
import React from "react";

const Verify = ()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log(token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [verify,{isLoading}] = useVerifyEmailMutation()

    // useEffect(()=>{
    //     if(userInfo){
    //         navigate('/')
    //     }
    // }, [navigate, userInfo])
    const submitHandler = async (e)=>{
        e.preventDefault()
        try{
            const res = await verify({verificationToken:token}).unwrap()
            toast.success(res.msg)
            navigate('/login')
        }catch (error) {
            toast.error(error?.data?.msg || error.error)
        }
    }
    return(
        <div className="py-5">
             <h1 className="font-bold text-xl text-white text-center mb-4">Syndicat</h1>
                <p className={"text-white p-2"}>Please verify in order to proceed to the login</p>
                <form onSubmit={submitHandler} className="flex flex-column align-items-center justify-center bg-light">
                    <button disabled={isLoading} type="submit"  className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3">
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                Verify
                            </>

                        )}
                    </button>
                </form>
        </div>
    )
}

export default Verify