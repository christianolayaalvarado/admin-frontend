import React, { useState } from 'react';
import { getToken, clearToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import './Exportar.css'; // Nuevo estilo

function Exportar() {
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleExport = async () => {
    try {
      console.log('Token usado para exportar:', getToken());
      // Realiza la solicitud al backend para exportar los clientes
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clientes/exportar`, {
        headers: {
          'Authorization': 'Bearer ' + getToken()
        }
      });

      if (!res.ok) {
        return setMensaje('Error al exportar. Token inválido o expirado.');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientes.csv';
      a.click();

      // Limpia el mensaje si fue exitoso
      setMensaje('');
    } catch (err) {
      setMensaje('Error al exportar');
    }
  };

  const cerrarSesion = () => {
    clearToken();
    navigate('/');
  };

  return (
    <div className='exportar-background'>
    <div className='exportar-box'>
      <h2>Exportar Clientes</h2>
      {mensaje && <p>{mensaje}</p>}
      <button onClick={handleExport}>Descargar CSV</button>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Exportar;
