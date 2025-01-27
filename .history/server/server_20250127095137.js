import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement depuis un fichier .env
dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Serve index.html as the default file
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/../` });
});

app.use('/assets', express.static(`${__dirname}/../assets`));

app.get('/restaurant', (req, res) => {
    res.sendFile('restaurant.html', { root: `${__dirname}/../` });
});

app.get('/contact', (req, res) => {
    res.sendFile('contact.html', { root: `${__dirname}/../` });
});

app.get('/newsletter', (req, res) => {
    res.sendFile('newsletter.html', { root: `${__dirname}/../` });
});

app.get('/radio', (req, res) => {
    res.sendFile('radio.html', { root: `${__dirname}/../` });
});

app.get('/cgv', (req, res) => {
    res.sendFile('cgv.html', { root: `${__dirname}/../` });
});

app.get('/shop', (req, res) => {
    res.sendFile('shop.html', { root: `${__dirname}/../` });
});

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

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});