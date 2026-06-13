import React, { useState } from "react";
import axios from "axios";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

export default function ResetPassword() {

  const [password, setPassword] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          newPassword: password
        }
      );

      alert(
        "Password Updated Successfully"
      );

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Reset Failed"
      );

    }

  };

  return (
    <div className="container mt-5">

      <div className="card p-4 mx-auto" style={{maxWidth:"400px"}}>

        <h3 className="text-center">
          Reset Password
        </h3>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            className="form-control my-3"
            placeholder="New Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button className="btn btn-danger w-100">
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}