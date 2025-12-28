// src/pages/Login.jsx
import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import logo from '../assets/dermo.png';
import '../styles/login.css';

const Login = () => {
  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Dermo Estética" />
          <h3>DERMO ESTÉTICA</h3>
        </div>

        <div className="login-body">
          <div className="welcome">
            <h2 className="welcome-title">Bienvenido</h2>
            
          </div>

          <div className="form-card">
            <LoginForm />
          </div>

          <p className="login-footer-note">© {new Date().getFullYear()} Dermo Estética - create by AndesCode</p>
        </div>
      </div>
    </div>
  );
};

export default Login;