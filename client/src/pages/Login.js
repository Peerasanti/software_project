import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helper/AuthContext'
import "../css/Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {setAuthState} = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3001/auth/login?username=" + username + "&password=" + password + "", data).then((response) => {
      if(response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('status', true);

        setAuthState({username: response.data.username, id: response.data.id, status: true});
        navigate("/");
      }
    }).catch(error => {
      alert("Invalid credentials");
      console.error("Login error", error);
    });
  }

  return (
    <div className="login-container">
    <h1>เข้าสู่ระบบ</h1>
    <div className="login-form">
      <label htmlFor="username">ชื่อผู้ใช้:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="password">รหัสผ่าน:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button onClick={login} className="login-button">เข้าสู่ระบบ</button>
      <br />
      <button onClick={() => navigate("/createuser")}>สร้างบัญชีผู้ใช้</button>
    </div>
  </div>
  )
}

export default Login
