import { BASE_URL } from './datosApi.jsx';  
   
//valida sesion API  token - refresh
async function InicioSesionAPI(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/LoginUsuario/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
        pass_user: password,
      }),
    });


    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al iniciar sesión: ${errorMessage}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
}


export  { InicioSesionAPI };

