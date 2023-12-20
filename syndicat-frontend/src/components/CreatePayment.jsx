import React, {useState} from 'react';
import pdp from "../assets/foto.jpg";
import {useNavigate} from "react-router-dom";
import {useGetAllClientsQuery, useSaveClientMutation} from "../slices/clientsApilice.js";
import {toast} from "react-toastify";
import {useSaveInvoiceMutation} from "../slices/InvoiceApiSlice.js";
import {useGetAllApartmentsQuery} from "../slices/apartmentsApiSlice.js";

const CreatePayment = () => {
    const [id, setId] = useState('')
    const [month, setMonth] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [amount, setAmount] = useState('');
    const [isPaid, setIsPaid] = useState('');
    const [apartmentId, setApartmentId] = useState('');
    const [clientId, setClientId] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const navigate = useNavigate()
    const [savePayment,{isLoading}] = useSaveInvoiceMutation()
    const { data:apartmentData, isLoading: isApartmentsData, isError: isApartmentsError } = useGetAllApartmentsQuery();
    const { data : clientsData, isLoading :isClientsLoading, isError: isClientsError } = useGetAllClientsQuery();

    const saveInvoice = async () => {
        try {
            const res = await savePayment({month,paymentDate,amount,isPaid,apartment:apartmentId,client:clientId})
            const {msg} = res.data
            console.log(res)
            navigate('/category/Payments')
            toast.success(msg)
        }catch (error){
            toast.error(error?.data?.msg || error.error)
        }
    }
    return (
        <div className={"flex flex-col justify-center items-center mt-5 lg:h-4/5"}>
            <div className={"flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full"}>
                <div className={"flex flex-1 flex-col gap-6 lg:pl-6 mt-5 w-full"}>
                    <input
                        type='Date'
                        value={month}
                        onChange={(e)=>setMonth(e.target.value)}
                        placeholder={"Add the due month"}
                        className={"outline-none  font-bold border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='Date'
                        value={paymentDate}
                        onChange={(e)=>setPaymentDate(e.target.value)}
                        placeholder={"What is the client's last name"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='number'
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        placeholder={"Add the amount to pay here"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <select
                        name=''
                        id=''
                        onChange={(e)=>setClientId(e.target.value)}
                        className={"outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"}
                    >
                        <option value='other' className={"bg-white"}>Select a client</option>
                        {/*<option value={client} className={"bg-white"}>Select category</option>*/}
                        {clientsData?.clients.map((client, index)=>(
                            <option key={index} className={"outline-none text-base border-0 capitalize bg-white text-black"} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                    <select
                        name=''
                        id=''
                        onChange={(e)=>setApartmentId(e.target.value)}
                        className={"outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"}
                    >
                        <option value='' className={"bg-white"}>Select an apartment</option>
                        {/*<option value={client} className={"bg-white"}>Select category</option>*/}
                        {apartmentData?.map((ap, index)=>(
                            <option key={index} className={"outline-none text-base border-0 capitalize bg-white text-black"} value={ap._id}>
                                Address: {ap.number} {ap.floor} {ap.building} {ap.residence} ({ap.client.name})
                            </option>
                        ))}
                    </select>
                    <select
                        name=""
                        id=""
                        onChange={(e) => setIsPaid(JSON.parse(e.target.value))}
                        className={"outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"}
                    >
                        <option value='' className={"bg-white"}>Is the invoice paid ?</option>
                        <option value={"true"}>
                            Paid
                        </option>
                        <option value={"false"}>
                            NotPaid
                        </option>
                    </select>
                    <div className={"flex flex-col"}>
                        <div className={"flex justify-end items-end mt-5"}>
                            <button
                                type={"button"}
                                onClick={saveInvoice}
                                className={"bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePayment;