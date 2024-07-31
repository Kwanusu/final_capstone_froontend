import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { getProductData } from './Products/Product_Detail';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
    prepareCheckoutData: () => {},
    clearCart: () => {},  // Add clearCart to the context
});

export const useCart = () => {
    return useContext(CartContext);
};

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/');
                if (response.data.status === 'success') {
                    const productsWithFullImagePaths = response.data.data.map(product => ({
                        ...product,
                        product_image: `http://localhost:8000${product.product_image}`
                    }));
                    setProducts(productsWithFullImagePaths);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    }, [cartProducts]);

    function getProductQuantity(title) {
        const product = cartProducts.find(product => product.title === title);
        return product ? product.quantity : 0;
    }

    function addOneToCart(title) {
        setCartProducts(prevCartProducts => {
            const existingProduct = prevCartProducts.find(product => product.title === title);
            if (existingProduct) {
                return prevCartProducts.map(product =>
                    product.title === title
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                );
            } else {
                return [...prevCartProducts, { title: title, quantity: 1 }];
            }
        });
    }

    function removeOneFromCart(title) {
        setCartProducts(prevCartProducts => {
            const existingProduct = prevCartProducts.find(product => product.title === title);
            if (existingProduct.quantity === 1) {
                return prevCartProducts.filter(product => product.title !== title);
            } else {
                return prevCartProducts.map(product =>
                    product.title === title
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                );
            }
        });
    }

    function deleteFromCart(title) {
        setCartProducts(prevCartProducts =>
            prevCartProducts.filter(product => product.title !== title)
        );
    }

    function getTotalCost() {
        return cartProducts.reduce((totalCost, cartItem) => {
            const productData = getProductData(cartItem.title, products);
            if (productData && productData.discounted_price) {
                return totalCost + (productData.discounted_price * cartItem.quantity);
            } else {
                console.log(`Product data is missing or discounted_price is undefined for title: ${cartItem.title}`);
                return totalCost;
            }
        }, 0);
    }

    function prepareCheckoutData() {
        return cartProducts.map(cartItem => {
            const productData = getProductData(cartItem.title, products);
            if (productData) {
                return {
                    title: cartItem.title,
                    price: productData.discounted_price || productData.selling_price,
                    quantity: cartItem.quantity
                };
            } else {
                return {
                    title: cartItem.title,
                    price: 0,
                    quantity: cartItem.quantity
                };
            }
        });
    }

    function clearCart() {
        setCartProducts([]);
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        prepareCheckoutData,
        clearCart,  // Include clearCart in the context value
        setCartProducts,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
