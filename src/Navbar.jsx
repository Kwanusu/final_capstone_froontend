import React from 'react';
import { Link } from 'react-router-dom';  // Assuming you use react-router-dom for navigation

function Navbar({ isAuthenticated, totalitem, wishitem }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"> {/* Assuming '/' is your home route */}
                    {/* <img src={`${process.env.PUBLIC_URL}/static/app/css/images/online_shop.jpg`} width="70" height="50" alt="Online Shop" /> */}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownProducts" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Products
                                    </a>
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
                                        <li><Link className="dropdown-item" to="/category/ELE">Electrical</Link></li>
                                        <li><Link className="dropdown-item" to="/category/SDT">Smart/Digital TVs</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/about">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/contact">Contact Us</Link>
                                </li>
                            </>
                        ) : null}
                    </ul>

                    <form className="d-flex ms-auto" action="/search"> {/* Assuming search action is handled by backend */}
                        <input className="form-control me-2" type="search" aria-label="Search" name="search" placeholder="Search" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>

                    <ul className="navbar-nav mb-2 mb-lg-0 ms-2">
                        {isAuthenticated ? (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownProfile" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Profile
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownProfile">
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                                    <li><Link className="dropdown-item" to="/passwordchange">Change Password</Link></li>
                                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link text-white" to="/login">Login</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className="nav-link text-white" to="/customerregistration">Registration</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
