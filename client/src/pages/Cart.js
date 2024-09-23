import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../helper/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../css/Cart.css"

function Cart() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/order/findByUser/${authState.id}`, {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        });
        setOrderList(response.data);
      } catch (err) {
        setError('Error fetching orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authState.id]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/order/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      });
      setOrderList(orderList.filter((val) => val.id !== id));
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Error deleting order. Please try again.');
    }
  };

  const pay = async () => {
    let allPrice = orderList.reduce((total, order) => total + order.price, 0);

    try {
      const response = await axios.post('http://localhost:3001/bill', {
        totalArt: orderList.length,
        totalPrice: allPrice,
      }, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      });

      const billIdReference = response.data.id;
      const putRequests = orderList.map(order => {
        return axios.put(`http://localhost:3001/order/update/${order.id}`, {
          billIdReference: billIdReference,
          status: true,
        }, {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        });
      });

      await Promise.all(putRequests);
      console.log('Payment completed successfully!');
      navigate('/payment');
    } catch (error) {
      console.error('Error during payment process:', error);
      setError('Error completing payment. Please try again.');
    }
  };

  return (
    <div className='orderSection'>
      <h1>This is Cart page</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orderList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        orderList.map((order, key) => (
          <div key={key} className='order'>
            <div>{order.artName}</div>
            <div>{order.artist}</div>
            <div>{order.orderDate}</div>
            <div>{order.price} บาท</div>
            <button onClick={() => onDelete(order.id)}>Cancel Order</button>
          </div>
        ))
      )}
      {orderList.length > 0 && <button onClick={pay}>Pay</button>}
    </div>
  );
}

export default Cart;
