import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../helper/AuthContext';

function Cart() {

  const [orderList, setOrderList] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/order/findByUser/${authState.id}`, 
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
    ).then((response) => {
      setOrderList(response.data);
    });
  }, []);

  const onDelete = (id) => {
    axios.delete(`http://localhost:3001/order/${id}`, 
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
    ).then(() => {
      setOrderList(orderList.filter((val) => {
        return val.id !== id;
      }));
    });
  }

  return (
    <div className='orderSection'>
      <h1> This is Cart page </h1>
      {orderList.map((order, key) => {
        return (
          <div key={key} className='order'>
            {order.artName}
            {order.artist}
            {order.orderDate}
            {order.price}
            <button onClick={() => {onDelete(order.id)}}> cancel order </button>
            <div>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

export default Cart
