import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [add, setAdd] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const [stripePublishableKey, setStripePublishableKey] = useState('');
  const [totalItem, setTotalItem] = useState(0);
  const [wishItem, setWishItem] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/checkout/');
        setAdd(response.data.add);
        setCart(response.data.cart);
        setTotalAmount(response.data.totalAmount);
        setClientSecret(response.data.clientSecret);
        setStripePublishableKey(response.data.stripePublishableKey);
        setTotalItem(response.data.totalItem);
        setWishItem(response.data.wishItem);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCheckout = async () => {
    try {
      const cartItems = cart.map(item => ({ id: item.id, quantity: item.quantity }));
      const response = await axios.post('http://localhost:8000/api/checkout/', { items: cartItems });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>{item.product.title} - {item.quantity}</li>
        ))}
      </ul>
      <p>Total Amount: {totalAmount}</p>
      <p>Total Items in Cart: {totalItem}</p>
      <p>Total Items in Wishlist: {wishItem}</p>
      <button id="checkout-button" onClick={handleCheckout}>Pay Now</button>
    </div>
  );
};

export default Checkout;
