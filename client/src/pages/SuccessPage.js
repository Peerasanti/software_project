import React from 'react'
import { useNavigate } from 'react-router-dom';

function SuccessPage() {

    let navigate = useNavigate();

    const okey = () => {
        console.log("SUCCESS!!!");
        navigate("/");
    }

    return (
        <div>
            <h1> SUCCESS </h1>
            <button onClick={okey}> OKAY </button>
        </div>
    )
}

export default SuccessPage
