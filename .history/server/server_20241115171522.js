import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';




// Charger les variables d'environnement depuis un fichier .env
dotenv.config();

// Configuration de Nodemailer avec les informations SMTP d'Hostinger
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true, // Utilisez true pour le port 465 (SSL)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const app = express();

const clientId = process.env.CLIENT_ID || '1077077414006940';
const clientSecret = process.env.CLIENT_SECRET || '4817228961952b02f53b0818f08ab975';
const redirectUri = process.env.REDIRECT_URI || 'https://fronthand.fr/';

app.use(cors());

app.get('/', (req, res) => {
    // Redirige l'utilisateur vers l'URL d'autorisation Instagram
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
    res.send(`<a href="${authUrl}">Connectez-vous à Instagram</a>`);
});

app.get('/auth', async (req, res) => {
    const authorizationCode = req.query.code;

    if (!authorizationCode) {
        return res.status(400).send("Le code d'autorisation est manquant.");
    }

    try {
        // Échange le code d'autorisation contre un jeton d'accès court terme
        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
                code: authorizationCode
            })
        });

        const tokenText = await tokenResponse.text();
        console.log('Réponse brute de l\'API Instagram:', tokenText);

        let tokenData;
        try {
            tokenData = JSON.parse(tokenText);
        } catch (error) {
            console.error('Erreur de parsing JSON:', error);
            return res.status(500).send('Erreur serveur lors du parsing de la réponse.');
        }

        if (tokenData.error_message) {
            return res.status(400).send(`Erreur: ${tokenData.error_message}`);
        }

        const shortTermToken = tokenData.access_token;
        console.log('Jeton d\'accès court terme:', shortTermToken);

        // Échange le jeton d'accès court terme contre un jeton d'accès long terme
        const longTermTokenResponse = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortTermToken}`, {
            method: 'GET'
        });

        const longTermTokenData = await longTermTokenResponse.json();

        if (longTermTokenData.error) {
            return res.status(400).send(`Erreur: ${longTermTokenData.error.message}`);
        }

        const longTermToken = longTermTokenData.access_token;
        console.log('Jeton d\'accès long terme:', longTermToken);

        res.send(`Jeton d'accès long terme: ${longTermToken}`);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur.');
    }
});

app.get('/fetch-instagram-data', async (req, res) => {
    const longTermToken = req.query.access_token; // Utilisation du token passé via la requête

    if (!longTermToken) {
        return res.status(400).json({ error: 'Token d\'accès manquant.' });
    }

    try {
        const userResponse = await fetch(`https://graph.instagram.com/me?fields=username&access_token=${longTermToken}`);
        const userData = await userResponse.json();

        if (userData.error) {
            return res.status(400).json({ error: userData.error.message });
        }

        const mediaResponse = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${longTermToken}&limit=18`);
        const mediaData = await mediaResponse.json();

        if (mediaData.error) {
            return res.status(400).json({ error: mediaData.error.message });
        }

        res.json({
            username: userData.username,
            media: mediaData.data,
            profile_picture: userData.profile_picture_url, // Ajouter la photo de profil si disponible

        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
