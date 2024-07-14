import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    };

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/register/',
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      // Redirect or handle success
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      window.location.href = '/login';
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
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
          {/* {error && (
            <div className="alert alert-danger mt-3">
              {Object.keys(error).map((key) => (
                <p key={key}>{key}: {error[key].join(', ')}</p>
              ))}
            </div>
          )} */}
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

