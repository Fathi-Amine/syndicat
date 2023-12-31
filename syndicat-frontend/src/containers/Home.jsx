import React,{useState, useEffect, useRef} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';
// import Sidebar from "../components/Sidebar.jsx";
import {Sidebar,UserProfile,Content} from '../components/index.js';
// import Apartments from './Apartments.jsx'
import logo from '../assets/logo.png'
import {useSelector} from "react-redux";
import AuthContainer from "./AuthContainer.jsx";
// import UserProfile from "../components/UserProfile.jsx";
import Apartments from "./Apartments.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState(null);
    const scrollRef = useRef(null);
    const {userInfo} = useSelector((state)=>state.auth)

    // useEffect(()=>{
    //     const query = userQuery(userInfo.sub);
    //     client.fetch(query)
    //         .then((data)=>{
    //             setUser(data[0])
    //         })
    // }, [])
    //
    useEffect(()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 0);
        }
    }, [scrollRef.current])
    return (
        <>
            {userInfo ? (
                <div className={"flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out"}>
                    <div className={"hidden md:flex h-screen flex-initial"}>
                        <Sidebar user={userInfo && userInfo}/>

                    </div>
                    <div className={"flex md:hidden flex-row"}>
                        <div className={"p-2 w-full flex flex-row justify-between items-center shadow-md"}>
                            <HiMenu fontSize={40} className={"cursor-pointer"} onClick={()=> setToggleSidebar(true)} />
                            <Link to={"/"}>
                                <img src={logo} alt={'logo'} className={"w-28 h-28"}/>
                            </Link>
                            <Link to={`user-profile/${userInfo.name}`}>
                                {userInfo?.name}

                            </Link>
                        </div>
                    </div>
                    {toggleSidebar && (
                        <div className={"fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in"}>
                            <div className={"absolute w-full flex justify-end items-center p-2"}>
                                <AiFillCloseCircle fontSize={30} className={"cursor-pointer"} onClick={()=> setToggleSidebar(false)}/>
                            </div>
                            <Sidebar closeToggle={setToggleSidebar}/>
                        </div>
                    )}
                    <div className={"pb-2 flex-1 h-screen overflow-y-scroll" } ref={scrollRef}>
                        <Routes>
                            <Route path={"/user-profile/:userId"} element={<UserProfile />}/>
                            <Route path={"/*"} element={<Apartments user={user && userInfo}/>}/>
                        </Routes>
                    </div>
                </div>
            ) : (
                <AuthContainer />
            )}
        </>
    );
};

export default Home;