import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      'http://localhost:5000/api/auth/login',
      form
    )
    .then(res => {

      setUser(res.data.user);
      setToken(res.data.token);

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      if (res.data.user.role === 'farmer') {
        navigate('/dashboard');
      } else if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    })
    .catch(err => {
      alert(
        err.response?.data?.error ||
        'Login failed'
      );
    });
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: '420px',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <div className="card-body p-4">

          <h2 className="text-center text-success fw-bold mb-2">
            🌾 FarmCart
          </h2>

          <p className="text-center text-muted mb-4">
            Welcome Back
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="text-end mb-3">
              <Link
                to="/forgot-password"
                className="text-decoration-none"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2"
            >
              Login
            </button>

          </form>

          <div className="text-center mt-4">
            <span className="text-muted">
              Don't have an account?
            </span>

            <Link
              to="/register"
              className="ms-2 text-success fw-semibold text-decoration-none"
            >
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}