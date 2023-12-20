import React, {useState} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import apImg from '../assets/app.jpeg'
import Spinner from './Spinner.jsx';
import {useSaveApartmentMutation} from "../slices/apartmentsApiSlice.js";
import {toast} from "react-toastify";
import {useGetAllClientsQuery} from "../slices/clientsApilice.js";
// import {categories} from '../utils/data.js'

const CreateApartment = ({user}) => {
    const [number, setNumber] = useState('')
    const [residence, setResidence] = useState('')
    const [floor, setFloor] = useState('')
    const [building, setBuilding] = useState('')
    const [clientId, setClientId] = useState('')
    const [category, setCategory] = useState(null)
    const navigate = useNavigate()
    const [save,{isLoading}] = useSaveApartmentMutation()
    const { data : clientsData, isLoading :isClientsLoading, isError: isClientsError } = useGetAllClientsQuery();

    const saveApartment = async () => {
        try {
            const res = await save({number, residence, floor, building, client:clientId})
            const {msg} = res.data
            navigate('/')
            toast.success(msg)
        }catch (error){
            toast.error(error?.data?.msg || error.error)
        }
    }
    return (
        <div className={"flex flex-col justify-center items-center mt-5 lg:h-4/5"}>
            <div className={"flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full"}>
                <div className={"bg-secondaryColor p-3 flex flex-0.7 w-full"}>
                    <div className={"flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420"}>
                        {/*{loading && <Spinner/>}*/}
                            <div className={"relative h-full"}>
                                <img src={apImg} alt='uploaded-pic' className={"w-full h-full"} />
                            </div>
                    </div>
                </div>
                <div className={"flex flex-1 flex-col gap-6 lg:pl-6 mt-5 w-full"}>
                    <input
                        type='number'
                        value={number}
                        onChange={(e)=>setNumber(e.target.value)}
                        placeholder={"Add Apartment number here"}
                        className={"outline-none  font-bold border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='text'
                        value={residence}
                        onChange={(e)=>setResidence(e.target.value)}
                        placeholder={"What is your residence name"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='number'
                        value={floor}
                        onChange={(e)=>setFloor(e.target.value)}
                        placeholder={"Add the floor here"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='text'
                        value={building}
                        onChange={(e)=>setBuilding(e.target.value)}
                        placeholder={"Add the building here"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <div className={"flex flex-col"}>
                        <div>
                            <p className={"mb-2 font-semibold text-lg sm:text-xl"}>Choose a pin Category</p>
                            <select
                                name=''
                                id=''
                                onChange={(e)=>setClientId(e.target.value)}
                                className={"outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"}
                            >
                                <option value='other' className={"bg-white"}>Select a client</option>
                                {clientsData?.clients.map((client, index)=>(
                                    <option key={index} className={"outline-none text-base border-0 capitalize bg-white text-black"} value={client._id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={"flex justify-end items-end mt-5"}>
                            <button
                                type={"button"}
                                onClick={saveApartment}
                                className={"bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateApartment