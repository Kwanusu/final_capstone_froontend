import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordResetRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/password_reset/', { email });
            setMessage(response.data.detail || 'Password reset email sent.');
            setError('');
            setEmail('');
        } catch (error) {
            setError(error.response.data.detail || 'An error occurred.');
            setMessage('');
        }
    };

    return (
        <div className="container">
            <div className="row my-3">
                <div className="col-sm-6 offset-sm-3">
                    <h3 className="mt-4">Password Reset Request</h3>
                    <form
                        onSubmit={handlePasswordResetRequest}
                        className="shadow p-5"
                    >
                        {message && <div className="alert alert-success">{message}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">
                            Send Password Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetRequest;
