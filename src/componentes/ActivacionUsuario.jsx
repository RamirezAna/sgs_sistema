import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faCheckCircle, faExclamationCircle, faKey } from '@fortawesome/free-solid-svg-icons';
import Layout from 'antd/es/layout/layout';
import SpinnerLogo from './Configuracion/SpinnerLogo';
import Notificacion from './Mensajes/Notificacion';
import './Login.css';
import { peticionAPI } from './PeticionesAPI/PeticionGlobal';

const ActivacionUsuario = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioFromLogin = location.state?.usuario || '';

  const [formData, setFormData] = useState({
    user: usuarioFromLogin,
    passtemp: '',
    pass1: '',
    pass2: ''
  });

  const [errors, setErrors] = useState({});
  const [procesando, setProcesando] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({
    passtemp: false,
    pass1: false,
    pass2: false
  });
  const [isFocused, setIsFocused] = useState({
    user: false,
    passtemp: false,
    pass1: false,
    pass2: false
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.user.trim()) {
      newErrors.user = 'El usuario es requerido';
    }
    
    if (!formData.passtemp.trim()) {
      newErrors.passtemp = 'La contraseña temporal es requerida';
    }
    
    // if (!formData.pass1.trim()) {
    //   newErrors.pass1 = 'La nueva contraseña es requerida';
    // } else if (formData.pass1.length < 6) {
    //   newErrors.pass1 = 'La contraseña debe tener al menos 6 caracteres';
    // }
    
    // if (!formData.pass2.trim()) {
    //   newErrors.pass2 = 'Debe confirmar la contraseña';
    // } else if (formData.pass1 !== formData.pass2) {
    //   newErrors.pass2 = 'Las contraseñas no coinciden';
    // }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setProcesando(true);
    
    try {
      const body = {
              user: formData.user,
              passtemp: formData.passtemp,
              pass1: formData.pass1,
              pass2: formData.pass2
            };

      const endpoint = `ActivacionUsuario/`;
      const result = await peticionAPI(endpoint, 'POST', body);

      if (result.resultres===201) {
        Notificacion.success(result.message);         
      } else {
        Notificacion.error(result.resuldata.error);
      }
      
    } catch (error) {
      console.error('Error en activación:', error);
      Notificacion.error('Error en el proceso de activación. Por favor, intente nuevamente.');
    } finally {
      setProcesando(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearError(field);
    
    // Validar coincidencia de contraseñas en tiempo real
    // if (field === 'pass1' || field === 'pass2') {
    //   if (field === 'pass1' && formData.pass2 && value !== formData.pass2) {
    //     setErrors(prev => ({ ...prev, pass2: 'Las contraseñas no coinciden' }));
    //   } else if (field === 'pass2' && formData.pass1 && value !== formData.pass1) {
    //     setErrors(prev => ({ ...prev, pass2: 'Las contraseñas no coinciden' }));
    //   } else if (field === 'pass2' && formData.pass1 && value === formData.pass1) {
    //     clearError('pass2');
    //   }
    // }
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

  const togglePasswordVisibility = (field) => {
    setPasswordVisible(prev => ({ ...prev, [field]: !prev[field] }));
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
                <h2 className="login-heading-responsive mb-2">
                  Activación de Usuario
                </h2>
                <small className="login-subtitle">Configure su contraseña permanente</small>
              </div>
              
              {/* Body */}
              <div className="card-body login-body">
                <form onSubmit={handleSubmit} className="login-form" noValidate>
                  
                  {/* Usuario */}
                  <div className="login-form-group mb-4">
                    <label htmlFor="user" className={`form-label ${isFocused.user || formData.user ? 'form-label-active' : ''}`}>
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Usuario
                    </label>
                    <div className="login-input-container">
                      <input
                        type="text"
                        className={`form-control login-input ${errors.user ? 'is-invalid' : ''} ${isFocused.user ? 'login-input-focused' : ''}`}
                        id="user"
                        value={formData.user}
                        onChange={(e) => handleChange('user', e.target.value)}
                        onFocus={() => handleFocus('user')}
                        onBlur={() => handleBlur('user')}
                        placeholder=" "
                        disabled={procesando}
                        required
                      />
                      {!formData.user && !isFocused.user && (
                        <div className="login-input-placeholder">
                          Ingrese su Usuario
                        </div>
                      )}
                    </div>
                    {errors.user && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                        {errors.user}
                      </div>
                    )}
                  </div>

                  {/* Contraseña Temporal */}
                  <div className="login-form-group mb-4 password-input-container">
                    <label htmlFor="passtemp" className={`form-label ${isFocused.passtemp || formData.passtemp ? 'form-label-active' : ''}`}>
                      <FontAwesomeIcon icon={faKey} className="me-2" />
                      Contraseña Temporal
                    </label>
                    <div className="login-input-container position-relative">
                      <input
                        type={passwordVisible.passtemp ? 'text' : 'password'}
                        className={`form-control login-input ${errors.passtemp ? 'is-invalid' : ''} ${isFocused.passtemp ? 'login-input-focused' : ''}`}
                        id="passtemp"
                        value={formData.passtemp}
                        onChange={(e) => handleChange('passtemp', e.target.value)}
                        onFocus={() => handleFocus('passtemp')}
                        onBlur={() => handleBlur('passtemp')}
                        placeholder=" "
                        disabled={procesando}
                        required
                      />
                      {!formData.passtemp && !isFocused.passtemp && (
                        <div className="login-input-placeholder">
                          Ingrese contraseña temporal
                        </div>
                      )}
                      <button 
                        type="button"
                        className="login-password-toggle"
                        onClick={() => togglePasswordVisibility('passtemp')}
                        disabled={procesando}
                        aria-label={passwordVisible.passtemp ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        <FontAwesomeIcon 
                          icon={passwordVisible.passtemp ? faEyeSlash : faEye} 
                          className={`password-toggle-icon ${passwordVisible.passtemp ? 'password-visible' : ''}`}
                        />
                      </button>
                    </div>
                    {errors.passtemp && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                        {errors.passtemp}
                      </div>
                    )}
                  </div>

                  {/* Nueva Contraseña */}
                  <div className="login-form-group mb-4 password-input-container">
                    <label htmlFor="pass1" className={`form-label ${isFocused.pass1 || formData.pass1 ? 'form-label-active' : ''}`}>
                      <FontAwesomeIcon icon={faLock} className="me-2" />
                      Nueva Contraseña
                    </label>
                    <div className="login-input-container position-relative">
                      <input
                        type={passwordVisible.pass1 ? 'text' : 'password'}
                        className={`form-control login-input ${errors.pass1 ? 'is-invalid' : ''} ${isFocused.pass1 ? 'login-input-focused' : ''}`}
                        id="pass1"
                        value={formData.pass1}
                        onChange={(e) => handleChange('pass1', e.target.value)}
                        onFocus={() => handleFocus('pass1')}
                        onBlur={() => handleBlur('pass1')}
                        placeholder=" "
                        disabled={procesando}
                        required
                      />
                      {!formData.pass1 && !isFocused.pass1 && (
                        <div className="login-input-placeholder">
                          Ingrese nueva contraseña
                        </div>
                      )}
                      <button 
                        type="button"
                        className="login-password-toggle"
                        onClick={() => togglePasswordVisibility('pass1')}
                        disabled={procesando}
                        aria-label={passwordVisible.pass1 ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        <FontAwesomeIcon 
                          icon={passwordVisible.pass1 ? faEyeSlash : faEye} 
                          className={`password-toggle-icon ${passwordVisible.pass1 ? 'password-visible' : ''}`}
                        />
                      </button>
                    </div>
                    {errors.pass1 && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                        {errors.pass1}
                      </div>
                    )}
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="login-form-group mb-4 password-input-container">
                    <label htmlFor="pass2" className={`form-label ${isFocused.pass2 || formData.pass2 ? 'form-label-active' : ''}`}>
                      <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                      Confirmar Contraseña
                    </label>
                    <div className="login-input-container position-relative">
                      <input
                        type={passwordVisible.pass2 ? 'text' : 'password'}
                        className={`form-control login-input ${errors.pass2 ? 'is-invalid' : ''} ${isFocused.pass2 ? 'login-input-focused' : ''}`}
                        id="pass2"
                        value={formData.pass2}
                        onChange={(e) => handleChange('pass2', e.target.value)}
                        onFocus={() => handleFocus('pass2')}
                        onBlur={() => handleBlur('pass2')}
                        placeholder=" "
                        disabled={procesando}
                        required
                      />
                      {!formData.pass2 && !isFocused.pass2 && (
                        <div className="login-input-placeholder">
                          Confirme su contraseña
                        </div>
                      )}
                      <button 
                        type="button"
                        className="login-password-toggle"
                        onClick={() => togglePasswordVisibility('pass2')}
                        disabled={procesando}
                        aria-label={passwordVisible.pass2 ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        <FontAwesomeIcon 
                          icon={passwordVisible.pass2 ? faEyeSlash : faEye} 
                          className={`password-toggle-icon ${passwordVisible.pass2 ? 'password-visible' : ''}`}
                        />
                      </button>
                    </div>
                    {errors.pass2 && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                        {errors.pass2}
                      </div>
                    )}
                  </div>

                  {/* Botones */}
                  <div className="d-grid gap-2 mb-3">
                    <button 
                      type="submit" 
                      className="btn login-btn text-white"
                      disabled={procesando}
                    >
                      {procesando ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          <span className="login-btn-text">Activando Usuario...</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                          <span className="login-btn-text">Activar Usuario</span>
                        </>
                      )}
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/')}
                      disabled={procesando}
                    >
                      Volver al Login
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

export default ActivacionUsuario;