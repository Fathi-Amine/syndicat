import React,{useState} from 'react'
import {Routes, Route} from 'react-router-dom';
import {NavBar, Content, ApartmentDetails, CreateApartment, UpdateApartment, UpdateClient} from '../components/index.js'
import CreateClient from "../components/CreateClient.jsx";
import UpdatePayment from "../components/UpdatePayment.jsx";
import CreatePayment from "../components/CreatePayment.jsx";
// ,CreatePin,Search
const Apartments = ({user}) => {
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <div className={"px-2 md:px-5"}>
            <div className={"bg-gray-50"}>
                <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
            </div>
            <div className={"h-full"}>
                <Routes>
                    <Route path={"/"} element={<Content/>}/>
                    <Route path={"/create-pin"} element={<CreateApartment user={user}/>}/>
                    <Route path={"/create-client"} element={<CreateClient />}/>
                    <Route path={"/create-payment"} element={<CreatePayment />}/>
                    <Route path={"/update-apartment"} element={<UpdateApartment />}/>
                    <Route path={"/category/:categoryId"} element={<Content/>}/>
                    <Route path={"/apartment-detail/:pinId"} element={<ApartmentDetails user={user}/>}/>
                    <Route path={"/update-client/:clientSub"} element={<UpdateClient/>}/>
                    <Route path={"/update-payment/:paymentId"} element={<UpdatePayment/>}/>
                    {/*<Route path={"/search"} element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>*/}
                </Routes>
            </div>
        </div>
    )
}

export default Apartments