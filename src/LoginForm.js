import React, { useState } from 'react';
import { login } from './authService'; // Import de la fonction login


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  
  const handleLogin = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    
    try {
      const response = await login(username, password); // Appel de la fonction login
      setMessage(response.message); // Affiche la réponse du backend
    } catch (error) {
      // Vérifiez si l'erreur contient une réponse du serveur
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Affiche le message du backend (par ex. 'Invalid credentials')
      } else {
        setMessage('Erreur lors de la connexion au serveur'); // Message générique en cas d'erreur réseau
      }
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} {/* Affiche le message du backend ou erreur */}
    </div>
  );
};

export default LoginForm;
