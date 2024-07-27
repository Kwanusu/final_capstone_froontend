import axios from 'axios';
import { getProductData } from './Products/Product_Detail';

const createCheckoutSession = async (items, products) => {
  try {
    const lineItems = items.map(item => {
      const product = getProductData(item.title, products);
      if (!product) {
        throw new Error(`Product data not found for title: ${item.title}`);
      }

      if (typeof product.discounted_price !== 'number' || product.discounted_price <= 0) {
        throw new Error(`Invalid price for product: ${item.title}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: Math.round(product.discounted_price * 100), // Amount in cents, rounded to avoid potential floating-point issues
        },
        quantity: item.quantity,
      };
    });

    const response = await axios.post('http://localhost:8000/api/checkout/create-session/', {
      items: lineItems,
    });

    if (response.data && response.data.url) {
      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
      console.log(data.url)
    } else {
      throw new Error('Invalid response from server: Missing URL');
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    // Optionally, you can show an alert to the user
    alert('There was an error creating the checkout session. Please try again.');
  }
};

export default createCheckoutSession;
