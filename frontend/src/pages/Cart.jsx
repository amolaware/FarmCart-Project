import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Safer total calculation
  const total = cart.reduce((sum, item) => {
    return (item?.product?.price ? sum + item.product.price * item.quantity : sum);
  }, 0);

  const handleCheckout = () => {
    clearCart();
    navigate('/thankyou');
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center fw-bold">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty. Start shopping now!
        </div>
      ) : (
        <>
          <div className="row g-3">
            {cart.map(item => (
              item?.product && (
                <div key={item.product._id} className="col-12">
                  <div className="card shadow-sm">
                    <div className="row g-0 align-items-center">
                      <div className="col-3 col-md-2">
                        <img
                          src={item.product.imageUrl ? `http://localhost:5000${item.product.imageUrl}` : 'https://via.placeholder.com/80'}
                          alt={item.product.name || 'Product'}
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-9 col-md-4">
                        <div className="card-body">
                          <h6 className="card-title mb-1">{item.product.name || 'Unknown product'}</h6>
                          <small className="text-muted">₹{item.product.price || 0} per item</small>
                        </div>
                      </div>
                      <div className="col-6 col-md-3 text-center">
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-danger" onClick={() => decreaseQuantity(item.product._id)}>-</button>
                          <span className="btn btn-sm btn-light">{item.quantity}</span>
                          <button className="btn btn-sm btn-outline-success" onClick={() => increaseQuantity(item.product._id)}>+</button>
                        </div>
                      </div>
                      <div className="col-6 col-md-3 text-end pe-3">
                        <div className="fw-semibold">₹{item.product.price * item.quantity}</div>
                        <button className="btn btn-sm btn-danger mt-1" onClick={() => removeFromCart(item.product._id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="border-top mt-4 pt-3 text-end">
            <h5 className="fw-bold">Total: ₹{total}</h5>
            <button className="btn btn-success btn-lg mt-2" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
