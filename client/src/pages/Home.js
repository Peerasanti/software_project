import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'; 

function Home() {

  const [listOfArt, setListOfArt] = useState([]);
  
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/art/").then((response) => {
      setListOfArt(response.data);
    });
  }, []);

  return (
    <div className="home-container">
      {/* <div>This is Home page</div> */}
      {listOfArt.map((value, key) => {
        return (
          <div key={key} className="art" onClick={() => { navigate(`/art/${value.id}`) }}>
            <img  style={{ width: '200px', height: '200px' }} src={`http://localhost:3001/images/`+value.img} alt="" />
            <div className="title">ชื่อผลงาน: {value.title} </div>
            <div className="artist">ผู้วาด: {value.artist} </div>
            <div className="price">ราคา: {value.price} บาท</div>
            <div className="size">ขนาด: {value.size} </div>
            <div className="description">คำบรรยาย: {value.description}</div>
          </div>
        );
      })}
    </div>
  )
}

export default Home
