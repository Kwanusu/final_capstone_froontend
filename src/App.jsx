import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import Nabar from './Nabar';
import CustomerList from './CustomerList';
import Home from './Home';
import Register from './Register';
import Products from './Products/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import About_Us from './About Us';
import ContactUs from './Contact Us';
import Cart from './Cart/Cart';
import AddToCart from './Cart/AddToCart';
import Product_Detail from './Products/Product_Detail';
import ProductDetail from './Products/ProductDetail';
import Checkout from './Checkout';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import ProductList from './Products/ProductList';
import { WishlistProvider } from './WishlistContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/check-auth/');
        setIsAuthenticated(response.data.isAuthenticated);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error checking authentication status', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthenticated();
  }, []);

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
        <CartProvider>
        <WishlistProvider>
          <Router>
            <Nabar isAuthenticated={isAuthenticated} username={username} />
            <Routes>
            <Route path="/" element={<Home />} />
              {isAuthenticated ? (
                <>
                  
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/customerlist" element={<CustomerList />} />
                  <Route path="/products" element={<Products />} />
                </>
              ) : (
                <>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </>
              )}
              <Route path="/product_detail/:title" element={<ProductDetail/>} />
              <Route path="/about" element={<About_Us />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/add_to_cart/:id" element={<Cart />} />
              <Route path="/product/:id" element={<AddToCart />} />
              <Route path="/product/:id" element={<Checkout />} />
            </Routes>
            <Footer />
          </Router>
          </WishlistProvider>
        </CartProvider>
    </AuthProvider>
  );
}

export default App;
