import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Cart.css"

function Cart() {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/order/findByStatus/${localStorage.getItem('userId')}`);
        if(response.data === "No order found for this status.") {
          setOrderList([]);
        } else {
          setOrderList(response.data);
          console.log(response.data);
        }
      } catch (err) {
        setError('Error fetching orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [localStorage.getItem('userId')]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/order/delete/${id}`);
      setOrderList(orderList.filter((val) => val.id !== id));
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Error deleting order. Please try again.');
    }
  };

  const pay = async () => {
    let allPrice = orderList.reduce((total, order) => total + order.price, 0);
    console.log("localStorage",localStorage.getItem('userId'));
    // const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(`http://localhost:3001/bill/${localStorage.getItem('userId')}`, 
      {
        totalArt: orderList.length,
        totalPrice: allPrice,
      });
      const billId = response.data.id;
      const putRequests = orderList.map(order => {
        return axios.put(`http://localhost:3001/order/updateStatus/${order.id}/${billId}`, {});
      });

      await Promise.all(putRequests);
      console.log('Payment completed successfully!');
      navigate(`/payment/${localStorage.getItem('userId')}`);
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
      ) : orderList.length === 0 && Array.isArray(orderList) ? (
        <p>Your cart is empty.</p>
      ) : (
        orderList.map((order, key) => (
          order.status === false && (
          <div key={key} className='order'>
            <div>{order.artname}</div>
            <div>{order.artist}</div>
            <div>{order.orderDate}</div>
            <div>{order.price} บาท</div>
            <button onClick={() => onDelete(order.id)}>Cancel Order</button>
          </div>
          )
        ))
      )}
      {console.log(orderList.length)}
      {orderList.length > 0 && <button onClick={pay}>Pay</button>}
    </div>
  );
}

export default Cart;
