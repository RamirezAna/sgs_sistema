import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerLogo from './Configuracion/SpinnerLogo';
import { InicioSesionAPI } from './PeticionesAPI/peticionesAPI';
import Layout from 'antd/es/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faSignInAlt, faShieldAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import VentanaEmergente from './VentanaEmergente';
import logoAcceso from '../assets/icono.png';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({ username: false, password: false });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
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

  const limpiarDatos = () => {
    setUsername('');
    setPassword('');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setProcesando(true);
      
      try {
        const { token, refresh, sesion, user_name } = await InicioSesionAPI(username, password);
    
        const userData = {
          token,
          refreshToken: refresh,
          sesion,
          user: user_name,
        };
    
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // ventana emergente 
        VentanaEmergente(user_name);
        
         if (onLogin) {
          onLogin(userData);
        }
        
        // ir 2 segundos para que se vea el mensaje
        setTimeout(() => {
          navigate('/home');
        }, 2000);
        
      } catch (error) {
        console.error('Error en login:', error);
        
        // error desde el componente separado
        showLoginError('Usuario y/o contraseña incorrectos');
        
        limpiarDatos();
      } finally {
        setIsLoading(false);
        setProcesando(false);
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-row">
          <div className="login-card-wrapper">
            <div className="card login-card">
              {/* Cabecera */}
              <div className="card-header login-header text-white">
                {/* <div className="login-header-icon">  
                  {/* <FontAwesomeIcon icon={faShieldAlt} /> */}
                   {/* <img src={logoAcceso} alt="Logo" className="logo" />
                  </div>     */}
                   <h2 className="login-heading-responsive mb-2">
                  Acceso al Sistema
                </h2>  
                <small className="login-subtitle">Sistema de Gestión Stock</small>
              </div>
              
              {/* Body */}
              <div className="card-body login-body">
                <form onSubmit={handleSubmit} className="login-form" noValidate>
                  
                  {errors.submit && (
                    <div className="alert alert-danger d-flex align-items-center login-alert" role="alert">
                      <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                      <small>{errors.submit}</small>
                    </div>
                  )}

                  {/* Usuario */}
                  <div className="login-form-group mb-4">
                    <label htmlFor="username" className={`form-label ${isFocused.username || username ? 'form-label-active' : ''}`}>
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Usuario
                    </label>
                    <div className="login-input-container">
                      <input
                        type="text"
                        className={`form-control login-input ${errors.username ? 'is-invalid' : ''} ${isFocused.username ? 'login-input-focused' : ''}`}
                        id="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          clearError('username');
                        }}
                        onFocus={() => handleFocus('username')}
                        onBlur={() => handleBlur('username')}
                        placeholder=" "
                        disabled={isLoading}
                        required
                      />
                      {!username && !isFocused.username && (
                        <div className="login-input-placeholder">
                          Ingrese su Usuario
                        </div>
                      )}
                    </div>
                    {errors.username && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                        {errors.username}
                      </div>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div className="login-form-group mb-4 password-input-container">
                    <label htmlFor="password" className={`form-label ${isFocused.password || password ? 'form-label-active' : ''}`}>
                      <FontAwesomeIcon icon={faLock} className="me-2" />
                      Contraseña
                    </label>
                    <div className="login-input-container position-relative">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        className={`form-control login-input ${errors.password ? 'is-invalid' : ''} ${isFocused.password ? 'login-input-focused' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearError('password');
                        }}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                        placeholder=" "
                        disabled={isLoading}
                        required
                      />
                      {!password && !isFocused.password && (
                        <div className="login-input-placeholder">
                          Ingrese su Contraseña
                        </div>
                      )}
                      <button 
                        type="button"
                        className="login-password-toggle"
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                        aria-label={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        <FontAwesomeIcon 
                          icon={passwordVisible ? faEyeSlash : faEye} 
                          className={`password-toggle-icon ${passwordVisible ? 'password-visible' : ''}`}
                        />
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Boton de ingreso */}
                  <div className="d-grid mb-4">
                    <button 
                      type="submit" 
                      className="btn login-btn text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          <span className="login-btn-text">Iniciando Sesión...</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                          <span className="login-btn-text">Ingresar al Sistema</span>
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
      
      {procesando && <SpinnerLogo loading={procesando} />}
    </Layout>
  );
};

export default Login;
