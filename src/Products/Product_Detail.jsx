import { useState, useEffect } from 'react';
import axios from 'axios';

const Product_Detail = () => {
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product_detail/');
        console.log('Products response:', response.data);
        if (response.data.status === 'success') {
          setProductDetail(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductDetail();
  }, []);

  const calculateDiscountPercentage = (sellingPrice, discountedPrice) => {
    return Math.round(((sellingPrice - discountedPrice) / sellingPrice) * 100);
  };

  return (
    <div className="container mt-5"> 
      <div className="row mt-4">
        {Array.isArray(productDetail) && productDetail.map((product, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4 position-relative">
              <div className="position-absolute top-0 end-0 p-2">
                <span className="badge bg-danger">
                  {calculateDiscountPercentage(product.selling_price, product.discounted_price)}% Off
                </span>
              </div>
              <img src={product.product_image} className="image img-responsive col-xs-6 sm-12 col-lg-12 mt-3 text-sm-center w-100 h-50" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.prodapp}</p>
                <p className="card-text">{product.composition}</p>
                <small className="text-decoration-line-through text-muted fs-5">Kshs. {product.selling_price}</small>
                <p className="card-text">Kshs. {product.discounted_price}</p>
                <div className="d-flex justify-content-between">
                  <a href={product.url} className="btn btn-primary">Add to Cart</a>
                  <button className="btn btn-success">Buy Now</button>
                  <button className="btn btn-secondary">Add to Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product_Detail;
