import { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/search?search=${query}`);
      setResults(response.data.products);
    } catch (error) {
      console.error('Error searching products', error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="search-results">
        {results.map((product) => (
          <div key={product.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Price: ${product.price}</p>
              <a href={`/product/${product.id}`} className="btn btn-primary">
                Add to Cart
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
