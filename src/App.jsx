import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import CustomerList from './CustomerList';
import CartList from './CartList';
import Home from './Home';
import Register from './Register';
import Products from './Products/Products';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Search from './Search';
import { Logout } from './Signout';
import Footer from './Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false); // State to toggle login form
  const [showRegister, setShowRegister] = useState(false); // State to toggle Register form

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/check-auth/');
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication status', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthenticated();
  }, []);

  const toggleLogin = () => {
    setShowLogin(!showLogin); // Toggle login form visibility
  };
  const toggleRegister = () => {
    setShowRegister(!showRegister); // Toggle register form visibility
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Router>
    <Navbar />
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/Search" element={<Search />} />
      {/* {isAuthenticated ? <Login /> : <Register />} */}
      
      {/* {isAuthenticated ? ( */}
        <>
        <Route path='/Logout' element={<Logout />}/>
        <Route path='/CustomerList' element={<CustomerList />}/>
        <Route path='/Products' element={<Products /> }/>
          
          
        </>
      {/* ) : ( */}
        <>
          {/* <Login /> */}
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          
          
        </>
      {/* )} */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
