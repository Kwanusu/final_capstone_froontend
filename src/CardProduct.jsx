import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function CardProduct({ product }) {
  const cart = useContext(CartContext);

  // Debugging logs
  console.log('Received product:', product);

  if (!product || !product.title) {
    console.error('Product or title is undefined', product);
    return <div>Loading product details...</div>;
  }

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">${product.price}</p>
        <a href="#" className="btn btn-primary">Buy Now</a>
      </div>
    </div>
  );
}

export default CardProduct;


// CardProduct.propTypes = {
//   product: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     price: PropTypes.number,
//     image: PropTypes.string,
//   })
// };

// export default CardProduct;
