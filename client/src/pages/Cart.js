import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../helper/AuthContext';
import { useNavigate } from 'react-router-dom'

function Cart() {

  let navigate = useNavigate();

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
  }, [authState.id]);

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

  const pay = async () => {
    let allPrice = 0;
    for (let i = 0; i < orderList.length; i++) {
      allPrice += orderList[i].price;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/bill', 
        { 
          totalArt: orderList.length,
          totalPrice: allPrice
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        }
      );
  
      const billId = response.data.id;
      const putRequests = orderList.map(order => {
        return axios.put(`http://localhost:3001/order/update/${order.id}`, 
          { 
            BillId: billId,
            status: true
          },
          {
            headers: {
              accessToken: localStorage.getItem('accessToken'),
            },
          }
            
        );

      });

      await Promise.all(putRequests);

      console.log(response.data.id);
      
      
      console.log('Payment completed successfully!');
      navigate('/payment');
  
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

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
      <button onClick={pay}> Pay </button>
    </div>
  )
}

export default Cart
