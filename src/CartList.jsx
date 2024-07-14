import { useState, useEffect } from 'react';
import axios from 'axios';

const CartList = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/carts/');
        setCarts(response.data.carts); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching carts:', error);
        setLoading(false); 
      }
    };

    fetchCarts();
  }, []); // Empty dependency array to run effect once

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cart List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {carts.map(cart => (
            <li key={cart.id} className="list-group-item">
              Product: {cart.product} - Quantity: {cart.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
