import React, { useState } from 'react';
import { peticionAPI } from '../PeticionesAPI/PeticionGlobal';
import Notificacion from '../Mensajes/Notificacion';
import SpinnerLogo from '../Configuracion/SpinnerLogo';
import './ConfiguracionMenu.css';

const ConfiguracionMenu = ({ onClose, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showUserForm, setShowUserForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    user: '',
    correo: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const configOptions = [
    { id: 'general', label: 'General', icon: 'bi-gear' },
    { id: 'usuarios', label: 'Usuarios', icon: 'bi-people' },
    // { id: 'empresa', label: 'Empresa', icon: 'bi-building' },
     { id: 'seguridad', label: 'Seguridad', icon: 'bi-shield' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // validacion nombre y cñia
    if (!formData.nombre || !formData.apellido || !formData.user || !formData.correo) {
       Notificacion.warning( `Por favor complete todos los campos`);
      setLoading(false);
      return;
    }

    // validacion de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      Notificacion.warning( `Por favor ingrese un correo electrónico válido`);
      setLoading(false);
      return;
    }

    try {
       const body = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        user: formData.user,
        correo: formData.correo
      };

      const endpoint = `RegistroUsuario/`;
      const result = await peticionAPI(endpoint, 'POST', body);
  
      console.log("result ==> ", result);
      
      if (result.resultres===201) {
       
        Notificacion.success(`Registro exitoso, para el usuario ${formData.user}.`);
        // Limpiar formulario
        setFormData({
          nombre: '',
          apellido: '',
          user: '',
          correo: ''
        });
        setShowUserForm(false);
        setLoading(false);

      }  else if (result.resultres === 403 || result.resultres === 401) {
        setLoading(false);
        navigate('/Closesesion');
      } else {
         setLoading(false);
       }
    } catch (error) {
      console.error('Error:', error);
       setLoading(false);
    }
  };

    const renderContent = () => {
    switch(activeTab) {
      case 'general':
        return (
          <div className="config-content">
            <h4><i className="bi bi-gear me-2"></i>Configuración General</h4>
            <div className="form-section">
              <div className="mb-3">
                <label className="form-label">Nombre del Sistema</label>
                <input type="text" className="form-control" defaultValue="SGS - Sistema de Gestión" />
              </div>
              {/* <div className="mb-3">
                <label className="form-label">Moneda</label>
                <select className="form-select">
                  <option value="PYG">Guaraní (Gs)</option>
                  <option value="USD">Dólar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Formato de Fecha</label>
                <select className="form-select">
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div> */}
            </div>
          </div>
        );
      
      case 'usuarios':
        return (
          <div className="config-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4><i className="bi bi-people me-2"></i>Gestión de Usuarios</h4>
              <button 
                className="btn btn-primary"
                onClick={() => setShowUserForm(true)}
              >
                <i className="bi bi-plus-circle me-1"></i>
                Nuevo Usuario
              </button>
            </div>

            {showUserForm ? (
              <div className="user-form-section">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-person-plus me-2"></i>
                      Registrar Nuevo Usuario
                    </h5>
                  </div>
                  <div className="card-body">
                    {message && (
                      <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'}`}>
                        {message}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Nombre *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Apellido *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Usuario *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="user"
                            value={formData.user}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Correo Electrónico *</label>
                          <input
                            type="email"
                            className="form-control"
                            name="correo"
                            value={formData.correo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowUserForm(false);
                            setFormData({
                              nombre: '',
                              apellido: '',
                              user: '',
                              correo: ''
                            });
                          }}
                        >
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                          <i className="bi bi-check-circle me-1"></i>
                          Registrar Usuario
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="users-list-section">
                <p>Seleccione "Nuevo Usuario" para registrar un nuevo usuario en el sistema.</p>
                {/* <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>admin</strong>
                      <div className="text-muted small">Administrador del sistema</div>
                    </div>
                    <span className="badge bg-primary">Activo</span>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        );

    //   case 'empresa':
    //     return (
    //       <div className="config-content">
    //         <h4><i className="bi bi-building me-2"></i>Información de la Empresa</h4>
    //         <div className="form-section">
    //           <div className="mb-3">
    //             <label className="form-label">Nombre de la Empresa</label>
    //             <input type="text" className="form-control" placeholder="Ingrese el nombre de la empresa" />
    //           </div>
    //           <div className="mb-3">
    //             <label className="form-label">RUC</label>
    //             <input type="text" className="form-control" placeholder="Ingrese el RUC" />
    //           </div>
    //           <div className="mb-3">
    //             <label className="form-label">Dirección</label>
    //             <textarea className="form-control" rows="3" placeholder="Ingrese la dirección"></textarea>
    //           </div>
    //         </div>
    //       </div>
    //     );
 
    //   case 'seguridad':
    //     return (
    //       <div className="config-content">
    //         <h4><i className="bi bi-shield me-2"></i>Seguridad</h4>
    //         <div className="form-section">
    //           <div className="mb-3">
    //             <label className="form-label">Cambiar Contraseña</label>
    //             <input type="password" className="form-control" placeholder="Nueva contraseña" />
    //           </div>
    //           <div className="mb-3">
    //             <label className="form-label">Confirmar Contraseña</label>
    //             <input type="password" className="form-control" placeholder="Confirmar nueva contraseña" />
    //           </div>
    //           <div className="mb-3 form-check">
    //             <input type="checkbox" className="form-check-input" id="autoLogout" />
    //             <label className="form-check-label" htmlFor="autoLogout">
    //               Cierre de sesión automático (30 minutos)
    //             </label>
    //           </div>
    //         </div>
    //       </div>
    //     );

      default:
        return null;
    }
  };

  return (
    <div className="configuracion-menu-overlay" onClick={onClose}>
      <div className={`configuracion-menu ${isDarkMode ? 'dark-mode' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="config-menu-header">
          <h3>
            <i className="bi bi-gear me-2"></i>
            Configuración del Sistema
          </h3>
          <button className="btn-close-config" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Contenido */}
        <div className="config-menu-content">
          {/* Sidebar */}
          <div className="config-sidebar">
            <ul className="config-nav">
              {configOptions.map(option => (
                <li 
                  key={option.id}
                  className={activeTab === option.id ? 'active' : ''}
                  onClick={() => {
                    setActiveTab(option.id);
                    setShowUserForm(false);
                  }}
                >
                  <i className={`bi ${option.icon} me-2`}></i>
                  {option.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Panel de contenido */}
          <div className="config-main-panel">
            {renderContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="config-menu-footer">
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-save me-1"></i>
            Guardar Cambios
          </button>
        </div>
      </div>
        
          <SpinnerLogo loading={loading} />

    </div>
  );
};

export default ConfiguracionMenu;
