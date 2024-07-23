import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || {});
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, you could verify the token here by making a request to your backend
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/check-auth/', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error checking auth status', error);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    axios.defaults.headers.common['Authorization'] = '';
  };

  const register = async (user) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/register/',
        user,
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      setIsAuthenticated(true);
      setUser({ username: user.username });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/check-auth'); 
        setIsAuthenticated(true);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);


  const addToCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        updatedCart[productId] += 1;
      } else {
        updatedCart[productId] = 1;
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, addToCart, cart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
