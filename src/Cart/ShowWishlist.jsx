import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/wishlist/');
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map(item => (
          <li key={item.id}>
            {item.product}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowWishlist;
