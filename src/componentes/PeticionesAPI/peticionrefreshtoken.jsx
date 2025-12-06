import datosStorage  from '../Configuracion/DatosStorage.jsx'
import { BASE_URL } from './datosApi.jsx';  

export const fetchrefresh = async () => {

    // const cokietokenrefresh = localStorage.getItem('refreshToken');
    const datos = datosStorage('obtener');
    const { refreshToken: cokietokenrefresh } = datos;

    const cuerpo={'refresh':cokietokenrefresh}
    
    const requestOptions = {
            method: 'POST',
            headers: {  'Content-Type': 'application/json'
                                              
                    },
            body: JSON.stringify(cuerpo)
    }
    
    datosStorage('limpiar', 'token');
    datosStorage('limpiar', 'refreshToken');

  try {
    const response = await fetch(BASE_URL,requestOptions);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data= await response.json();
    const resp= response.status;
    
    const datos={data,resp}
    
   
    const token = datos['data']['access']
    // localStorage.setItem('token', token)
    datosStorage('agregarActualizar', null, { key: 'token', value: token });

    const tokenrefresh =datos['data']['refresh']
    // localStorage.setItem('refreshToken', tokenrefresh)
    datosStorage('agregarActualizar', null, { key: 'refreshToken', value: tokenrefresh });

    return datos
  } catch (error) {
    console.error('Error en la función fetchData:', error.message);
    throw error;
  }
};
