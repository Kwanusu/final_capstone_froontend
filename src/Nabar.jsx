import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import CardProduct from './CardProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Nabar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { items, getTotalCost } = useCart();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/search/?q=${query}`);
      const data = await response.json();
      setResults(data.products || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const checkout = async () => {
    try {
      // Replace with actual checkout implementation
      alert('Checkout functionality not implemented yet');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const productDropdownItems = [
    { path: "/category/EL", label: "Electronics" },
    { path: "/category/KI", label: "Kitchen" },
    { path: "/category/MP", label: "Mobile Phones" },
    { path: "/category/SS", label: "Sound Systems" },
    { path: "/category/CS", label: "Cameras" },
    { path: "/category/BG", label: "Bags" },
    { path: "/category/CL", label: "Clothes" },
    { path: "/category/BB", label: "Beds and Bedding" },
    { path: "/category/CP", label: "Computers" },
    { path: "/category/EE", label: "Electrical" },
    { path: "/category/SD", label: "Smart/Digital TVs" },
  ];

  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg" fixed="top" className="mb-4">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Innovet Tech</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <NavDropdown title="Products" id="navbarScrollingDropdown">
                {productDropdownItems.map((item, idx) => (
                  <NavDropdown.Item key={idx} as={Link} to={item.path}>
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <>
                  <NavDropdown title={user?.username} id="navbarScrollingDropdown">
                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/orders">Orders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/passwordchange">Change Password</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/logout" onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Item className="mx-2">
                    <Button onClick={handleShow} className="nav-link text-white">
                      Cart ({productsCount} Items)
                    </Button>
                  </Nav.Item>
                  <Nav.Item className="mx-2">
                    <Nav.Link as={Link} to="/show_wishlist" className="text-white">
                      Wishlist
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {items.map((currentProduct, idx) => (
                <CardProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity} />
              ))}
              <h1>Total: {getTotalCost().toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>Purchase items!</Button>
            </>
          ) : (
            <h1>There are no items in your cart</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Nabar;
