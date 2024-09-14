import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Art() {
  let { id } = useParams();

  const [ artObject, setArtObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/art/byId/${id}`).then((response) => {
      setArtObject(response);
    });
  }, []);

  return (
    <div>
      {id}
      <div className="image">{artObject.img}</div>
      <div className="title">{artObject.title}</div>
      <div classname="price">{artObject.price}</div>
      <div className="size">{artObject.size}</div>
      <div className="desciption">{artObject.desciption}</div>
    </div>
  )
}

export default Art
