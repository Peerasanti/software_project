import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SuccessPage from './pages/SuccessPage';
import Profile from './pages/Profile';
import Art from './pages/Art';
import PostArt from './pages/PostArt';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import PaymentDetail from './pages/PaymentDetail';
import EditProfile from './pages/EditProfile';

import { AuthContext } from './helper/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import ArtDetail from './pages/ArtDetail';

// Import Bootstrap components
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function App() {

  const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
  // const navigate = useNavigate();
  

  useEffect(() => {
    axios.get('http://localhost:3001/auth/user', { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    // navigate("/")
  };

  return (
    <div className="App">
    <Router>
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {/* <Navigation /> */}
      
        {/* Bootstrap Navbar */}
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Art Platform</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/postArt">Post Art</Nav.Link>

      
                {/* Conditional Links based on auth status */}
                {authState.status ? (
                  <>
                    <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                    <Nav.Link as={Link} to={`/payment/${authState.id}`}>Payment</Nav.Link>
                    <Nav.Link as={Link} to={`/profile/${authState.id}`}>{authState.username}</Nav.Link>
                    <Button variant="outline-danger" onClick={logout} >Logout</Button>
                    
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/createuser">Create User</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createuser' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/art/:id' element={<Art />} />
          <Route path='/artDetail/:id' element={<ArtDetail />} />
          <Route path='/postArt' element={<PostArt />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment/:id' element={<Payment />} />
          <Route path='/detail/:id' element={<PaymentDetail />} />
          <Route path='/editProfile/:id' element={<EditProfile />} />
        </Routes>
      
    </AuthContext.Provider>
    </Router>
  </div>
  );
}

function Navigation() {
  const navigate = useNavigate();

  const logout = () => {
      localStorage.removeItem("accessToken");
      // การจัดการสถานะ logout ที่นี่
      navigate('/'); // เปลี่ยนไปที่หน้า Home
  };

  return (
      <nav>
          <button onClick={logout}>Logout</button>
          {/* ลิงก์อื่น ๆ */}
      </nav>
  );
}

export default App;
