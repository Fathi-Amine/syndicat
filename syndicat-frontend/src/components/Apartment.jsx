import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { MdPlace } from "react-icons/md";
// import {client, urlFor} from '../client.js'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import appImg from '../assets/app.jpeg'
import {useDeleteApartmentMutation} from "../slices/apartmentsApiSlice.js";
import {toast} from "react-toastify";
// import {fetchUser} from '../utils/fetchUser.js'

const Apartment = ({apartment}) => {
    const [postHovered,setPostHovered] = useState(false)
    const navigate = useNavigate()
    const [deleteApartment, {isLoading}] = useDeleteApartmentMutation();

    const handleSubmit = async(id) => {
        // e.stopPropagation()
        // e.preventDefault()
        try {
            console.log("entered")
            console.log(id)
            const res = await deleteApartment({_id:id}).unwrap()
            console.log(res)
            const {msg} = res
            toast.success(msg)
        }catch (error){
            toast.error(error?.data?.msg || error.error)
        }
    }
    const {
        _id,
        client: { name: clientName },
        residence,
        building,
        floor,
        number
    } = apartment;
    return (
        <div className={"m-2 "}>
            <div
                className={'relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'}
                onMouseEnter={()=> setPostHovered(true)}
                onMouseLeave={()=> setPostHovered(false)}
                onClick={()=> navigate(`/apartment-detail/${_id}`)}
            >

                <img src={appImg} className={"rounded-lg w-full"} alt={"user-post"}/>

                {postHovered &&(
                    <div
                        className={"absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 aspect-w-3 aspect-h-4"}
                        style={{height:"100%"}}
                    >
                        <div className={"flex items-center justify-between"}>
                            <div >
                                <div className={"text-white bg-black p-2 pl-4 pr-4 bg-opacity-70 rounded-lg"}>
                                    <span className={"ml-2"}> <MdPlace />{clientName}</span> - <span>{residence}, {building}, Floor {floor}, Apartment {number}</span>
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
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleSubmit(_id);
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
            {/*<Link to={`user-profile/${postedBy?._id}`} className={"flex gap-2 mt-2 items-center"}>*/}
            {/*    <img src={postedBy?.image} alt='user-profile' className={"w-8 h-8 rounded-full object-cover"}/>*/}
            {/*    <p className={"font-semibold capitalize"}>{postedBy?.userName}</p>*/}
            {/*</Link>*/}
        </div>
    )
}

export default Apartment