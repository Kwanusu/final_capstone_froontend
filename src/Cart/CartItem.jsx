import React from 'react';
import axios from 'axios';

const CartItem = ({ item, refreshCart }) => {
  const removeFromCart = async () => {
    try {
      const response = await axios.delete('/api/remove_cart_item/', {
        data: { prod_id: item.product.id },
      });
      if (response.status === 204) {
        refreshCart();
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <div className="row">
      <div className="col-sm-3 text-center align-self-center">
        <img src={item.product.product_image} alt={item.product.title} className="img-fluid img-thumbnail shadow-sm" height="150" width="150" />
      </div>
      <div className="col-sm-9">
        <div>
          <h5>{item.product.title}</h5>
          <p className="mb-2 text-muted small">{item.product.description}</p>
          <div className="my-3">
            <label>Quantity: </label>
            <span>{item.quantity}</span>
          </div>
          <div className="d-flex justify-content-between">
            <button onClick={removeFromCart} className="btn btn-sm btn-secondary bg-danger">
              Remove Item
            </button>
            <p className="mb-0">
              <span>
                <strong>Kshs. {item.product.discounted_price}</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
