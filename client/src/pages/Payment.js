import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/Payment.css"

function Payment() {
  // let { id } = useParams();
  const [listOfBill, setListOfBill] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/bill/findByUser/${localStorage.getItem('userId')}`).then((response) => {
      if(response.data === "No bill found for this user.") {
        setListOfBill([]);
      } else {
        setListOfBill(response.data);
        console.log(response.data);
      }
    });
  }, [localStorage.getItem('userId')]);


  console.log(listOfBill);
  return (
    <div>
      <h1> This is Payment page </h1>
      {listOfBill.map((value, key) => {
        return (
          <div key={key} className="bill" >
            <div className="price">Price: {value.totalPrice} </div>
            <div className="item">Item: {value.totalArt} </div>
            <Link to={`/detail/${value.id}`}> Payment Detail </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Payment
