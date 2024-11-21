import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import schedule from 'node-schedule'; // Pour planifier les tâches




// Charger les variables d'environnement depuis un fichier .env
dotenv.config();

const app = express();

app.use(bodyParser.json());


const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI 

app.use(cors());

// Définir le transporteur pour Nodemailer avec Hostinger
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com', // Serveur SMTP de Hostinger
    port: parseInt(process.env.SMTP_PORT) || 465, // Port pour SSL
    secure: parseInt(process.env.SMTP_PORT) === 465, // Utilise SSL si le port est 465
    auth: {
        user: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur
        pass: process.env.EMAIL_PASS  // Mot de passe de l'e-mail
    }
});


// Variable pour stocker le long-term token (remplacez par une base de données pour plus de robustesse)
let longTermToken = process.env.INITIAL_LONG_TERM_TOKEN || null;

// Route d'autorisation Instagram
app.get('/', (req, res) => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
  res.send(`<a href="${authUrl}">Connectez-vous à Instagram</a>`);
});

// Échange du code d'autorisation pour un token
app.get('/auth', async (req, res) => {
  const authorizationCode = req.query.code;

  if (!authorizationCode) {
    return res.status(400).send("Le code d'autorisation est manquant.");
  }

  try {
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: authorizationCode,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error_message) {
      return res.status(400).send(`Erreur: ${tokenData.error_message}`);
    }

    const shortTermToken = tokenData.access_token;

    // Échange du short-term token pour un long-term token
    const longTermTokenResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortTermToken}`
    );

    const longTermTokenData = await longTermTokenResponse.json();

    if (longTermTokenData.error) {
      return res.status(400).send(`Erreur: ${longTermTokenData.error.message}`);
    }

    longTermToken = longTermTokenData.access_token;
    res.send(`Jeton d'accès long terme : ${longTermToken}`);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).send('Erreur serveur.');
  }
});

// Récupérer les données Instagram
app.get('/fetch-instagram-data', async (req, res) => {
  if (!longTermToken) {
    return res.status(400).json({ error: 'Le jeton d\'accès est manquant ou expiré.' });
  }

  try {
    const userResponse = await fetch(`https://graph.instagram.com/me?fields=username&access_token=${longTermToken}`);
    const userData = await userResponse.json();

    if (userData.error) {
      return res.status(400).json({ error: userData.error.message });
    }

    const mediaResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${longTermToken}&limit=18`
    );

    const mediaData = await mediaResponse.json();

    if (mediaData.error) {
      return res.status(400).json({ error: mediaData.error.message });
    }

    res.json({
      username: userData.username,
      media: mediaData.data,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Tâche planifiée pour renouveler le long-term token
schedule.scheduleJob('0 0 * * 1', async () => {
  // Renouvelle le token toutes les semaines
  if (!longTermToken) return;

  try {
    const refreshResponse = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longTermToken}`
    );
    const refreshData = await refreshResponse.json();

    if (refreshData.error) {
      console.error('Erreur lors du renouvellement du token:', refreshData.error.message);
      return;
    }

    longTermToken = refreshData.access_token;
    console.log('Jeton d\'accès long terme renouvelé avec succès.');
  } catch (error) {
    console.error('Erreur lors du renouvellement du token:', error);
  }
});

// Route pour envoyer un email avec les informations du formulaire
app.post('/send-email', (req, res) => {
    const { name, phone, email, subject, question, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'andygarcia@fronthand.fr', // Adresse de réception pour le test
        subject: `Question de ${name} concernant ${subject} - ${question}`,
        text: `
            Nom: ${name}
            Téléphone: ${phone}
            Email: ${email}
            Sujet: ${subject}
            Question: ${question}
            Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            return res.status(500).send('Erreur lors de l\'envoi de l\'email');
        }
        console.log('Email envoyé:', info.response);
        res.send('Email envoyé avec succès');
    });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
