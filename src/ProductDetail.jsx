import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [totalItem, setTotalItem] = useState(0);
  const [wishItem, setWishItem] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/product/${match.params.pk}/`);
        setProduct(response.data.product);
        setTotalItem(response.data.totalItem);
        setWishItem(response.data.wishItem);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [match.params.pk]);

  return (
    <div>
      <h1>Product Detail: {product.title}</h1>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Total Items in Cart: {totalItem}</p>
      <p>Total Items in Wishlist: {wishItem}</p>
    </div>
  );
};

export default ProductDetail;
