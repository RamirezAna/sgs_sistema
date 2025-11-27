import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerLogo from './Configuracion/SpinnerLogo';
import MensajeValidacion from './Mensajes/MensajeValidacion';
import { InicioSesionAPI } from './PeticionesAPI/peticionesAPI';
import Layout from 'antd/es/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { limpiardatos } from './Configuracion/LimpiarDatos';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!username) {
      newErrors.username = 'El usuario es requerido';
    } else if (username.length < 3) {
      newErrors.username = 'El usuario debe tener al menos 3 caracteres';
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
      // setIsLoading(true);
        try {
          setProcesando(true);
            const { token, refresh, sesion, user, last_login } = await InicioSesionAPI(username, password);
        
            const userData = {
              token,
              refreshToken: refresh,
              sesion,
              user,
              last_login,
            };
        
            localStorage.setItem('userData', JSON.stringify(userData));
         
            navigate('/Home'); 
             } catch (error) {
            console.error('Error aqui:', error);
             setProcesando(false);

            if (error.message) {
               // console.log('Mensaje de error:', errorMessage);
              if (username=='' && password==''){
                MensajeValidacion(`Atención: Ingrese Usuario y/o Contraseña`, "warning");
 
              } else if (username=='' &&  password!=''){
                MensajeValidacion(`Atención: Usuario se encuentra vacía`, "warning");
              }else if 
              (password=='' && username!=''){
                MensajeValidacion(`Atención: Contraseña se encuentra vacía`, "warning");
              }else{
                MensajeValidacion(`Atención: Usuario y/o contraseña Incorrectas`, "warning");
              }
              limpiardatos();
              setProcesando(false);
              await new Promise(resolve => setTimeout(resolve, 2000))
              navigate('/'); 
            } else {
               setProcesando(false);
            }
             }
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

  const ElPasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
  <Layout>
    <div className="login-container">
      <div className="login-row">
        <div className="login-card-wrapper">
          <div className="card login-card">
            {/* cabecera */}
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

                {/* Usuario */}
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    <i className="bi bi-person me-2"></i>Usuario
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      clearError('username');
                    }}
                    placeholder="Ingresa tu usuario"
                    disabled={isLoading}
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback d-flex align-items-center">
                      <i className="bi bi-x-circle me-2"></i>
                      {errors.username}
                    </div>
                  )}
                </div>

                {/*  Contraseña */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-key me-2"></i>Contraseña
                  </label>
                  <input
                    // type="password"
                    type={passwordVisible ? 'text' : 'password'}
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
                   <span className="show-password-icon" onClick={ElPasswordVisible}>
                    <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} className="eye-icon" />
                  </span>
                  {errors.password && (
                    <div className="invalid-feedback d-flex align-items-center">
                      <i className="bi bi-x-circle me-2"></i>
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* ingresar */}
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
       {procesando && (
          // <Spinner label="Iniciando..."></Spinner>
          <SpinnerLogo loading={procesando} />
          )}
  </Layout>

  );

};

export default Login;