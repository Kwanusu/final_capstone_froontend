import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

const Home = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [products, setProducts] = useState([]);
  const { addOneToCart } = useCart();
  const { wishlistProducts, addOneToWishlist, removeOneFromWishlist, deleteFromWishlist } = useWishlist();
 

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/carousel_images/');
        const imagesWithFullPaths = response.data.map(image => ({
          ...image,
          src: `http://localhost:8000${image.src}`
        }));
        setCarouselImages(imagesWithFullPaths);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        if (response.data.status === 'success') {
          const productsWithFullImagePaths = response.data.data.map(product => ({
            ...product,
            product_image: `http://localhost:8000${product.product_image}`
          }));
          setProducts(productsWithFullImagePaths);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCarouselImages();
    fetchProducts();
    
  }, []);
  console.log(products)
  const handleCheckout = async () => {
    try {
      const cartItems = Object.entries(cart).map(([id, quantity]) => ({ id, quantity }));
      const response = await axios.post('http://localhost:8000/api/checkout/', { items: cartItems });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const calculateDiscountPercentage = (sellingPrice, discountedPrice) => {
    return Math.round(((sellingPrice - discountedPrice) / sellingPrice) * 100);
  };

  return (
    <div className="container mt-5">
      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {carouselImages.map((image, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={image.src} className="d-block w-100" alt={image.alt} style={{ height: '100vh', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Products */}
      <div className="row mt-4">
        {Array.isArray(products) && products.map((product, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4">
              <div className="position-absolute top-0 end-0 p-2">
                <span className="badge bg-danger">
                  {calculateDiscountPercentage(product.selling_price, product.discounted_price)}% Off
                </span>
              </div>
              <Link to={`/product_detail/${product.title}`}>
                <img src={product.product_image} className="image img-responsive col-xs-6 sm-12 col-lg-12 mt-3 text-sm-center w-100 h-50" alt={product.title} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <h5 className="card-title">{product.id}</h5>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text text-decoration-line-through text-muted text-danger">Was $: {product.selling_price}</p>
                <h5 className="card-text">Now $: {product.discounted_price}</h5>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" onClick={() => addOneToCart(product.title)}>Add to Cart</button> {/* Updated here */}
                  <button className="btn btn-warning mx-1" onClick={handleCheckout}>Buy Now</button>
                  <button className="btn btn-success" onClick={() => addOneToWishlist(product.title)}>Add to Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
