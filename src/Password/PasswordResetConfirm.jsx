import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordResetConfirm = () => {
    const { uid, token } = useParams(); // Assuming `uid` and `token` are passed in the URL
    const navigate = useNavigate(); // For redirecting after successful reset
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordResetConfirm = async () => {
        if (newPassword1 !== newPassword2) {
            setError("Passwords do not match.");
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8000/api/password-reset/confirm/', {
                uidb64: uid,
                token,
                new_password1: newPassword1,
                new_password2: newPassword2
            });
            setSuccess(response.data.detail);
            setError('');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page
            }, 2000); // Delay to show success message
        } catch (error) {
            setError(error.response.data.detail || 'An error occurred.');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <div className="row my-3">
                <div className="col-sm-6 offset-sm-3">
                    <h3 className="mt-4">Reset Your Password</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePasswordResetConfirm();
                        }}
                        className="shadow p-5"
                    >
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <div className="form-group mb-3">
                            <label htmlFor="newPassword1">New Password</label>
                            <input
                                type="password"
                                id="newPassword1"
                                className="form-control"
                                value={newPassword1}
                                onChange={(e) => setNewPassword1(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="newPassword2">Confirm New Password</label>
                            <input
                                type="password"
                                id="newPassword2"
                                className="form-control"
                                value={newPassword2}
                                onChange={(e) => setNewPassword2(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetConfirm;
