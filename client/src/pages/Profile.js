import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../helper/AuthContext";
import "../css/Profile.css"

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [ userInfo, setUserInfo ] = useState({});
  const [ listOfArts, setListOfArts ] = useState([]);
  const { authState } = useContext(AuthContext);

  console.log("authState:", authState);
  console.log("id:", id);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/byId/${id}`).then((response) => {
      if(!response.data) {
        setUserInfo({});
      } else {
        setUserInfo(response.data);
      }
    });

    axios.get(`http://localhost:3001/art/findByUser/${id}`).then((response) => {
      if(typeof response.data === 'string') {
        setListOfArts([]);
      } else {
        setListOfArts(response.data);
      }
     });
  }, [id]);

  const onDelete = (id) => {
    axios.delete(`http://localhost:3001/art/delete/${id}`,
    ).then(() => {
      setListOfArts(listOfArts.filter((val) => {
        return val.id !== id;
      }));
      navigate(`/profile/${authState.id}`)
    });
  };

   return (
    <div className="profilePageContainer">
      <h1> Profile page </h1>
      <div className="basicInfo">
        <h1> Username: {userInfo.username} </h1>
        <h1> Email: {userInfo.email} </h1>
        <h1> Telephone Number: {userInfo.tel} </h1>
        <h1> Address: {userInfo.address} </h1>
      </div>
      <button onClick={() => {navigate(`/editProfile/${id}`)}}> Edit Info </button>
      {listOfArts.map((value, key) => {
        return (
          <div key={key} className="art">
            <img  style={{ width: '300px', height: '300px' }} src={`http://localhost:3001/images/`+value.img} alt="" />
            <div className="title">ชื่อผลงาน: {value.title} </div>
            <div className="size">ขนาด: {value.size} </div>
            <div className="desciption">คำบรรยาย: {value.desciption} </div>
            <button onClick={() => {onDelete(value.id)}}> Delete Art </button>
          </div>
        )
      })}
    </div>
   );
}

export default Profile
