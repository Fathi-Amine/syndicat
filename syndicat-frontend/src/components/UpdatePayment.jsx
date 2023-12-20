import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetAllClientsQuery, useGetClientDetailsQuery, useUpdateClientMutation} from "../slices/clientsApilice.js";
import {toast} from "react-toastify";
import ppi from "../assets/foto.jpg";
import {useGetInvoiceDetailsQuery, useUpdateInvoiceMutation} from "../slices/InvoiceApiSlice.js";
import {format} from "date-fns";
import {useGetAllApartmentsQuery} from "../slices/apartmentsApiSlice.js";

const UpdatePayment = () => {
    const [id, setId] = useState('')
    const [month, setMonth] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [amount, setAmount] = useState('');
    const [isPaid, setIsPaid] = useState('');
    const [apartment, setApartment] = useState({});
    const [paymentClient, setPaymentClient] = useState({});
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const { paymentId } = useParams();
    const { data, isLoading, isError } = useGetInvoiceDetailsQuery(paymentId);
    const { data:apartmentData, isLoading: isApartmentsData, isError: isApartmentsError } = useGetAllApartmentsQuery();
    const { data : clientsData, isLoading :isClientsLoading, isError: isClientsError } = useGetAllClientsQuery();
    const navigate = useNavigate();
    const [updateInvoice, { isLoading: isUpdating }] = useUpdateInvoiceMutation();

    useEffect(() => {
        if (data) {
            const { _id, amount, month, paymentDate,isPaid,apartment,client } = data;
            const formattedPaymentDate = format(new Date(paymentDate), 'yyyy-MM-dd');
            const formattedMonth = format(new Date(month), 'yyyy-MM-dd');
            console.log(client.email)
            setId(_id)
            setMonth(formattedMonth)
            setPaymentDate(formattedPaymentDate)
            setAmount(amount)
            setPaymentClient(client)
            setApartment(apartment)
            setIsPaid(isPaid)
            // setEmail(email);
            console.log(data)
        }
    }, [data]);
    const updateInvoiceInfo = async () => {
        try {
            setIsLoadingUpdate(true);
            const res = await updateInvoice({
                _id:id,
                amount,
                month,
                paymentDate,
                client:paymentClient,
                apartment,
                isPaid
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
    console.log(isPaid)
    return (
        <div className={"flex flex-col justify-center items-center mt-5 lg:h-4/5"}>
            <div className={"flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full"}>
                <div className={"flex flex-1 flex-col gap-6 lg:pl-6 mt-5 w-full"}>
                    <input
                        type='Date'
                        value={month}
                        onChange={(e)=>setMonth(e.target.value)}
                        placeholder={"Update the first name here"}
                        className={"outline-none  font-bold border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='Date'
                        value={paymentDate}
                        onChange={(e)=>setPaymentDate(e.target.value)}
                        placeholder={"What is the client's name"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <input
                        type='text'
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        placeholder={"Update the email here"}
                        className={"outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"}
                    />
                    <select
                        name=''
                        id=''
                        onChange={(e)=>setPaymentClient(e.target.value)}
                        className={"outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"}
                    >
                        <option value='other' className={"bg-white"}>Select a client</option>
                        {/*<option value={client} className={"bg-white"}>Select category</option>*/}
                        {clientsData?.clients.map((client, index)=>(
                            <option key={index} className={"outline-none text-base border-0 capitalize bg-white text-black"} value={client._id} selected={client._id === paymentClient._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                    <select
                        name=''
                        id=''
                        onChange={(e)=>setApartment(e.target.value)}
                        className={"outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"}
                    >
                        <option value='other' className={"bg-white"}>Select an apartment</option>
                        {/*<option value={client} className={"bg-white"}>Select category</option>*/}
                        {apartmentData?.map((ap, index)=>(
                            <option key={index} className={"outline-none text-base border-0 capitalize bg-white text-black"} value={ap._id} selected={ap._id === apartment._id}>
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
                        <option value={"true"} selected={isPaid.toString() === "true"}>
                            Paid
                        </option>
                        <option value={"false"} selected={isPaid.toString() === "false"}>
                            NotPaid
                        </option>
                    </select>
                    <div className={"flex flex-col"}>
                        <div className={"flex justify-end items-end mt-5"}>
                            <button
                                type={"button"}
                                onClick={updateInvoiceInfo}
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
};

export default UpdatePayment;