import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts();
      setProducts(response.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Error loading products</h2>
        <p>{error}</p>
        <button onClick={fetchProducts} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Welcome to JKWI Online Store</h2>
      <p>Discover our amazing products!</p>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="category">{product.category}</div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price}</div>
            <p>Stock: {product.stock} available</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div>
          <h3>No products available</h3>
          <p>Please check back later!</p>
        </div>
      )}
    </div>
  );
}

export default Home;