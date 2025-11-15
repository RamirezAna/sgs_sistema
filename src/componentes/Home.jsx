import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const hLogout = () => {
    onLogout();
    navigate('/');
  };

  const irModuloClick = (module) => {
     console.log(`Navegando al módulo: ${module}`);
    // Ejemplo: navigate(`/${module}`);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow home-navbar">
        <div className="container">
          <span className="navbar-brand">
            <i className="bi bi-grid-3x3-gap me-2"></i>
            SGS - Sistema de Gestión
          </span>
          
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle text-white btn btn-link border-0" 
                data-bs-toggle="dropdown"
                style={{ textDecoration: 'none' }}
              >
                <i className="bi bi-person-circle me-1"></i>
                {user || 'Administrador'}
              </button>
              <ul className="dropdown-menu">
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

      {/* Contenido Principal */}
      <div className="container mt-4 mt-md-5">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm home-main-card">
              {/* <div className="card-header home-card-header text-white">
                <h3 className="card-title mb-0 responsive-heading">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Panel de Control Principal
                </h3>
              </div> */}
              <div className="card-body home-card-body responsive-padding">
                {/* info de usuario y acceso rapido */}
                <div className="row">
                  <div className="col-md-6 mb-4 mb-md-0 user-info-section">
                    <h5 className="responsive-text">
                      <i className="bi bi-person-badge me-2"></i>
                      Información del Usuario
                    </h5>
                    <ul className="list-group user-info-list">
                      <li className="list-group-item">
                        <strong>Usuario:</strong> {user || 'Administrador'}
                      </li>
                      <li className="list-group-item">
                        <strong>Rol:</strong> Administrador
                      </li>
                      <li className="list-group-item">
                        <strong>Último acceso:</strong> {new Date().toLocaleString('es-ES')}
                      </li> 
                    </ul>
                  </div>
                  
                  <div className="col-md-6 quick-actions-section">
                    <h5 className="responsive-text">
                      <i className="bi bi-lightning me-2"></i>
                      Acciones Rápidas
                    </h5>
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-primary quick-actions-btn">
                        <i className="bi bi-plus-circle me-2"></i>
                        Nueva Venta
                      </button>
                      <button className="btn btn-outline-success quick-actions-btn">
                        <i className="bi bi-cart-plus me-2"></i>
                        Nueva Compra
                      </button>
                      <button className="btn btn-outline-info quick-actions-btn">
                        <i className="bi bi-clipboard-data me-2"></i>
                        Ver Reportes
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="quick-stats">
                  <div className="stat-item">
                    <span className="stat-number">Gs. 25.000.000</span>
                    <span className="stat-label">Ventas del Mes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number"> Gs. 18.450.000</span>
                    <span className="stat-label">Compras del Mes</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">156</span>
                    <span className="stat-label">Productos en Stock</span>
                  </div>
                  {/* <div className="stat-item">
                    <span className="stat-number">23</span>
                    <span className="stat-label">Clientes Activos</span>
                  </div> */}
                {/* </div>  */}

                {/* mmodulos del sistema */}
                <div className="col-md-100 quick-actions-sectionModulo">
                  {/* <h5 className="responsive-text">
                    <i className="bi bi-grid-3x3-gap "></i>
                    Módulos del Sistema
                  </h5> */}

                  <h5 className="responsive-text">
                      <i className="bi bi-grid-3x3-gap me-2"></i>
                        Módulos del Sistema
                    </h5>
                  <div className="modules-grid">
                    <div className="module-card inventory" onClick={() => irModuloClick('inventario')}>
                      <i className="bi bi-box-seam module-icon"></i>
                      <div className="module-title">Gestión de Inventario</div>
                      <div className="module-description">
                        Control de stock, productos y categorías
                      </div>
                    </div>
                    
                  <div className="module-card sales" onClick={() => irModuloClick('ventas')}>
                  <span className="module-icon guarani-icon">Gs</span>
                  <div className="module-title">Ventas</div>
                  <div className="module-description">
                    Facturación, clientes y cotizaciones
                  </div>
                </div>
                    
                    <div className="module-card purchases" onClick={() => irModuloClick('compras')}>
                      <i className="bi bi-cart-check module-icon"></i>
                      <div className="module-title">Compras</div>
                      <div className="module-description">
                        Proveedores y órdenes de compra
                      </div>
                    </div>
                    
                    <div className="module-card accounting" onClick={() => irModuloClick('contabilidad')}>
                      <i className="bi bi-calculator module-icon"></i>
                      <div className="module-title">Contabilidad</div>
                      <div className="module-description">
                        Estados financieros y reportes
                      </div>
                    </div>
                    
                    <div className="module-card reports" onClick={() => irModuloClick('reportes')}>
                      <i className="bi bi-graph-up module-icon"></i>
                      <div className="module-title">Reportes</div>
                      <div className="module-description">
                        Análisis y estadísticas del negocio
                      </div>
                    </div>
                    
                    <div className="module-card settings" onClick={() => irModuloClick('configuracion')}>
                      <i className="bi bi-gear module-icon"></i>
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
  );
};

export default Home;