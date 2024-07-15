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
        const response = await axios.get('/api/checkout_data/');
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
      <button id="checkout-button">Pay Now</button>
    </div>
  );
};

export default Checkout;
