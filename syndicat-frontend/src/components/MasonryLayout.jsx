import React from 'react'
import Masonry from 'react-masonry-css'
import Apartment from './Apartment.jsx'
import Client from "./Client.jsx";
import Invoice from "./Invoice.jsx";

const breakpointObj = {
    default:2,
    3000:6,
    2000:5,
    1400:4,
    1200:3,
    1000:2,
    500:1
}
const MasonryLayout = ({contents,client,apartment, invoice}) => {
    return (
        <div>
            {/*{ apartment ? (*/}
            {/*    <Masonry className={"flex animate-slide-fwd"} breakpointCols={breakpointObj}>*/}
            {/*        {contents?.map((item)=>(<Apartment key={item?._id} apartment={item} className={"w-max"}/>))}*/}
            {/*    </Masonry>*/}
            {/*) : (*/}
            {/*    <Masonry className={"flex animate-slide-fwd"} breakpointCols={breakpointObj}>*/}
            {/*        {contents?.map((item)=>(<Client key={item?._id} client={item} className={"w-max"}/>))}*/}
            {/*    </Masonry>*/}
            {/*    )*/}
            {/*}*/}
            <Masonry className={'flex animate-slide-fwd'} breakpointCols={breakpointObj}>
                {apartment && contents?.map((item) => <Apartment key={item?._id} apartment={item} className={'w-max'} />)}

                {invoice && contents?.map((item)=> <Invoice key={item?._id} invoice={item} className={'w-max'} />)}

                {client && contents?.map((item) => <Client key={item?._id} client={item} className={'w-max'} />)}
            </Masonry>
        </div>
    )
}

export default MasonryLayout