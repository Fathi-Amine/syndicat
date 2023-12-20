import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
// import {client} from '../client.js';
import Spinner from './Spinner'
// import {feedQuery, searchQuery} from '../utils/data.js'
import {useGetAllApartmentsQuery} from "../slices/apartmentsApiSlice.js";
import {useDispatch} from "react-redux";
import MasonryLayout from "./MasonryLayout.jsx";
import {useGetAllClientsQuery} from "../slices/clientsApilice.js";
import {useGetAllInvoicesQuery} from "../slices/InvoiceApiSlice.js";

const Content = () => {
    const [loading, setLoading] = useState(false)
    const [contents, setContents] = useState([])
    const [clientContent, setClientContent] = useState(false)
    const [paymentContent, setPaymentContent] = useState(false)
    const [apartmentContent, setApartmentContent] = useState(false)
    const {categoryId} = useParams()
    const dispatch = useDispatch()
    const { data, isLoading, isError } = useGetAllApartmentsQuery();
    const { data : clientsData, isLoading :isClientsLoading, isError: isClientsError } = useGetAllClientsQuery();
    const {data: paymentData, isLoading: isPaymentsLoading, isError: isPaymentError} = useGetAllInvoicesQuery()
    // console.log(clientsData)
    useEffect(()=>{

        if(categoryId === 'Clients'){
            console.log(clientsData)
            setContents(clientsData?.clients)
            setClientContent(true)
            setApartmentContent(false)
            console.log("there is no filter yet")
        }else if(categoryId === 'Payments'){
            setContents(paymentData)
            setClientContent(false)
            setApartmentContent(false)
            setPaymentContent(true)
        } else{
            console.log(data)
            setContents(data)
            setClientContent(false)
            setPaymentContent(false)
            setApartmentContent(true)
        }
    },[categoryId, data,clientsData,paymentData])
    if (isLoading) return <Spinner message="We are adding new ideas to your feed"/>

    return (
        <div>
            {contents && <MasonryLayout contents={contents} client={clientContent} apartment={apartmentContent} invoice={paymentContent}/>}
        </div>
    )
}

export default Content