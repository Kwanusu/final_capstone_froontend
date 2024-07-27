
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardProduct from '../CardProduct';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        if (response.data.status === 'success') {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="col-md-4 mb-4">
              <CardProduct product={product} />
            </div>
          ))
        ) : (
          <div>Loading products...</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
