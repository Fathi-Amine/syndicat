import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useUpdateClientMutation, useGetClientDetailsQuery} from "../slices/clientsApilice.js";
import {toast} from "react-toastify";
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import ppi from '../assets/foto.jpg'
import Spinner from './Spinner.jsx';
import {useSelector} from "react-redux";
// import {categories} from '../utils/data.js'

const UpdateClient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const { clientSub } = useParams();
    const { data, isLoading, isError } = useGetClientDetailsQuery(clientSub);
    const navigate = useNavigate();
    const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();

    useEffect(() => {
        if (data) {
            const { firstName, lastName, email } = data;
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
        }
    }, [data]);
    const updateClientInfo = async () => {
        try {
            setIsLoadingUpdate(true);
            const res = await updateClient({
                _sub:clientSub,
                firstName,
                lastName,
                email
            });
            const { msg } = res.data;
            navigate('/category/clients')
            toast.success(msg);
            setIsLoadingUpdate(false);
        } catch (error) {
            toast.error(error?.data?.msg || error.error);
            setIsLoadingUpdate(false);
        }
    };
    return (
        <div className={"flex flex-col justify-center items-center mt-5 lg:h-4/5"}>
            <div className={"flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full"}>
                <div className={"bg-secondaryColor p-3 flex flex-0.7 w-full"}>
                    <div className={"flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420"}>
                        {/*{loading && <Spinner/>}*/}
                        <div className={"relative h-full"}>
                            <img src={ppi} alt='uploaded-pic' className={"w-full h-full"} />
                        </div>
                    </div>
                </div>
                <div className={"flex flex-1 flex-col gap-6 lg:pl-6 mt-5 w-full"}>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        placeholder={"Update the first name here"}
                        className={"outline-none  font-bold border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        placeholder={"What is the client's name"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder={"Update the email here"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <div className={"flex flex-col"}>
                        <div className={"flex justify-end items-end mt-5"}>
                            <button
                                type={"button"}
                                onClick={updateClientInfo}
                                className={"bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateClient