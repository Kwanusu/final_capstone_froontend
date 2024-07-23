// import {useContext} from 'react';
// import { CartContext } from './CartContext';

// import { Button } from 'react-bootstrap';

// function CardProduct (props) {

//     const cart = useContext(CartContext);
//     const id = props.id;
//     const quantity = props.quantity;
//     const productData = getProductData(id)
//   return (
//     <div>
//         <h3>{productData.title}</h3>
//         <p>{quantity} total</p>
//         <p>${ (quantity * productData.price).toFixed(2) }</p>
//         <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
//         <hr></hr>
//     </div>
//   )
// }

// export default CardProduct
import React from 'react';
import { getProductData } from './Products/ProductDetail'; 
import { useCart } from './CartContext';

const CardProduct = ({ title, quantity }) => {
  const { removeFromCart } = useCart();
  const product = getProductData(title);// Use the getProductData function to fetch product details
 

  if (!product) {
    return null;
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.product_image} className="img-fluid rounded-start" alt={product.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">Quantity: {quantity}</p>
            <p className="card-text">Price: Kshs {product.price * quantity}</p>
            <button className="btn btn-danger" onClick={() => removeFromCart(title)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
