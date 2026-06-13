import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email }
      );

      alert("OTP Sent Successfully");

      navigate("/verify-otp", {
        state: { email }
      });

    } catch (err) {
      alert(
        err.response?.data?.error ||
        "Failed to send OTP"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{maxWidth:"400px"}}>
        <h3 className="text-center">Forgot Password</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control my-3"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <button className="btn btn-success w-100">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}