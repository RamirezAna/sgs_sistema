import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerLogo from './Configuracion/SpinnerLogo';
import { InicioSesionAPI } from './PeticionesAPI/peticionesAPI';
import Layout from 'antd/es/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faSignInAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import VentanaEmergente from './VentanaEmergente';
import Notificacion from './Mensajes/Notificacion';
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) return;
      
      setProcesando(true);
      
      try {
        const { token, refresh, sesion, user_name } = await InicioSesionAPI(username, password);
        
        // Guardar datos del usuario
        const userData = {
          token,
          refreshToken: refresh,
          sesion,
          user: user_name,
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // ventana emergente
        VentanaEmergente(user_name);
        
        // login exitoso
        if (onLogin) {
          onLogin(userData);
        }
        
      } catch (error) {
         
        if (error) {
          let errorMessage;
          setProcesando(false);

          console.log("error.message ==> ", error);

          // Verificar si es error de contraseña activacion
          if (error.includes('activacion') || error.status === 403 || error.includes('activar')) {
            Notificacion.warning('Su usuario requiere activación. Será redirigido para configurar su contraseña.');
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Redirigir a la pagina de activacion con el nombre de usuario
            navigate('/activacion-usuario', { state: { usuario: username } });
            return;
          }

          // Validaciones normales
          if (!username.trim() && !password.trim()) {
            errorMessage = 'Atención: Ingrese Usuario y/o Contraseña';
            Notificacion.warning(errorMessage);
          } else if (!username.trim()) {
            errorMessage = 'Atención: Usuario se encuentra vacía';
            Notificacion.warning(errorMessage);
          } else if (!password.trim()) {
            errorMessage = 'Atención: Contraseña se encuentra vacía';
            Notificacion.warning(errorMessage);
          }
          //  else {
          //   errorMessage = 'Atención: Usuario y/o contraseña Incorrectas';
          // }
          
          
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } else {
          Notificacion.warning('Error en el proceso de autenticación');
        }
        
        navigate('/');
        
      } finally {
        setProcesando(false);
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

  const handleActivarUsuario = () => {
    navigate('/activacion-usuario', { state: { usuario: username } });
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-row">
          <div className="login-card-wrapper">
            <div className="card login-card">
              {/* Cabecera */}
              <div className="card-header login-header text-white">
                <h2 className="login-heading-responsive mb-2">
                  Acceso al Sistema
                </h2>  
                <small className="login-subtitle">Sistema de Gestión Stock</small>
              </div>
              
              {/* Body */}
              <div className="card-body login-body">
                <div className="login-form">
                  
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
                  <div className="d-grid mb-3">
                    <button 
                      type="button"
                      className="btn login-btn text-white"
                      onClick={handleSubmit}
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

                  {/* Enlace para activar usuario */}
                  <div className="text-center">
                    <button 
                      type="button"
                      className="btn btn-link text-decoration-none"
                      onClick={handleActivarUsuario}
                      disabled={isLoading}
                      style={{ fontSize: '0.9rem' }}
                    >
                      ¿Tienes una contraseña temporal? Activa tu usuario aquí
                    </button>
                  </div>
                </div>
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