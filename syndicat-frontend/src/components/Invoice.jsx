import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { FaRegEdit } from "react-icons/fa";
import {useDeleteInvoiceMutation} from "../slices/InvoiceApiSlice.js";
import {toast} from "react-toastify";
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logo.png'


const Invoice = ({invoice}) => {
    const [postHovered,setPostHovered] = useState(false)
    const navigate = useNavigate()
    const [deleteInvoice, {isLoading}] = useDeleteInvoiceMutation();

    const handleSubmit = async(id) => {
        // e.stopPropagation()
        // e.preventDefault()
        try {
            console.log("entered")
            console.log(id)
            const res = await deleteInvoice({_id:id}).unwrap()
            console.log(res)
            const {msg} = res
            toast.success(msg)
        }catch (error){
            toast.error(error?.data?.msg || error.error)
        }
    }
    const {
        _id,
        client: { name: clientName, email:clientEmail, },
        apartment:{number:apartmentNumber, building:buildingName, floor:floorNumber, residence:residenceName},
        month,
        amount,
        paymentDate,
        isPaid,
        createdBy:{email:userEmail, username: syndicatName}
    } = invoice;
    const formattedPaymentDate = format(new Date(paymentDate), 'dd MMM yyyy');
    const formattedMonth = format(new Date(month), 'dd MMM yyyy');

    const handlePrint = (currentInvoice) => {
        const pdf = new jsPDF();
        const currentformattedPaymentDate = format(new Date(currentInvoice.paymentDate), 'dd MMM yyyy');
        const currentformattedMonth = format(new Date(currentInvoice.month), 'dd MMM yyyy');
        // Logo
        const imgData = logo; // Replace with your actual logo image data
        pdf.addImage(imgData, 'PNG', 15, 10, 30, 30); // Adjust coordinates and size

        // Invoice Details
        pdf.setFont('helvetica');
        pdf.setFontSize(12);
        pdf.text('Invoice Details', 70, 25);

        // Client Details
        pdf.setFontSize(10);
        pdf.text(`Client Name: ${currentInvoice.client.name}`, 70, 40);
        pdf.text(`Email: ${currentInvoice.client.email}`, 70, 50);

        // Invoice Content
        const columns = ['N°', 'building', 'floor','residence','paymentDate', 'Total'];
        const rows = [
            [`${currentInvoice.apartment.number}`, `${currentInvoice.apartment.building}`, `${currentInvoice.apartment.floor}`, `${currentInvoice.apartment.residence}`,`${currentformattedPaymentDate}`,`${currentInvoice.amount}`],
        ];

        const options = {
            startY: 70,
        };

        pdf.autoTable(columns, rows, options);

        pdf.text(`Total Amount: $${currentInvoice.amount}`, 140, 160);
        pdf.save(`${currentInvoice.client.name}-invoice.pdf`);
    };
    return (
        <div className={"m-2 "}>
            <div className="bg-white h-340 w-60 max-w-2xl shadow  overflow-y-scroll hide-scrollbar sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {syndicatName}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {userEmail}
                    </p>
                    <div className={"flex items-center justify-between"}>
                        <div >
                            <div className={"text-white p-2 pl-0 pr-4 rounded-lg"}>

                                <div className={"flex justify-between items-center w-full gap-2"}>
                                    <Link
                                        to={"/create-payment"}
                                        className={"bg-blue-600 flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"}
                                    >
                                        <BsFillArrowUpRightCircleFill color={"#FFF"}/>
                                    </Link>
                                    <button
                                        type={'button'}
                                        onClick={(e)=>(
                                            e.stopPropagation(),
                                                navigate(`/update-payment/${_id}`)
                                        )}
                                        className={
                                            'bg-green-600 p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none'
                                        }
                                    >
                                        <FaRegEdit color={'#fff'} />
                                    </button>
                                    <button
                                        type={'button'}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubmit(_id);
                                        }}
                                        className={
                                            'bg-red-600 p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none'
                                        }
                                    >
                                        <AiTwotoneDelete color={'#fff'} />
                                    </button>
                                    <button
                                        // download
                                        onClick={(e)=> {e.stopPropagation(); handlePrint(invoice)}}
                                        className={"bg-black w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"}
                                    >
                                        <MdDownloadForOffline/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div
                            className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {clientName}
                            </dd>
                        </div>
                        <div
                            className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {apartmentNumber} - {floorNumber} - {buildingName} - {residenceName}
                            </dd>
                        </div>
                        <div
                            className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {clientEmail}
                            </dd>
                        </div>
                        <div
                            className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Month
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formattedMonth}
                            </dd>
                        </div>
                        <div
                            className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Amount
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {amount}
                            </dd>
                        </div>
                        <div
                            className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Payment date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formattedPaymentDate} <span>{isPaid}</span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div
                className={'relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'}
                onMouseEnter={()=> setPostHovered(true)}
                onMouseLeave={()=> setPostHovered(false)}
                onClick={()=> navigate(`/apartment-detail/${_id}`)}
            >
                    <div
                        className={"absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 aspect-w-3 aspect-h-4"}
                        style={{height:"100%"}}
                    >
                        <div className={"flex items-center justify-between"}>
                            <div >
                                <div className={"text-white bg-black p-2 pl-4 pr-4 bg-opacity-70 rounded-lg"}>

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
            </div>
            {/*<Link to={`user-profile/${postedBy?._id}`} className={"flex gap-2 mt-2 items-center"}>*/}
            {/*    <img src={postedBy?.image} alt='user-profile' className={"w-8 h-8 rounded-full object-cover"}/>*/}
            {/*    <p className={"font-semibold capitalize"}>{postedBy?.userName}</p>*/}
            {/*</Link>*/}
        </div>
    )
}

export default Invoice