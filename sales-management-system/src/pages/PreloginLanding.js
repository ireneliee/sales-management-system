import React from 'react';
import SignIn from '../components/SignIn';
import '../styling/preloginLanding.css'
const PreloginLanding = () => {
  return (
    <div className="pre-login-landing-page">
      <header className="pre-login-landing-header">
        <img id = "landing-page-pic" src="/images/sales-landing-page-pic.png" alt="Sales Management System Landin Picture" />
      </header>
      <div className = "pre-login-landing-content">
        <SignIn/>
      </div>
    </div>
  );
};

export default PreloginLanding;