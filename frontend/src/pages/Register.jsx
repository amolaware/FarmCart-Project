import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'consumer' });
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/register', form)
      .then(() => {
        alert('Registration successful! Please login.');
        navigate('/login');
      })
      .catch(err => alert(err.response?.data?.error || 'Registration failed'));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-3 text-success fw-bold">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              className="form-control" 
              placeholder="Name" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="email" 
              className="form-control" 
              placeholder="Email" 
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              className="form-control" 
              placeholder="Password" 
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              required 
            />
          </div>
          <div className="mb-3">
            <select 
              className="form-select" 
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="consumer">Consumer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
