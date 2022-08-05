const jwt = require('jsonwebtoken');
// Vérification que l'user est bien connecté
module.exports = (req, res, next) => {
   try {
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token de l'user
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // Vérification de la validité du token
        const userId = decodedToken.userId; // Récupération de l'userID dans le token
        req.auth = {
            userId: userId
        };
        next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, `${process.env.TOKEN}`, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send(200).json('No token')
            } else {
                const userId = decodedToken.userId; // Récupération de l'userID dans le token
                req.auth = {
                    userId: userId
                };
                next();
            }
      });
    } else {
      console.log('No token');
    }
  };