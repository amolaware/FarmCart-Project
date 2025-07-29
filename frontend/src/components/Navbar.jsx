// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function Navbar() {
//   const { user, setUser, setToken } = useContext(AuthContext);

//   const handleLogout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm sticky-top">
//       <div className="container">
//         {/* Brand always on the left */}
//         <Link className="navbar-brand fw-bold fs-4" to="/">🌿 FarmCart</Link>

//         {/* Toggler for mobile */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Nav links and buttons all to the right */}
//         <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//           <ul className="navbar-nav align-items-center gap-2">
//             <li className="nav-item">
//               <Link className="nav-link fw-medium" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link fw-medium" to="/products">Shop</Link>
//             </li>
//             {user?.role === 'consumer' && (
//               <li className="nav-item">
//                 <Link className="nav-link fw-medium" to="/cart">Cart</Link>
//               </li>
//             )}
//             {user?.role === 'farmer' && (
//               <li className="nav-item">
//                 <Link className="nav-link fw-medium" to="/dashboard">My Products</Link>
//               </li>
//             )}
//             {user ? (
//               <li className="nav-item">
//                 <button
//                   className="btn btn-outline-light btn-sm rounded-pill px-3"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </li>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     className="btn btn-outline-light btn-sm rounded-pill px-3"
//                     to="/login"
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="btn btn-light btn-sm rounded-pill px-3 text-success fw-semibold"
//                     to="/register"
//                   >
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, setUser, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); // ✅ only remove token, NOT cart
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm sticky-top">
      <div className="container">
        {/* Brand on the left */}
        <Link className="navbar-brand fw-bold fs-4" to="/">🌿 FarmCart</Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav items on right */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/products">Shop</Link>
            </li>

            {user?.role === 'consumer' && (
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/cart">Cart</Link>
              </li>
            )}
            {user?.role === 'farmer' && (
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/dashboard">My Products</Link>
              </li>
            )}

            {user ? (
              <li className="nav-item ms-lg-2">
                <button
                  className="btn btn-outline-light btn-sm rounded-pill px-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-light btn-sm rounded-pill px-3"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-light btn-sm rounded-pill px-3 text-success fw-semibold"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
