import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import pdp from '../assets/foto.jpg'
import Spinner from './Spinner.jsx';
import {useSaveClientMutation} from "../slices/clientsApilice.js";
import {toast} from "react-toastify";


const CreateClient= () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [saveClientInfo,{isLoading}] = useSaveClientMutation()

    const saveClient = async () => {
        try {
            const res = await saveClientInfo({firstName,lastName,email})
            const {msg} = res.data
            console.log(res)
            navigate('/category/clients')
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
                            <img src={pdp} alt='uploaded-pic' className={"w-full h-full"} />
                        </div>
                    </div>
                </div>
                <div className={"flex flex-1 flex-col gap-6 lg:pl-6 mt-5 w-full"}>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        placeholder={"Add your client here"}
                        className={"outline-none  font-bold border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        placeholder={"What is the client's last name"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder={"Add the email here"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <div className={"flex flex-col"}>
                        <div className={"flex justify-end items-end mt-5"}>
                            <button
                                type={"button"}
                                onClick={saveClient}
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

export default CreateClient