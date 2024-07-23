// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';

const ProductDetail = () => {
  const { title } = useParams(); // Get the product title from the URL
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { addOneToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        if (response.data.status === 'success') {
          const productsWithFullImagePaths = response.data.data.map(product => ({
            ...product,
            product_image: `http://localhost:8000${product.product_image}`
          }));
          setProducts(productsWithFullImagePaths);
          const productData = getProductData(title, productsWithFullImagePaths);
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [title]);

  const calculateDiscountPercentage = (sellingPrice, discountedPrice) => {
    return Math.round(((sellingPrice - discountedPrice) / sellingPrice) * 100);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="position-absolute top-0 end-0 p-2">
        <span className="badge bg-danger">
          {calculateDiscountPercentage(product.selling_price, product.discounted_price)}% Off
        </span>
      </div>
      <div className="card-body col-lg-5">
        <img 
          src={product.product_image} 
          className="image img-responsive col-xs-6 sm-12 col-lg-12 mt-3 text-sm-center w-100 h-50" 
          alt={product.title} 
        />
        <h1>{product.title}</h1>
        <p className="card-text">{product.description}</p>
        <p className="card-text">{product.prodapp}</p>
        <p className="card-text">{product.composition}</p>
        <small className="text-decoration-line-through text-muted fs-5">
          Kshs. {product.selling_price}
        </small>
        <p className="card-text">Kshs. {product.discounted_price}</p>
        <div className="d-flex justify-content-between">
          <button onClick={() => addOneToCart(product.title)} className="btn btn-primary">Add to Cart</button>
          <button className="btn btn-warning">Buy Now</button>
          <button className="btn btn-success">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getProductData = (title, products) => {
  const productData = products.find(product => product.title === title);

  if (!productData) {
    console.log(`Product does not exist for that title: ${title}`);
    return undefined;
  }

  return productData;
};
