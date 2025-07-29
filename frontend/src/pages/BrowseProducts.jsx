// src/pages/BrowseProducts.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function BrowseProducts() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Banner */}
      <section className="bg-success text-white text-center py-4 w-100">
        <div className="container">
          <h1 className="fs-2 fw-bold">🌿 Browse Fresh Produce</h1>
          <p className="lead mb-3">Shop directly from local farmers and support local communities</p>
        </div>
      </section>

      {/* Products */}
      <section className="container my-4 flex-grow-1">
        <h2 className="text-center fs-4 mb-3">Available Products</h2>
        <div className="row g-3">
          {products.map(p => (
            <div key={p._id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.imageUrl ? `http://localhost:5000${p.imageUrl}` : 'https://via.placeholder.com/160'}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column p-2">
                  <h6 className="card-title mb-1 text-truncate">
                    <Link to={`/products/${p._id}`} className="text-decoration-none text-dark">{p.name}</Link>
                  </h6>
                  <p className="card-text mb-1 text-success fw-semibold">₹{p.price}</p>
                  <p className="card-text small text-muted text-truncate">{p.description}</p>

                  {user?.role === 'consumer' && (
                    <>
                      <div className="d-flex align-items-center justify-content-center mb-2">
                        <button className="btn btn-sm btn-secondary" onClick={() => handleQuantityChange(p._id, -1)}>-</button>
                        <span className="mx-2">{quantities[p._id] || 1}</span>
                        <button className="btn btn-sm btn-secondary" onClick={() => handleQuantityChange(p._id, 1)}>+</button>
                      </div>
                      <button
                        className="btn btn-sm btn-success mt-auto"
                        onClick={() => addToCart(p, quantities[p._id] || 1)}
                      >
                        Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        <small>&copy; {new Date().getFullYear()} FarmCart. All rights reserved.</small>
      </footer>
    </div>
  );
}
