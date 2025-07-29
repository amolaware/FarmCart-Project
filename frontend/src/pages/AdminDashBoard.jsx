// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// function AdminDashboard() {
//   const { token } = useContext(AuthContext);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   const fetchAllProducts = () => {
//     axios.get('http://localhost:5000/api/products', {
//       headers: { Authorization: token }
//     })
//     .then(res => setProducts(res.data))
//     .catch(err => alert('You are not admin or cannot load products'));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Delete this product?')) {
//       axios.delete(`http://localhost:5000/api/products/${id}`, {
//         headers: { Authorization: token }
//       })
//       .then(() => setProducts(products.filter(p => p._id !== id)))
//       .catch(err => alert('Delete failed'));
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Admin Dashboard - All Products</h2>
//       <div className="row g-4">
//         {products.map(p => (
//           <div key={p._id} className="col-6 col-md-4 col-lg-3">
//             <div className="card h-100">
//               <img src={p.image || 'https://via.placeholder.com/150'} className="card-img-top" alt={p.name}/>
//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="card-text text-muted">₹{p.price}</p>
//                 <p className="card-text small">Farmer: {p.farmer?.name}</p>
//                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    axios.get('http://localhost:5000/api/products', {
      headers: { Authorization: token }
    })
      .then(res => setProducts(res.data))
      .catch(err => alert('You are not admin or cannot load products'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token }
      })
        .then(() => setProducts(products.filter(p => p._id !== id)))
        .catch(err => alert('Delete failed'));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard - All Products</h2>
      <div className="row g-4">
        {products.map(p => (
          <div key={p._id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100">
              <img src={p.image || 'https://via.placeholder.com/150'} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-muted">₹{p.price}</p>
                <p className="card-text small">Farmer: {p.farmer?.name}</p>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
