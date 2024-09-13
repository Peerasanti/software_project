import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      {listOfArt.map((value, key) => {
        return (
          <div className="art" onClick={() => {navigate(`/art/${value.id}`)}} >
            <div className="title"> {value.title} </div>
            <div className="price"> {value.price} </div>
            <div className="size"> {value.size} </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
