import Swal from 'sweetalert2';

const VentanaEmergente = (userName) => {
  const style = document.createElement('style');
  style.innerHTML = `
    .welcome-popup .swal2-title {
      color: #2c3e50;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .welcome-popup .swal2-html-container {
      font-size: 16px;
      line-height: 1.5;
    }
    .welcome-icon {
      font-size: 48px;
      color: #3498db;
      margin-bottom: 20px;
      animation: bounce 1s ease infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .welcome-info {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 10px;
      margin-top: 20px;
      text-align: left;
    }
    .welcome-info-item {
      display: flex;
      align-items: center;
      margin: 8px 0;
      color: #5a6c7d;
      font-size: 14px;
    }
    .welcome-info-item i {
      margin-right: 10px;
      width: 20px;
      text-align: center;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animated {
      animation-duration: 0.5s;
      animation-fill-mode: both;
    }
    .fadeInUp {
      animation-name: fadeInUp;
    }
    .welcome-popup {
      border-radius: 20px !important;
      padding: 2rem !important;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }
  `;
  
  document.head.appendChild(style);

  // FontAwesome este disponible
  if (!document.querySelector('#fontawesome-cdn')) {
    const link = document.createElement('link');
    link.id = 'fontawesome-cdn';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }

  return Swal.fire({
    title: '<strong>¡Bienvenido al Sistema!</strong>',
    html: `
      <div style="text-align: center;">
        <div class="welcome-icon">
          <i class="fas fa-handshake"></i>
        </div>
        <h3 style="color: #2c3e50; margin-bottom: 10px; font-size: 22px;">Hola, ${userName}</h3>
        <p style="color: #7f8c8d; font-size: 16px; margin-bottom: 0;">
          Has iniciado sesión exitosamente en el Sistema de Gestión Stock
        </p>      
      </div>
    `,
    icon: 'success',
    iconColor: '#3498db',
    showConfirmButton: true,
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#3498db',
    background: '#ffffff',
    backdrop: 'rgba(52, 152, 219, 0.1)',
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: 'welcome-popup animated fadeInUp',
    },
    willClose: () => {
      // Limpiar estilos cuando se cierra
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }
  });
};

//   <div class="welcome-info">
//           <div class="welcome-info-item">
//             <i class="fas fa-clock" style="color: #3498db;"></i>
//             <span>Fecha: ${new Date().toLocaleDateString('es-ES', { 
//               weekday: 'long', 
//               year: 'numeric', 
//               month: 'long', 
//               day: 'numeric' 
//             })}</span>
//           </div>
//           <div class="welcome-info-item">
//             <i class="fas fa-user-check" style="color: #2ecc71;"></i>
//             <span>Sesión iniciada correctamente</span>
//           </div>
//         </div>

// mostrar error de login
export const showLoginError = (message = 'Usuario y/o contraseña incorrectos') => {
  return Swal.fire({
    title: 'Error de Autenticación',
    text: message,
    icon: 'error',
    iconColor: '#e74c3c',
    confirmButtonText: 'Intentar nuevamente',
    confirmButtonColor: '#3498db',
    background: '#fff',
    backdrop: 'rgba(231, 76, 60, 0.1)',
    customClass: {
      popup: 'animated fadeIn'
    }
  });
};

export default VentanaEmergente;