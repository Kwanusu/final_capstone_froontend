import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products/');
      console.log("API response:", response.data); // Inspect the actual response
      if (response.data && response.data.products) { // Adjust based on actual structure
        const productsWithFullImagePaths = response.data.products.map(product => ({
          ...product,
          product_image: `http://localhost:8000${product.product_image}`
        }));
        setProducts(productsWithFullImagePaths);
      } else {
        console.error("Unexpected API response structure:", response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  
    fetchProducts();
  };
  console.log(products)
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;


export const getProductData = (id, products) => {
  const productData = products.find(product => product.id === id);
  if (!productData) {
    console.log(`Product does not exist for that ID: ${id}`);
    return undefined;
  }
  return productData;
};
