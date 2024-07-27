import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from './AuthContext'; // Adjust the import path as needed

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate(); // Use useNavigate

  const submit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError({ password2: "Passwords do not match" });
      return;
    }

    const user = { username, email, password1, password2 };

    try {
      await register(user);
      navigate('/'); // Redirect to home page or wherever you want
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
        setError('Failed to send request. Please try again.');
      } else {
        console.error('Error:', error.message);
        setError('Something went wrong.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <form onSubmit={submit}>
          <h3 className="card-title text-center">Register</h3>
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
            <label>Email</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Email"
              name="email"
              type="email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password1"
              type="password"
              className="form-control mt-1"
              placeholder="Enter Password"
              value={password1}
              required
              onChange={e => setPassword1(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              name="password2"
              type="password"
              className="form-control mt-1"
              placeholder="Confirm Password"
              value={password2}
              required
              onChange={e => setPassword2(e.target.value)}
            />
          </div>
          {error && (
            <div className="alert alert-danger mt-3">
              {Object.keys(error).map((key) => (
                <p key={key}>{key}: {error[key]}</p>
              ))}
            </div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <span className="mt-3 d-block text-center">Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Register;
