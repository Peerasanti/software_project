import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../css/Home.css'; 
import DisplayImage from '../helper/DisplayImage';

function Home() {

  const [listOfArt, setListOfArt] = useState([]);
  
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/art").then((response) => {
      setListOfArt(response.data);
    });
  }, []);

  return (
    <div>
      <div>This is Home page</div>
      {listOfArt.map((value, key) => {
        return (
          <div key={key} className="art" onClick={() => {navigate(`/art/${value.id}`)}} >
            {/* {value.img && <DisplayImage file={value.img}/>} */}
            <div className="title"> {value.title} </div>
            <div className="artist"> {value.artist} </div>
            <div className="price"> {value.price} </div>
            <div className="size"> {value.size} </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
