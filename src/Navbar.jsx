import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 

const Navbar = ({ isAuthenticated, totalitem, wishitem }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/search?search=${query}`);
      setResults(response.data.products);
    } catch (error) {
      console.error('Error searching products', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Innovet Tech</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownProducts" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownProducts">
                <li><Link className="dropdown-item" to="/category/EL">Electronics</Link></li>
                <li><Link className="dropdown-item" to="/category/KI">Kitchen</Link></li>
                <li><Link className="dropdown-item" to="/category/MP">Mobile Phones</Link></li>
                <li><Link className="dropdown-item" to="/category/SS">Sound Systems</Link></li>
                <li><Link className="dropdown-item" to="/category/CS">Cameras</Link></li>
                <li><Link className="dropdown-item" to="/category/BG">Bags</Link></li>
                <li><Link className="dropdown-item" to="/category/CL">Clothes</Link></li>
                <li><Link className="dropdown-item" to="/category/BB">Beds and Bedding</Link></li>
                <li><Link className="dropdown-item" to="/category/CP">Computers</Link></li>
                <li><Link className="dropdown-item" to="/category/EE">Electrical</Link></li>
                <li><Link className="dropdown-item" to="/category/SD">Smart/Digital TVs</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact">Contact</Link>
            </li>
          </ul>

          <form className="d-flex ms-auto" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              aria-label="Search"
              name="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="btn btn-outline-light" type="button">Search</button>
          </form>

          <ul className="navbar-nav mb-2 mb-lg-0 ms-2">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownProfile">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                <li><Link className="dropdown-item" to="/passwordchange">Change Password</Link></li>
                <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
              </ul>
            </li>

            <li className="nav-item mx-2">
              <Link to="/cart_list" className="nav-link text-white">
                <span className="badge bg-danger">{totalitem > 0 && totalitem}</span>Cart
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/show_wishlist" className="nav-link text-white">
                <span className="badge bg-danger">{wishitem > 0 && wishitem}</span>
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link to="/Login" className="nav-link text-white">Login</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Register" className="nav-link text-white">Registration</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
