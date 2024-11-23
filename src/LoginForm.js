import React, { useState } from 'react';
import axios from 'axios';  // Importer Axios
import './loginForm.css';

const LoginForm = () => {
  const [message, setMessage] = useState('');
  const [htmlContent, setHtmlContent] = useState(''); // Pour afficher le HTML récupéré
  const [logMessages, setLogMessages] = useState([]); // Pour les messages de log

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const login = e.target.login.value;
    const password = e.target.password.value;
    const rwURL = 'https://autocontrole-backend-production.up.railway.app/fetch-reservations';
    const locURL = 'http://localhost:3001';
    try {
      // Envoi de la requête au backend en utilisant Axios
      const response = await axios.post(rwURL,
        { login, password }, // Corps de la requête
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Vérification de la structure des données retournées
      console.log('Réponse du serveur:', response.data);  // Afficher la réponse pour comprendre sa structure

      // Vérifier si le serveur a renvoyé les données correctement
      if (response.data.success && response.data.data) {
        setMessage('Réservations récupérées avec succès !');
        
        // Si les données sont un tableau ou un objet, essayer d'accéder à la propriété HTML
        const reservations = response.data.data;

        // Nettoyer le contenu HTML si nécessaire
        const cleanedHtmlContent = Array.isArray(reservations) ? reservations.map(reservation => {
          if (reservation.html) {
            // Remplacer les sauts de ligne dans le HTML
            return reservation.html.replace(/[\r\n]+/g, ' ');
          }
          return '';
        }).join(' ') : 'Aucune donnée HTML valide trouvée.';

        // Mettre à jour le contenu HTML dans le message
        setHtmlContent(<div dangerouslySetInnerHTML={{ __html: cleanedHtmlContent }} />);
        
        // Ajouter les messages de log reçus du backend
        const logData = Array.isArray(reservations) ? reservations.map(reservation => (
          `--- Vérification pour la station : ${reservation.station} ---`
        )) : ['Aucune donnée de réservation disponible.'];
        setLogMessages(logData);
      } else {
        setMessage('Aucune réservation disponible ou erreur.');
      }
    } catch (error) {
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état
        console.error("Réponse du serveur:", error.response);
        setMessage(`Erreur du serveur : ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        // La requête a été faite mais il n'y a pas de réponse
        console.error("Pas de réponse du serveur:", error.request);
        setMessage('Aucune réponse reçue du serveur.');
      } else {
        // Quelque chose s'est passé dans la préparation de la requête
        console.error("Erreur dans la requête:", error.message);
        setMessage(`Erreur : ${error.message}`);
      }
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

      {/* Affichage des messages de log */}
      <div className="log-box">
        {logMessages.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>

      <div className="html-content">
        {/* Affichage du contenu HTML ou de l'objet JSON */}
        {htmlContent}
      </div>
    </div>
  );
};

export default LoginForm;
