import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [ userInfo, setUserInfo ] = useState({});
  const [ listOfArts, setListOfArts ] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
      if(!response.data) {
        setUserInfo({});
      } else {
        setUserInfo(response.data);
      }
    });

    axios.get(`http://localhost:3001/art/byUserId/${id}`).then((response) => {
      if(!response.data) {
        setListOfArts([]);
      } else {
        setListOfArts(response.data);
      }
     });
  }, []);

   return (
    <div className="profilePageContainer">
      <h1> Profile page </h1>
      <div className="basicInfo">
        <h1> Username: {userInfo.username} </h1>
        <h1> Email: {userInfo.email} </h1>
        <h1> Telephone Number: {userInfo.tel} </h1>
        <h1> Address: {userInfo.address} </h1>
      </div>
      {listOfArts.map((value, key) => {
        return (
          <div key={key} className="art" onClick={() => {navigate(`/art/${value.id}`)}}>
            <div className="title"> {value.title} </div>
            <div className="size"> {value.size} </div>
            <div className="desciption"> {value.desciption} </div>
          </div>
        )
      })}
    </div>
   );
}

export default Profile
