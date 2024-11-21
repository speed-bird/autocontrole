import React, { useState } from 'react';
import './loginForm.css';

const LoginForm = () => {
  const [message, setMessage] = useState('');
  const [htmlContent, setHtmlContent] = useState(''); // Pour afficher le HTML récupéré

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const login = e.target.login.value;
    const password = e.target.password.value;

    try {
      // Envoi de la requête au backend
      const response = await fetch('https://autocontrole-backend-production.up.railway.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      // Vérifier la réponse du serveur
      if (response.ok) {
        const data = await response.json();

        // Si le serveur retourne un message spécifique
        if (data.success && data.data) {
          setMessage('Réservations récupérées avec succès !');
          
          // Mettre à jour le contenu HTML dans le message
          setHtmlContent(data.data.map(reservation => (
            <div key={reservation.station}>
              <h3>{reservation.station}</h3>
              <div dangerouslySetInnerHTML={{ __html: reservation.html }} />
            </div>
          )));
        } else {
          setMessage('Aucune réservation disponible ou erreur.');
        }
      } else {
        const error = await response.text();
        setMessage(`Erreur : ${error}`);
      }
    } catch (error) {
      setMessage('Erreur réseau. Vérifiez le serveur.');
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login :</label>
          <input 
            type="text" 
            id="login" 
            name="login" 
            defaultValue="robert_jonathan@hotmail.com"
            required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            defaultValue="Cuisine7"
            required />
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="message-box">{message}</div>

      <div className="html-content">
        {/* Affichage du HTML récupéré */}
        {htmlContent}
      </div>
    </div>
  );
};

export default LoginForm;
