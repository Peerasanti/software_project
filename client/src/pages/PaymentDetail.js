import React from 'react';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { Link , useParams } from 'react-router-dom'
import "../css/PaymentDetail.css"


function PaymentDetail() {
  let { id } = useParams();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/order/findByBill/${id}`).then((response) => {
      if(response.data === "No order found for this bill.") {
        setOrderList([]);
      } else {
        setOrderList(response.data);
      }
    });
  }, [id]);


  return (
    <div>
      <h1> This is Payment Detail page </h1>
      {orderList.map((value, key) => {
        return (
          <div key={key} className="order" >
            <div className="artName">ArtName: {value.artName} </div>
            <div className="price">Price: {value.price} </div>
            <div className="artist">Artist: {localStorage.getItem('username')} </div>
            <div className="orderDate">OrderDate: {value.orderDate} </div>
            <Link to={`/artDetail/${value.art.id}`}> Art Detail </Link>
          </div>
        )
      })}
    </div>
  )
}

export default PaymentDetail


