import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
// import {client, urlFor} from '../client.js'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import pp from '../assets/foto.jpg'
import {useDeleteClientMutation} from "../slices/clientsApilice.js";
import {toast} from "react-toastify";
// import {fetchUser} from '../utils/fetchUser.js'

const Apartment = ({client}) => {
    const [postHovered,setPostHovered] = useState(false)
    const navigate = useNavigate()
    const [deleteClient, {isLoading}] = useDeleteClientMutation();

    const handleSubmit = async(sub) => {
        try {
            const res = await deleteClient({_sub:sub}).unwrap()
            const {msg} = res
            toast.success(msg)
        }catch (error){
            toast.error(error?.data?.msg || error.error)
        }
    }
    const {
        _sub,
        name,
        email
    } = client;
    return (
        <div className={"m-2 "}>
            <div
                className={'relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'}
                onMouseEnter={()=> setPostHovered(true)}
                onMouseLeave={()=> setPostHovered(false)}
                onClick={()=> navigate(`/client-detail/${_sub}`)}
            >

                <img src={pp} className={"rounded-lg w-full"} alt={"user-post"}/>

                {postHovered &&(
                    <div
                        className={"absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 aspect-w-3 aspect-h-4"}
                        style={{height:"100%"}}
                    >
                        <div className={"flex items-center justify-between"}>
                            {/*<span*/}
                            {/*    className={"bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"}*/}
                            {/*>*/}

                            {/*</span>*/}
                            <div >
                                <div className={"text-white bg-black p-2 pl-4 pr-4 bg-opacity-70 rounded-lg"}>
                                    <span className={"block"}> <FaUser />{name}</span>
                                    <span>{email}</span>
                                    <div className={"flex justify-between items-center w-full gap-2"}>
                                        <a
                                            href={"#"}
                                            target={'_blank'}
                                            rel={'noreferrer'}
                                            className={"bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"}
                                        >
                                            <BsFillArrowUpRightCircleFill/>
                                        </a>
                                        <button
                                            type={'button'}
                                            onClick={(e)=>(
                                                e.stopPropagation(),
                                                navigate(`/update-client/${_sub}`)
                                            )}
                                            className={
                                                'bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none'
                                            }
                                        >
                                            <LiaUserEditSolid color={'#000'} />
                                        </button>
                                        <button
                                            type={'button'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSubmit(_sub);
                                            }}
                                            className={
                                                'bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none'
                                            }
                                        >
                                            <AiTwotoneDelete color={'#000'} />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Apartment