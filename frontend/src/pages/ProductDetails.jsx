import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Failed to load product:', err));
  }, [id]);

  if (!product) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : 'https://via.placeholder.com/300'}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-success fs-4">₹{product.price}</p>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.countInStock}</p>
          <p><strong>Farmer:</strong> {product.farmer?.name || 'Unknown'}</p>

          {user?.role === 'consumer' && (
            <>
              <div className="d-flex align-items-center mb-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                  className="btn btn-secondary"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-success"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
