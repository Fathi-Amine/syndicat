import React from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {IoMdAdd, IoMdSearch} from 'react-icons/io'
import { HiOutlineUserAdd } from "react-icons/hi";
import {clearCredentials} from "../slices/authSlice.js";
import {useLogoutMutation} from "../slices/usersApiSlice.js";
import {useDispatch} from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";

const NavBar = ({searchTerm, setSearchTerm,user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [logout] = useLogoutMutation()


    const logoutHandler = async ()=>{
        try {
            await logout().unwrap()
            dispatch(clearCredentials())
            navigate('/')
        }catch (error) {
            console.log(error)
        }
    }
    // if(!user) return null
    return (
        <div className={"flex gap-2 md:gap-5 w-full mt-5 pb-7"}>
            <div className={"flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm"}>
                <IoMdSearch fontSize={21} className={"ml-1"}/>
                <input
                    type='text'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    placeholder={"Search"}
                    value={searchTerm}
                    onFocus={()=>navigate("/search")}
                    className={"p-2 w-full bg-white outline-none"}
                />
            </div>
            <div className={"flex gap-3"}>
                <Link to={`user-profile/${user?._id}`} className={"hidden md:block"}>
                    {/*<img src={user.image} alt='user-image' className={"w-14 h-12 rounded-lg"} rel={"no-referrer"}/>*/}
                </Link>
                <Link to={'create-pin'} className={"bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"}>
                    <IoMdAdd/>
                </Link>
                <Link to={'create-client'} className={"bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"}>
                    <HiOutlineUserAdd/>
                </Link>
                <button onClick={logoutHandler} className={"bg-red-600 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"}>
                    <AiOutlineLogout/>
                </button>
            </div>
        </div>
    )
}

export default NavBar