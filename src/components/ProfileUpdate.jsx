// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProfileUpdate = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     locality: '',
//     city: '',
//     mobile: '',
//     state: '',
//     zipcode: ''
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/profile/', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setFormData(response.data);
//       } catch (error) {
//         setMessage('Error fetching profile.');
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/profile/', formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setMessage('Profile updated successfully.');
//     } catch (error) {
//       setMessage('Error updating profile.');
//     }
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="mb-4">Update Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             id="name" 
//             name="name" 
//             value={formData.name} 
//             onChange={handleChange} 
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="locality" className="form-label">Locality</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             id="locality" 
//             name="locality" 
//             value={formData.locality} 
//             onChange={handleChange} 
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="city" className="form-label">City</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             id="city" 
//             name="city" 
//             value={formData.city} 
//             onChange={handleChange} 
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="mobile" className="form-label">Mobile</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             id="mobile" 
//             name="mobile" 
//             value={formData.mobile} 
//             onChange={handleChange} 
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="state" className="form-label">State</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             id="state" 
//             name="state" 
//             value={formData.state} 
//             onChange={handleChange} 
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="zipcode" className="form-label">Zipcode</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             id="zipcode" 
//             name="zipcode" 
//             value={formData.zipcode} 
//             onChange={handleChange} 
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Update Profile</button>
//       </form>
//       {message && <div className="alert mt-3">{message}</div>}
//     </div>
//   );
// };

// export default ProfileUpdate;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    locality: '',
    city: '',
    mobile: '',
    state: '',
    zipcode: ''
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/profile/')
      .then(response => {
        setUser(response.data.user);
        setFormData({
          name: response.data.name || '',
          locality: response.data.locality || '',
          city: response.data.city || '',
          mobile: response.data.mobile || '',
          state: response.data.state || '',
          zipcode: response.data.zipcode || '',
        });
      })
      .catch(error => {
        console.error('Error fetching profile data', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/profile/', formData)
      .then(response => {
        setMessage([{ tags: 'success', text: 'Profile updated successfully' }]);
        setErrors({});
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors(error.response.data.errors);
          setMessage([{ tags: 'danger', text: 'There were errors with your submission' }]);
        } else {
          console.error('Error submitting form', error);
        }
      });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <h3>Welcome <span className="text-capitalize">{user}</span></h3>
        <div className="col-sm-2 border-end">
          <ul className="list-unstyled">
            <li className="d-grid"><Link to="/profile" className="btn btn-primary">Profile</Link></li>
            <li className="d-grid"><Link to="/address" className="btn">Address</Link></li>
          </ul>
        </div>
        <div className="col-sm-8 offset-sm-1">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="locality" className="form-label">Locality</label>
              <input 
                type="text" 
                className="form-control" 
                id="locality" 
                name="locality" 
                value={formData.locality} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input 
                type="text" 
                className="form-control" 
                id="city" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile</label>
              <input 
                type="text" 
                className="form-control" 
                id="mobile" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input 
                type="text" 
                className="form-control" 
                id="state" 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="zipcode" className="form-label">Zipcode</label>
              <input 
                type="text" 
                className="form-control" 
                id="zipcode" 
                name="zipcode" 
                value={formData.zipcode} 
                onChange={handleChange} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
          {message.length > 0 && (
            <div className={`alert alert-${message[0].tags} mt-3`}>
              {message[0].text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
