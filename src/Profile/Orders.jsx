import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/orders/')  // Adjust the endpoint URL if necessary
      .then(response => {
        setOrders(response.data.orders || []);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderProgressBar = (status) => {
    let progress = 0;
    let color = 'primary';

    switch (status) {
      case 'Accepted':
        progress = 20;
        break;
      case 'Packed':
        progress = 40;
        color = 'info';
        break;
      case 'On The Way':
        progress = 70;
        color = 'warning';
        break;
      case 'Delivered':
        progress = 100;
        color = 'success';
        break;
      case 'Cancel':
        progress = 100;
        color = 'danger';
        break;
      default:
        progress = 0;
    }

    return (
      <div className="progress">
        <div className={`progress-bar bg-${color}`} role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        <h3>Welcome <span className="text-capitalize">{/* User's name here */}</span></h3>
        <div className="col-sm-2 border-end">
          <ul className="list-unstyled">
            <li className="d-grid"><a href="/orders" className="btn btn-primary">Orders</a></li>
          </ul>
        </div>
        <div className="col-sm-9 offset-sm-1">
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map(order => (
              <div className="row my-3" key={order.id}>
                <div className="col-sm-2">
                  <img src={order.product.product_img_url} className="img-fluid" height="100" width="100" alt="Product" />
                </div>
                <div className="col-sm-7">
                  <p><strong>Product:</strong> {order.product.title}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Price:</strong> {order.total_cost}</p>
                </div>
                <div className="col-sm-3">
                  <p><strong>Order Status:</strong> {order.status}</p>
                  {renderProgressBar(order.status)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
