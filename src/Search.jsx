import { Container } from 'react-bootstrap';


const Search = () => {

  return (
    <div className="container mt-4">
       <Container className="mt-5 pt-5">
  {results.length > 0 && (
    <div className="search-results mt-4">
      {results.map((product) => (
        <div key={product.id} className="card mb-3">
          <div className="d-flex">
            <img
              src={product.product_image}
              className="img-responsive flex-shrink-0 me-3"
              alt={product.title}
              style={{ width: '200px', height: 'auto' }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Price: ${product.price}</p>
              <Link to={`/product/${product.id}`} className="btn btn-primary">
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</Container>
    </div>
  );
};

export default Search;
