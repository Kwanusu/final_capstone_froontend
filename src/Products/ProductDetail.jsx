import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';

const ProductDetail = () => {
  const { title } = useParams(); // Get the product title from the URL
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { addOneToCart } = useCart();
  const { addOneToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        if (response.data.status === 'success') {
          const productWithFullImagePaths = response.data.data.map(product => ({
            ...product,
            product_image: `http://localhost:8000${product.product_image}`
          }));
          setProducts(productWithFullImagePaths); // Correctly set products array
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && title) {
      const product = getProductData(title, products);
      setProduct(product);
    }
  }, [title, products]);

  const calculateDiscountPercentage = (selling_price, discounted_price) => {
    return Math.round(((selling_price - discounted_price) / selling_price) * 100);
  };

  const handleBuyNow = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/checkout/create-session/', {
        items: [
          {
            price_data: {
              currency: 'usd', // Update to your actual currency
              product_data: {
                name: product.title,
                description: product.description
              },
              unit_amount: Math.round(product.discounted_price * 100), // Amount in cents
            },
            quantity: 1
          }
        ]
      });

      // Redirect to Stripe Checkout
      window.location.href = response.data.id;
    } catch (error) {
      console.error('Error during checkout: ', error);
    }
  };

  const handleAddToWishlist = () => {
    // Add functionality for Add to Wishlist
    addOneToWishlist(product.title);
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
      <div className="row">
        <div className="col-lg-6">
          <img 
            src={product.product_image} 
            className="img-fluid" 
            alt={product.title} 
            style={{ marginTop: '20px' }}
          />
        </div>
        <div className="col-lg-6">
          <h1>{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <p className="card-text">{product.prodapp}</p>
          <p className="card-text">{product.composition}</p>
          <small className="text-decoration-line-through text-muted fs-5">
            $. {product.selling_price}
          </small>
          <p className="card-text">$. {product.discounted_price}</p>
          <div className="d-flex justify-content-between">
            <button onClick={() => addOneToCart(product.title)} className="btn btn-primary">Add to Cart</button>
            <button onClick={handleBuyNow} className="btn btn-warning">Buy Now</button>
            <button onClick={handleAddToWishlist} className="btn btn-success">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


export const getProductData = (title, products) => {
  console.log("Title passed to getProductData:", title);
  console.log("Products passed to getProductData:", products);

  // Check if title and products are valid
  if (!Array.isArray(products) || !title) {
    console.log("Either products or title is undefined or null.");
    return undefined;
  }

  // Find the product by title
  const product = products.find(product => product.title === title);

  if (!product) {
    console.error(`Product does not exist for title: ${title}`);
    return undefined;
  }

  return product;
};


// export const getProductData = (title, products) => {
//   console.log("Title passed to getProductData:", title);
//   console.log("Products passed to getProductData:", products);

//   if (!products || !title) {
//     console.log("Either products or title is undefined or null.");
//     return undefined;
//   }

//   const product = products.find(product => product.title === title);

//   if (!product) {
//     console.error(`Product does not exist for title: ${title}`);
//     return undefined;
//   }

//   return product;
// };
