import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">   
        <Link to='/login'> Login </Link>
        <br></br>
        <Link to='/createuser'> Create User </Link>
        <br></br>
        <Link to='/'> Home page </Link>
        <br></br>
        </div>    
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/createuser' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
