
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../helper/AuthContext';
import "../css/ArtDetail.css"


function ArtDetail() {
    let { id } = useParams();

    const [ artObject, setArtObject] = useState({});
    const date = new Date();
  
    useEffect(() => {
      axios.get(`http://localhost:3001/art/byId/${id}`).then((response) => {
        if(!response.data) {
          setArtObject({});
        } else {
          setArtObject(response.data);
        }
      });
    }, [id]);
  

  
    const addOrder = () => {
      axios.post('http://localhost:3001/order',
        {
          orderDate: date, 
          ArtId: id, 
          artist: artObject.artist, 
          price: artObject.price, 
          artName: artObject.title,
          status: false
        },
        {
          headers: {
            accessToken: localStorage.getItem('accessToken')
          },
        }
      ).then((response) => {
        if(response.data.error) {
          alert('You Should Log In First');
          console.log(response.data.error);
        } else {
          console.log('Add to cart success!!!');
          console.log(response.data);
        }
      });
    };
  
  
    return (
      <div className='artPost'>
        <div className='postSection'>
          <img  style={{ width: '300px', height: '300px' }} src={`http://localhost:3001/images/`+artObject.img} alt="" />
          <div className="title">ชื่อผลงาน: {artObject.title}</div>
          <div className="price">ราคา: {artObject.price} บาท</div>
          <div className="size">ขนาด: {artObject.size}</div>
          <div className="artist">ผู้วาด: {artObject.artist}</div>
          <div className="desciption">คำบรรยาย: {artObject.desciption}</div>
        </div>
      </div>
  
    )
  }

export default ArtDetail