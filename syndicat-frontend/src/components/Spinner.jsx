import React from 'react';
import {Radio} from 'react-loader-spinner'

const Spinner = ({message}) => {
    return (
        <div className={"flex flex-col justify-center items-center w-full h-full"}>
            <Radio
                visible={true}
                height="25"
                width="25"
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClass="radio-wrapper"
                colors={["#f7fafc","#f7fafc","#f7fafc"]}
            />
            <p className={"text-lg text-center px-2"}>{message}</p>
        </div>
    )
}

export default Spinner