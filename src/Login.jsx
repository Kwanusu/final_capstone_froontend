import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password
    };

    try {
      const { data } = await axios.post(
        'http://localhost:8000/token/',
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      // Clear any previous error messages
      setError('');
      
      // Initialize the access & refresh token in local storage.
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      
      // Set success message and redirect
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); // Adjust delay as needed
    } catch (error) {
      console.error('Error logging in', error);
      
      // Set error message based on response
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else if (error.response && error.response.status === 400) {
        setError('Incorrect username or password. Please check your details.');
      } else {
        setError('An error occurred. Please try again later.');
      }
      
      // Clear success message
      setSuccess('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <form onSubmit={submit}>
          <h3 className="card-title text-center">Login</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name="username"
              type="text"
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="alert alert-danger mt-3">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success mt-3">
              {success}
            </div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <span className="mt-3 d-block text-center">Forgot Password? <Link to="/reset">Reset</Link></span>
          <span className="mt-3 d-block text-center">New user? <Link to="/register">Register</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Login;
