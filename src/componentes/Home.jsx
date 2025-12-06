import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useTheme } from './Tema/TemaContext';
import { limpiardatos } from './Configuracion/LimpiarDatos';
import ConfiguracionMenu from './ConfiguracionMenu/ConfiguracionMenu';
 
const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showConfigMenu, setShowConfigMenu] = useState(false);

  const userData = user || JSON.parse(localStorage.getItem('userData'))?.user || 'Administrador';

  const hLogout = () => {
    limpiardatos();
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  const irModuloClick = (module) => {   
    switch(module) {
      case 'inventario':
        navigate('/inventario');
        break;
      case 'ventas':
        navigate('/ventas');
        break;
      case 'compras':
        navigate('/compras');
        break;
      case 'contabilidad':
        navigate('/contabilidad');
        break;
      case 'reportes':
        navigate('/reportes');
        break;
      case 'configuracion':
        setShowConfigMenu(true); // configuracionMenu mostrad
        break;
      default:
        console.log('módulo no existe:', module);
    }
  };

  const closeConfigMenu = () => {
    setShowConfigMenu(false);
  };

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/*menu de configuracion*/}
      {showConfigMenu && (
        <ConfiguracionMenu onClose={closeConfigMenu} isDarkMode={isDarkMode} />
      )}

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow home-navbar">
        <div className="container">
          <span className="navbar-brand">
            <i className="bi bi-grid-3x3-gap me-2"></i>
            SGS - Sistema de Gestión
          </span>
          
          <div className="navbar-nav ms-auto d-flex align-items-center">
            {/* Toggle del Tema */}
            <button 
              className="btn btn-outline-light me-3 theme-toggle"
              onClick={toggleTheme}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
              <span className="ms-1 d-none d-sm-inline">
                {isDarkMode ? 'Claro' : 'Oscuro'}
              </span>
            </button>
            
            {/* usuario */}
            <div className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle text-white btn btn-link border-0" 
                data-bs-toggle="dropdown"
                style={{ textDecoration: 'none' }}
              >
                <i className="bi bi-person-circle me-1"></i>
                {typeof userData === 'object' ? userData.username || userData.nombre : userData}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={hLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4 mt-md-5">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm home-main-card">
              <div className="card-body home-card-body responsive-padding">
                
                {/* Bienvenida */}
                <div className="welcome-section mb-4">
                  <h4 className="responsive-text text-primary">
                    <i className="bi bi-house-door me-2"></i>
                    Bienvenido, {typeof userData === 'object' ? userData.username || userData.nombre : userData}
                  </h4>
                  <p className="text-muted">Sistema de Gestión Stock - Panel Principal</p>
                </div>

                {/* Acciones rapidas */}
                <div className="quick-actions-section mb-5">
                  <h5 className="responsive-text">
                    <i className="bi bi-lightning me-2"></i>
                    Acciones Rápidas
                  </h5>
                  <div className="quick-actions-grid">
                    <button className="quick-action-card new-sale" onClick={() => irModuloClick('ventas')}>
                      <div className="action-icon">
                        <i className="bi bi-plus-circle"></i>
                      </div>
                      <div className="action-title">Nueva Venta</div>
                      <div className="action-subtitle">Registrar venta</div>
                    </button>
                    
                    <button className="quick-action-card new-purchase" onClick={() => irModuloClick('compras')}>
                      <div className="action-icon">
                        <i className="bi bi-cart-plus"></i>
                      </div>
                      <div className="action-title">Nueva Compra</div>
                      <div className="action-subtitle">Ingresar compra</div>
                    </button>
                    
                    <button className="quick-action-card view-reports" onClick={() => irModuloClick('reportes')}>
                      <div className="action-icon">
                        <i className="bi bi-clipboard-data"></i>
                      </div>
                      <div className="action-title">Ver Reportes</div>
                      <div className="action-subtitle">Estadísticas</div>
                    </button>
                    
                    <button className="quick-action-card quick-inventory" onClick={() => irModuloClick('inventario')}>
                      <div className="action-icon">
                        <i className="bi bi-box-seam"></i>
                      </div>
                      <div className="action-title">Inventario</div>
                      <div className="action-subtitle">Gestionar stock</div>
                    </button>
                  </div>
                </div>

                {/* modulos del Sistema */}
                <div className="quick-actions-sectionModulo">
                  <h5 className="responsive-text">
                    <i className="bi bi-grid-3x3-gap me-2"></i>
                    Módulos del Sistema
                  </h5>
                  <div className="modules-grid">
                    <div className="module-card inventory" onClick={() => irModuloClick('inventario')}>
                      <div className="module-icon-wrapper">
                        <i className="bi bi-box-seam module-icon"></i>
                      </div>
                      <div className="module-content">
                        <div className="module-title">Gestión de Inventario</div>
                        <div className="module-description">
                          Control de stock, productos y categorías
                        </div>
                      </div>
                    </div>
                    
                    <div className="module-card sales" onClick={() => irModuloClick('ventas')}>
                      <div className="module-icon-wrapper">
                        <span className="module-icon guarani-icon">Gs</span>
                      </div>
                      <div className="module-content">
                        <div className="module-title">Ventas</div>
                        <div className="module-description">
                          Facturación, clientes y cotizaciones
                        </div>
                      </div>
                    </div>
                    
                    <div className="module-card purchases" onClick={() => irModuloClick('compras')}>
                      <div className="module-icon-wrapper">
                        <i className="bi bi-cart-check module-icon"></i>
                      </div>
                      <div className="module-content">
                        <div className="module-title">Compras</div>
                        <div className="module-description">
                          Proveedores y órdenes de compra
                        </div>
                      </div>
                    </div>
                    
                    <div className="module-card accounting" onClick={() => irModuloClick('contabilidad')}>
                      <div className="module-icon-wrapper">
                        <i className="bi bi-calculator module-icon"></i>
                      </div>
                      <div className="module-content">
                        <div className="module-title">Contabilidad</div>
                        <div className="module-description">
                          Estados financieros y reportes
                        </div>
                      </div>
                    </div>
                    
                    <div className="module-card reports" onClick={() => irModuloClick('reportes')}>
                      <div className="module-icon-wrapper">
                        <i className="bi bi-graph-up module-icon"></i>
                      </div>
                      <div className="module-content">
                        <div className="module-title">Reportes</div>
                        <div className="module-description">
                          Análisis y estadísticas del negocio
                        </div>
                      </div>
                    </div>
                    
                    <div className="module-card settings" onClick={() => irModuloClick('configuracion')}>
                      <div className="module-icon-wrapper">
                        <i className="bi bi-gear module-icon"></i>
                      </div>
                      <div className="module-content">
                        <div className="module-title">Configuración</div>
                        <div className="module-description">
                          Ajustes del sistema y usuarios
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;