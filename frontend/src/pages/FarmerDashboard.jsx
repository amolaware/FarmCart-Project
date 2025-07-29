

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function FarmerDashboard() {
  const { token, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', image: null, description: '', category: '', countInStock: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => { fetchMyProducts(); }, []);

  const fetchMyProducts = () => {
    axios.get('http://localhost:5000/api/products/my-products', {
      headers: { Authorization: token }
    })
    .then(res => setProducts(res.data))
    .catch(err => console.error('Failed to fetch products:', err));
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const url = editingProduct
      ? `http://localhost:5000/api/products/${editingProduct}`
      : 'http://localhost:5000/api/products';

    const request = editingProduct
      ? axios.put(url, formData, { headers: { Authorization: token } })
      : axios.post(url, formData, { headers: { Authorization: token } });

    request.then(res => {
      setProducts(editingProduct
        ? products.map(p => p._id === editingProduct ? res.data : p)
        : [...products, res.data]
      );
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', image: null, description: '', category: '', countInStock: '' });
    }).catch(err => {
      console.error(err);
      alert('Error saving product');
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setNewProduct({
      name: product.name, price: product.price, image: null,
      description: product.description, category: product.category, countInStock: product.countInStock
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token }
      })
      .then(() => setProducts(products.filter(p => p._id !== id)))
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message || 'Delete failed');
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-success">🌱 My Products </h2>

      <form onSubmit={handleAddOrUpdate} className="row gy-2 gx-2 align-items-end mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Name"
            value={newProduct.name} required
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Price"
            value={newProduct.price} required
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input type="file" className="form-control"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
          />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Stock"
            value={newProduct.countInStock}
            onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            {editingProduct ? 'Update' : 'Add'}
          </button>
        </div>
      </form>

      <div className="row g-4">
        {products.map(p => (
          <div key={p._id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={p.imageUrl ? `http://localhost:5000${p.imageUrl}` : 'https://via.placeholder.com/150'}
                alt={p.name}
                className="card-img-top"
                style={{ objectFit: 'cover', height: '160px' }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-truncate">{p.name}</h6>
                <p className="mb-1 text-success fw-semibold">₹{p.price}</p>
                <p className="card-text small flex-grow-1">{p.description}</p>
                <small className="text-muted">Category: {p.category} | Stock: {p.countInStock}</small>
                <div className="d-flex justify-content-between mt-2">
                  <button className="btn btn-sm btn-primary" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
