import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BrowseProducts from './pages/BrowseProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import ProductDetail from './pages/ProductDetails';

import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import ThankYou from './pages/ThankYou';
import ProductDetails from './pages/ProductDetails';


import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';


import TextType from './components/TextType';

import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
  return (
    <>



<TextType 
  text={["Text typing effect", "for your websites", "Happy coding!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>    





    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<BrowseProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<FarmerDashboard />} />
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart />} /> <Route path="/thankyou" element={<ThankYou />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<TermsOfService />} />
  <Route path="/contact" element={<ContactUs />} />


<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/verify-otp"
  element={<VerifyOtp />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      </Routes>
    </Router>

    </>
  );
}

export default App;
