import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/carousel_images/');
        console.log('Carousel images response:', response.data);
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
        console.log('Products response:', response.data);
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
              <a href='/product_detail'><img src={product.product_image} className="image img-responsive col-xs-6 sm-12 col-lg-12 mt-3 text-sm-center w-100 h-50" alt={product.title} /></a>
              <h5 className="card-title">{product.title}</h5>
              <div className="d-flex justify-content-between">
                <Link to='/product_detail' className="btn btn-primary">Add to Cart</Link>
                <button className="btn btn-warning mx-1">Buy Now</button>
                <button className="btn btn-success mx-1">Add to Wishlist</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
