import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';
import loginBg from './images/login-bg.jpg';



function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña })
      });

      const data = await res.json();
      if (!res.ok) {
        return setError(data.error || 'Error en login');
      }

      setToken(data.token);
      navigate('/exportar');
    } catch (err) {
      setError('Error de red o del servidor');
    }
  };

  return (
    <div
  className="login-background"
  style={{
    backgroundImage: `url(${loginBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}
>
    <div>
      <h2>Login de Administrador</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
      </div>
    </div>
  );
}

export default Login;

