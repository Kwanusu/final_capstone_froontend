import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [totalItem, setTotalItem] = useState(0);
  const [wishItem, setWishItem] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/home_data/');
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
      <h1>Home Page</h1>
      <p>Total Items in Cart: {totalItem}</p>
      <p>Total Items in Wishlist: {wishItem}</p>
    </div>
  );
};

export default Home;
