import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor, ingresa un email válido';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulación de llamada API
      setTimeout(() => {
        // login exitoso par probar
        if (email === 'admin@sgs.com' && password === '123456') {
          onLogin(true, email);
          navigate('/home');
        } else {
          setErrors({ 
            submit: 'Credenciales incorrectas. Usa: admin@sgs.com / 123456' 
          });
        }
        setIsLoading(false);
      }, 1500);
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-row">
        <div className="login-card-wrapper">
          <div className="card login-card">
            {/* Header */}
            <div className="card-header login-header text-white">
              <h2 className="login-heading-responsive mb-2">
                <i className="bi bi-shield-lock me-2"></i>
                Acceso al Sistema
              </h2>
              <small className="opacity-85">Sistema de Gestión Stock</small>
            </div>
            
            {/* Body */}
            <div className="card-body login-body">
              <form onSubmit={handleSubmit} className="login-form" noValidate>
                
                 {errors.submit && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    <small>{errors.submit}</small>
                  </div>
                )}

                 <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    <i className="bi bi-envelope me-2"></i>Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError('email');
                    }}
                    placeholder="tu@empresa.com"
                    disabled={isLoading}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-flex align-items-center">
                      <i className="bi bi-x-circle me-2"></i>
                      {errors.email}
                    </div>
                  )}
                </div>

                 <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-key me-2"></i>Contraseña
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError('password');
                    }}
                    placeholder="Ingresa tu contraseña"
                    disabled={isLoading}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback d-flex align-items-center">
                      <i className="bi bi-x-circle me-2"></i>
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Button */}
                <div className="d-grid mb-4">
                  <button 
                    type="submit" 
                    className="btn login-btn text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Iniciando Sesión...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Ingresar al Sistema
                      </>
                    )}
                  </button>
                </div>
 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;