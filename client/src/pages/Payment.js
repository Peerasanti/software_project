import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Payment.css"

function Payment() {
  let { id } = useParams();
  const [listOfBill, setListOfBill] = useState([]);
  
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/bill/findByUser/${id}`).then((response) => {
      if(!response.data) {
        setListOfBill([]);
      } else {
        setListOfBill(response.data);
      }
    });
  }, []);


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
