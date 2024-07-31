import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';

const Product_Detail = () => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { title } = useParams(); // Get the product title from the URL
  const { addOneToCart } = useCart();
  const { addOneToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        console.log('Products response:', response.data);
        if (response.data.status === 'success') {
          const fetchedProducts = response.data.data;
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductDetail();
  }, []);

  useEffect(() => {
    if (products.length > 0 && title) {
      const productData = getProductData(title, products);
      setProduct(productData);
    }
  }, [title, products]);

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
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during checkout: ', error);
    }
  };

  const handleAddToWishlist = () => {
    addOneToWishlist(product.title);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const calculateDiscountPercentage = (selling_price, discounted_price) => {
    return Math.round(((selling_price - discounted_price) / selling_price) * 100);
  };

  return (
    <div className="container mt-5">
      <div className="row mt-4">
        <div className="col-md-4">
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
              <small className="text-decoration-line-through text-muted fs-5">$. {product.selling_price}</small>
              <p className="card-text">$. {product.discounted_price}</p>
              <div className="d-flex justify-content-between">
                <button onClick={() => addOneToCart(product.title)} className="btn btn-primary">Add to Cart</button>
                <button onClick={handleBuyNow} className="btn btn-warning">Buy Now</button>
                <button onClick={handleAddToWishlist} className="btn btn-success">Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Detail;

export const getProductData = (title, products) => {
  console.log("Title passed to getProductData:", title);
  console.log("Products passed to getProductData:", products);

  if (!products || !title) {
    console.log("Either products or title is undefined or null.");
    return undefined;
  }

  const product = products.find(product => product.title === title);

  if (!product) {
    console.error(`Product does not exist for title: ${title}`);
    return undefined;
  }

  return product;
};
