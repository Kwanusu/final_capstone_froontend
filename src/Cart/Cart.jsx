import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';

const Cart = () => {
  const { items, addOneToCart, removeOneFromCart, deleteFromCart, getTotalCost } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(getTotalCost());
  }, [items, getTotalCost]);

  const handleAdd = (title) => {
    addOneToCart(title);
  };

  const handleRemove = (title) => {
    removeOneFromCart(title);
  };

  const handleDelete = (title) => {
    deleteFromCart(title);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <h1 className="text-center mb-5">Shopping Cart</h1>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <h3>Cart</h3>
              {items.length > 0 ? (
                items.map((item) => (
                  <div className="row" key={item.title}>
                    <div className="col-sm-3 text-center align-self-center">
                      <img
                        src={getProductData(item.title, products)?.product_image || ''}
                        alt={item.title}
                        className="img-fluid img-thumbnail shadow-sm"
                        height="150"
                        width="150"
                      />
                    </div>
                    <div className="col-sm-9">
                      <h5>{item.title}</h5>
                      <p className="mb-2 text-muted small">
                        {getProductData(item.title, products)?.description || 'No description'}
                      </p>
                      <div className="my-3">
                        <label htmlFor="quantity">Quantity:</label>
                        <button onClick={() => handleRemove(item.title)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleAdd(item.title)}>+</button>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-secondary bg-danger mr-3" onClick={() => handleDelete(item.title)}>
                          Remove Item
                        </button>
                        <p className="mb-0">
                          <strong>Kshs. {getProductData(item.title, products)?.discounted_price * item.quantity || 0}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h3>The Total Amount</h3>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Amount<span>Kshs. {totalAmount}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping<span>Kshs. 40.00</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  Total Amount<span><strong>Kshs. {totalAmount + 40}</strong></span>
                </li>
              </ul>
              <div className="d-grid">
                <a href="/checkout" className="btn btn-primary">Place Order</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
