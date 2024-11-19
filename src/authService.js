import axios from 'axios';

// Fonction pour gérer la connexion avec le backend
export const login = async (username, password) => {
  try {
    const response = await axios.post('https://autocontrole-backend-production.up.railway.app/', {
      username,
      password
    });

    return response.data; // Retourne la réponse du backend
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error; // Lance une erreur si la connexion échoue
  }
};
