import { message } from 'antd';

function MensajeValidacion(mensaje, tipo ) {

  if (mensaje==="validacion"){
      mensaje= '.::Por favor, complete todos los campos obligatorios!::.'
  }else {
    if(mensaje==="CargaDatos"){
      mensaje= '.::Error en la carga de Datos::.'
    }
  }
  
  message[tipo]({
    content: mensaje,
    duration: 1.8,
    style: {
      fontSize: '12px',
      left: '20px',
      position: 'fixed',
      marginTop: '180px',
      right: '20px',
    },
  }); 

}

export default MensajeValidacion;
