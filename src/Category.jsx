// Category.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Category() {
    const { categoryCode } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/category/${categoryCode}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCategoryProducts();
    }, [categoryCode]);

    return (
        <div>
            <h1>Category: {categoryCode}</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>  
                ))}
            </ul>
        </div>
    );
}

export default Category;
