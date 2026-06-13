import React, { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useLocation
} from "react-router-dom";

export default function VerifyOtp() {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp
        }
      );

      alert("OTP Verified");

      navigate("/reset-password", {
        state: { email }
      });

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Invalid OTP"
      );

    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{maxWidth:"400px"}}>
        <h3 className="text-center">Verify OTP</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            className="form-control my-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">
            Verify OTP
          </button>

        </form>
      </div>
    </div>
  );
}