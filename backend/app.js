// Définition des éléments de l'application

// Require des éléments nécessaires
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const auth = require('./middleware/auth');

const app = express();

// Connexion avec la base de données
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } },
{ crossOriginOpenerPolicy: { policy: "cross-origin" } }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cookieParser());

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

// jwt
app.get('/jwtid', auth.requireAuth, (req, res) => {
  res.status(200).send(req.auth.userId)
});

module.exports = app;