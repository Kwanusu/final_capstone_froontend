// ShowCart.jsx
import React, { useState, useEffect } from 'react';
import axios from './axios';

const ShowCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('show_cart/');
        if (response.status === 200) {
          setCartItems(response.data.cart_items);
          setTotalAmount(response.data.total_amount);
          setTotalItems(response.data.total_items);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      <p>Total Items: {totalItems}</p>
      <p>Total Amount: {totalAmount}</p>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
            <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowCart;
