// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       {/* Hero section */}
//       <section className="bg-success text-white text-center py-4 w-100">
//         <div className="container">
//           <h1 className="fs-2 fw-bold">🌿 Welcome to FarmCart</h1>
//           <p className="lead mb-3">Buy fresh produce directly from local farmers</p>
//           <div>
//             <Link to="/products" className="btn btn-light btn-sm me-2 mb-2">Shop Now</Link>
//             <Link to="/register" className="btn btn-outline-light btn-sm mb-2">Join as Farmer</Link>
//           </div>
//         </div>
//       </section>

//       {/* Why FarmCart / Features */}
//       <section className="container my-4 flex-grow-1">
//         <h2 className="text-center fs-4 mb-3">Why FarmCart?</h2>
//         <div className="row g-3">
//           <div className="col-12 col-md-4">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Fresh & Local</h5>
//                 <p className="card-text">Support local farmers and get farm-fresh products delivered to you.</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Easy Shopping</h5>
//                 <p className="card-text">Browse, add to cart, and order within minutes from any device.</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-4">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Empower Farmers</h5>
//                 <p className="card-text">Farmers can add products, manage inventory, and grow their business.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to action */}
//       <section className="bg-light text-center py-3 w-100">
//         <h4 className="fs-5">Ready to explore fresh produce?</h4>
//         <Link to="/products" className="btn btn-success btn-sm mt-2">Browse Products</Link>
//       </section>

//       {/* Footer */}
//       <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
//         <small>&copy; {new Date().getFullYear()} FarmCart. All rights reserved.</small>
//       </footer>
//     </div>
//   );
// }


// src/pages/Home.jsx
// src/pages/Home.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* ✅ Hero Banner */}
      <section className="text-white text-center py-5" style={{ background: 'linear-gradient(135deg, #28a745, #218838)' }}>
        <div className="container">
          <h1 className="display-5 fw-bold mb-3">🌱 Welcome to FarmCart</h1>
          <p className="lead mb-4">Buy fresh produce directly from farmers & support local agriculture</p>
          <Link to="/browse" className="btn btn-light btn-lg rounded-pill shadow">
            🛒 Start Shopping
          </Link>
        </div>
      </section>

      {/* ✅ Why FarmCart / Features */}
      <section className="container my-5">
        <h2 className="text-center fw-semibold mb-4">Why Choose FarmCart?</h2>
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title mb-2">🌾 Fresh & Local</h5>
                <p className="card-text small">Support local farmers and get farm-fresh products delivered directly to you.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title mb-2">🛒 Easy Shopping</h5>
                <p className="card-text small">Browse, add to cart, and order in minutes — anytime, anywhere.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title mb-2">🤝 Empower Farmers</h5>
                <p className="card-text small">Farmers can easily add products, manage inventory, and grow their business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Explore Options */}
      <section className="container my-5">
        <h2 className="text-center fw-semibold mb-4">Explore</h2>
        <div className="row g-4 justify-content-center">
          <div className="col-6 col-md-4 col-lg-3">
            <div className="card text-center shadow border-0 h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-2">Browse Products</h5>
                <p className="small text-muted">See fresh products added by farmers</p>
                <Link to="/browse" className="btn btn-outline-success rounded-pill mt-auto">Browse</Link>
              </div>
            </div>
          </div>

          {/* Farmer Dashboard visible only to farmers */}
          {user?.role === 'farmer' && (
            <div className="col-6 col-md-4 col-lg-3">
              <div className="card text-center shadow border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2">Farmer Dashboard</h5>
                  <p className="small text-muted">Add or manage your products</p>
                  <Link to="/farmer-dashboard" className="btn btn-outline-success rounded-pill mt-auto">Go</Link>
                </div>
              </div>
            </div>
          )}

          {/* Show Login/Register only if user not logged in */}
          {!user && (
            <>
              <div className="col-6 col-md-4 col-lg-3">
                <div className="card text-center shadow border-0 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">Login</h5>
                    <p className="small text-muted">Access your account</p>
                    <Link to="/login" className="btn btn-outline-success rounded-pill mt-auto">Login</Link>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <div className="card text-center shadow border-0 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">Register</h5>
                    <p className="small text-muted">Create a new account</p>
                    <Link to="/register" className="btn btn-outline-success rounded-pill mt-auto">Register</Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ✅ Call to Action */}
      {/* <section className="bg-light text-center py-4">
        <h4 className="fw-semibold mb-2">Ready to explore fresh produce?</h4>
        <Link to="/browse" className="btn btn-success btn-sm rounded-pill">Browse Products</Link>
      </section> */}

      {/* ✅ Footer */}
      
      <footer className="bg-dark text-white text-center py-3 mt-auto">
  <div className="container">
    <small>
      &copy; {new Date().getFullYear()} FarmCart. All rights reserved.
      {' '}|{' '}
      <Link to="/privacy" className="text-decoration-none text-light">Privacy</Link>
      {' '}|{' '}
      <Link to="/terms" className="text-decoration-none text-light">Terms</Link>
      {' '}|{' '}
      <Link to="/contact" className="text-decoration-none text-light">Contact</Link>
    </small>
  </div>
</footer>



    </div>
  );
}
