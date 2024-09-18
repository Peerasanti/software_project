import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/order/findByUser', 
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
    ).then((response) => {
      if(!response.data) {
        setOrderList([]);
      } else {
        setOrderList(response.data);
      }
    });
  });

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
      {orderList.map((order, key) => {
        return (
          <div key={key} className='order'>
            {key} 
            {order.artName}
            {order.artist}
            {order.orderDate}
            {order.price}
            <button onClick={() => {onDelete(order.id)}}> cancel order </button>
          </div>
        )
      })
      }
    </div>
  )
}

export default Cart
