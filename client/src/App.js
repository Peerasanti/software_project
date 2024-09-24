import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
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
import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import ArtDetail from './pages/ArtDetail';
import { Navigate } from 'react-router-dom';

// Import Bootstrap components
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function App() {

  const [authState, setAuthState] = useState({ username: "", id: 0, status: false });

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("status");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
    
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        {/* Bootstrap Navbar */}
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/">Art Platform</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* Conditional Links based on auth status */}
                  {authState.status || localStorage.getItem('status') === 'true' ? (
                    <>
                      <Nav.Link as={Link} to="/">Home</Nav.Link>
                      <Nav.Link as={Link} to="/postArt">Post Art</Nav.Link>
                      <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                      <Nav.Link as={Link} to={`/payment/${localStorage.getItem('userId')}`}>Payment</Nav.Link>
                      <Nav.Link as={Link} to={`/profile/${localStorage.getItem('userId')}`}>{localStorage.getItem('username')}</Nav.Link>
                      <Nav.Link as={Link} to={'/'}>
                        <Button variant="outline-danger" onClick={logout} >Logout</Button>
                      </Nav.Link> 
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
          <Route path='/' element={authState.status || localStorage.getItem('status') === 'true' ? <Home /> : <Navigate to="/login" />} />
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
       </Router>
    </AuthContext.Provider>
    
  </div>
  );
}

export default App;
