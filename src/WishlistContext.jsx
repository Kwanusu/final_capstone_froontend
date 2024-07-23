// src/contexts/WishlistContext.js
import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistProducts, setWishlistProducts] = useState([]);

    const addOneToWishlist = (title) => {
        if (!wishlistProducts.some(product => product.title === title)) {
            setWishlistProducts([...wishlistProducts, { title, quantity: 1 }]);
        }
    };

    const removeOneFromWishlist = (title) => {
        const productIndex = wishlistProducts.findIndex(product => product.title === title);
        if (productIndex !== -1) {
            setWishlistProducts([
                ...wishlistProducts.slice(0, productIndex),
                ...wishlistProducts.slice(productIndex + 1)
            ]);
        }
    };

    const deleteFromWishlist = (title) => {
        setWishlistProducts(wishlistProducts =>
            wishlistProducts.filter(currentProduct => currentProduct.title !== title)
        );
    };

    return (
        <WishlistContext.Provider value={{
            wishlistProducts,
            addOneToWishlist,
            removeOneFromWishlist,
            deleteFromWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
