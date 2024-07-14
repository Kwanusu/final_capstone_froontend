import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'bootstrap';


const Home = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch carousel images and products on component mount
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/home/');
        console.log('Carousel images response:', response.data); // Log response data
        setCarouselImages(response.data);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product_list/');
        console.log('Products response:', response.data); // Log response data
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchCarouselImages();
    fetchProducts();
  }, []);

  return (
    <div className="container">
      {/* Carousel */}
      <div className="row mt-4">
       {/* <UncontrolledExample /> */}
      </div>

      {/* Products */}
      <div className="row mt-4">
        {Array.isArray(products) && products.map((product, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <a href={product.url} className="btn btn-primary">View Product</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
