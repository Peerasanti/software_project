
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/ArtDetail.css"


function ArtDetail() {
    let { id } = useParams();

    const [ artObject, setArtObject] = useState({});
  
    useEffect(() => {
      axios.get(`http://localhost:3001/art/byId/${id}`).then((response) => {
        if(!response.data) {
          setArtObject({});
        } else {
          setArtObject(response.data);
          console.log(response.data);
        }
      });
    }, [id]);
  
    return (
      <div className='artPost'>
        <div className='postSection'>
          <img  style={{ width: '300px', height: '300px' }} src={`http://localhost:3001/images/`+artObject.img} alt="" />
          <div className="title">ชื่อผลงาน: {artObject.title}</div>
          <div className="price">ราคา: {artObject.price} บาท</div>
          <div className="size">ขนาด: {artObject.size}</div>
          <div className="artist">ผู้วาด: {localStorage.getItem('username')}</div>
          <div className="desciption">คำบรรยาย: {artObject.description}</div>
        </div>
      </div>
  
    )
  }

export default ArtDetail