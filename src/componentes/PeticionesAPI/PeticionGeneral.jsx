  
import DatosStorage from '../Configuracion/DatosStorage.jsx';
import { BASE_URL } from './datosApi.jsx';  

export const peticiongeneral = async (endpoint, metodo, bodyoptions,navigate) => {

  let data = {};
  let resp = 0;
  let datos = {};
  let message = '';

  const { token, sesion } = DatosStorage('obtener');
  // bodyoptions.SESION=sesion;
   
  if (sesion !== null ) {
    let requestOptions = {};

    if (metodo.toUpperCase() === 'GET') {
      requestOptions = {
        method: metodo.toUpperCase(),
        headers: {
          // 'Sesion': sesion,
          // 'user': user,
          'Authorization': `Bearer ${token}`,
        },
       // body: JSON.stringify(bodyoptions),
      };
    } else {
      requestOptions = {
        method: metodo.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          //'SESION': sesion,
          // 'user': user,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bodyoptions),
      };
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, requestOptions);
    
    data = await response.json();
    resp = response.status;
    message = response.message; 

    datos = { data, resp, message};
  } else {
    data = {};
    datos = 0;
    datos = { data, resp,message };
  }

  return datos;
};