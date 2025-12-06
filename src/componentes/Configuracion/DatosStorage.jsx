
const DatosStorage = (operacion, propiedadAEliminar, datoAAgregar) => {
  const localStorageJSON = localStorage.getItem('userData');

  const getObtener = () => {
    if (localStorageJSON) {
      const userLocalStorageData = JSON.parse(localStorageJSON);
      return {
        token: userLocalStorageData.token,
        refreshToken: userLocalStorageData.refreshToken,
        sesion: userLocalStorageData.sesion,
        user: userLocalStorageData.user,
        last_login: userLocalStorageData.last_login,
       };
    } else {
      //console.warn('No hay datos de inicio de sesión en el localStorage');
      return {
        token: null,
        refreshToken: null,
        sesion: null,
        user: null,
        last_login: null,
       };
    }
  };

  const limpiarDatos = (propiedadEliminar) => {
    if (propiedadEliminar) {
      const datosActuales = getObtener();
      delete datosActuales[propiedadEliminar];//eliminar el valor
      localStorage.setItem('userData', JSON.stringify(datosActuales)); // actualiza
    }
    //  else {
    //   localStorage.removeItem('userData');
    // }
  };

  const agregarActualizarDatos = (campo) => {
    const datosActuales = getObtener();
    const nuevosDatosActualizados = { ...datosActuales, [campo.key]: campo.value };
    localStorage.setItem('userData', JSON.stringify(nuevosDatosActualizados));
  };

  
  let resultado;
  if (operacion === 'obtener') {
    resultado = getObtener();
  } else if (operacion === 'limpiar') {
    limpiarDatos(propiedadAEliminar);
  } else if (operacion === 'agregarActualizar') {
    agregarActualizarDatos(datoAAgregar);
  } else {
    console.warn('Operación no válida');
  }

  return resultado;

};

export default DatosStorage;