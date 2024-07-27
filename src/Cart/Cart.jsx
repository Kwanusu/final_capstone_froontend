import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useCart } from '../CartContext';
import axios from 'axios';
import { getProductData } from '../Products/Product_Detail';

const Cart = ({ products }) => {
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

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/checkout/create-session/', {
        items: items.map(item => {
          const items = getProductData(item.title, products);
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item?.title || 'Unknown',
                description: item?.description || 'No description',
              },
              unit_amount: (item?.discounted_price || 0) * 100,
            },
            quantity: item.quantity,
          };
        }),
      });
      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  
  
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Shopping Cart</h1>
      <div className="card">
        <div className="card-body">
          {items.length > 0 ? (
            <>
              {items.map(item => {
                const product = getProductData(item.title, products);
                console.log(item); // Debugging line
                return (
                  <div className="row" key={item.title}>
                    <div className="col-sm-3 text-center align-self-center">
                      <img
                        src={item?.product_image || ''}
                        alt={item.title}
                        className="img-fluid img-thumbnail shadow-sm"
                        height="150"
                        width="150"
                      />
                    </div>
                    <div className="col-sm-9">
                      <h5>{item.title}</h5>
                      <p className="mb-2 text-muted small">
                        {product?.description || 'No description'}
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
                        {/* <p className="mb-0">
                          <strong>Kshs. {(item?.discounted_price || 0) * item.quantity}</strong>
                        </p> */}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between mt-4">
                <h3>Total: Kshs. {totalAmount.toFixed(2)}</h3>
                <Button variant="success" onClick={handleCheckout}>Purchase items!</Button>
              </div>
            </>
          ) : (
            <h1>Your cart is empty</h1>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Cart;
