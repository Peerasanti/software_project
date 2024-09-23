import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/SuccessPage.css"

function SuccessPage() {

    let navigate = useNavigate();

    const okey = () => {
        console.log("SUCCESS!!!");
        navigate("/");
    }

    return (
        <div className="successPageContainer">
        <h1> SUCCESS </h1>
        <button onClick={okey}> OKAY </button>
    </div>
    )
}

export default SuccessPage
