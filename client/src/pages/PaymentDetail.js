import React from 'react';
import { useEffect, useState, useContext  } from 'react';
import axios from 'axios';
import { useNavigate , Link , useParams } from 'react-router-dom'


function PaymentDetail() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/order/findByBill/${id}`).then((response) => {
      if(!response.data) {
        setOrderList([]);
      } else {
        setOrderList(response.data);
      }
    });
  }, []);

  return (
    <div>
      <h1> This is PaymentDetail page </h1>
      {orderList.map((value, key) => {
        return (
          <div key={key} className="order" >
            <div className="artName">ArtName: {value.artName} </div>
            <div className="price">Price: {value.price} </div>
            <div className="artist">Artist: {value.artist} </div>
            <div className="orderDate">OrderDate: {value.orderDate} </div>
            <Link to={`/artDetail/${value.ArtId}`}> Art Detail </Link>
            
          </div>
        )
      })}
    </div>
  )
}

export default PaymentDetail


