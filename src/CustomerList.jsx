import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/customers/');
        setCustomers(response.data.customers); // Assuming 'customers' is the key in your JSON response
        setLoading(false); // Update loading state after data is fetched
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false); // Handle error by updating loading state
      }
    };

    fetchCustomers();
  }, []); // Empty dependency array to run effect once

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customer List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {customers.map(customer => (
            <li key={customer.id} className="list-group-item">
              {customer.name} - {customer.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
