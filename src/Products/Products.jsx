import { useState, useEffect } from 'react';
import axios from 'axios';
import { data } from 'autoprefixer';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/product_list/');
        setProducts(response.data.products);
        console.log(data)  // Ensure this matches the JSON structure
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run effect once

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product List</h2>
      {loading ? (
        <p className='text-sm font-bold'>Loading...</p>
      ) : (
        <div className="row">
          {Array.isArray(products) && products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={product.product_image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text"><strong>Composition:</strong> {product.composition}</p>
                  <p className="card-text"><strong>Application:</strong> {product.prodapp}</p>
                  <p className="card-text">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="card-text">
                    <strong>Selling Price:</strong> ${product.selling_price}
                  </p>
                  <p className="card-text">
                    <strong>Discounted Price:</strong> ${product.discounted_price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
