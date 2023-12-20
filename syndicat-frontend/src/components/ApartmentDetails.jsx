import React,{useState, useEffect} from 'react';
import {MdDownloadForOffline} from 'react-icons/md';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
// import {client, urlFor} from '../client.js';
import MasonryLayout from './MasonryLayout.jsx';
import appImg from '../assets/app.jpeg'
import Spinner from './Spinner.jsx'
import {useGetApartmentDetailsQuery} from "../slices/apartmentsApiSlice.js";
import {useDispatch} from "react-redux";
import {updateApartmentDetails} from "../slices/apartmentSlice.js";

const ApartmentDetail = ({user}) => {
    const [pins, setPins] = useState(null)
    const [apartmentDetails, setApartmentDetails] = useState(null)
    const {pinId} = useParams()
    const {data, isLoading} = useGetApartmentDetailsQuery(pinId)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleUpdateClick = () => {
        navigate('/update-apartment');
    };

    useEffect(()=>{
        if (data) {
            console.log(data)
            setApartmentDetails(data);
            dispatch(updateApartmentDetails(data));
        }
    },[pinId,data])

    // if(!isLoading) return <Spinner message={"Loading pin ..."}/>
    return (
        <>
            <div className={"flex xl:flex-row flex-col m-auto bg-white"} style={{ maxWidth:'1500px', borderRadius:'32px'}}>
                <div className={"flex justify-center items-center md:items-start flex-initial"}>
                    <img src={appImg} alt='pin-Image' className={"rounded-t-3xl rounded-b-lg"} />
                </div>
                <div className={"w-full p-5 flex-1 xl:min-w-620"}>
                    <div className={"flex items-center justify-between"}>
                        <a
                            href={"#"}
                            target={"_blank"}
                        >{apartmentDetails?.building}
                        </a>
                    </div>
                    <div>
                        <h1 className={"text-4xl font-bold break-words mt-3"}>{apartmentDetails?.residence}</h1>
                        <p className={"mt-3"}>{apartmentDetails?.client.name}</p>
                    </div>

                    <div className={"flex flex-wrap mt-6 gap-3"}>
                        <button
                            type={"button"}
                            className={"bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"}
                            onClick={handleUpdateClick}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
            {/*{*/}

            {/*    pins?.length > 0 ? (*/}
            {/*        <>*/}
            {/*            <h2 className={"text-center font-bold text-2xl mt-8 mb-4"}>*/}
            {/*                More like this*/}
            {/*            </h2>*/}
            {/*            <MasonryLayout pins={pins}/>*/}
            {/*        </>*/}
            {/*    ):(*/}
            {/*        <Spinner message={"Loading"}/>*/}
            {/*    )*/}
            {/*}*/}
        </>
    )
}

export default ApartmentDetail