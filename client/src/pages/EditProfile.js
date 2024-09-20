import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditProfile() {

  let { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    tel: '',
    address: '',
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/byId/${id}`, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3001/auth/user', userInfo, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if (response.data.success) {
        navigate(`/profile/${id}`);
      } else {
        alert('Error updating profile.');
      }
    });
  };

  return (
    <div className="editProfileContainer">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telephone Number:</label>
          <input
            type="tel"
            name="tel"
            value={userInfo.tel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
