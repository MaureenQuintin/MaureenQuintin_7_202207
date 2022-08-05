const multer = require('multer');

// Définition du type d'extension
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Gestion du fichier
const storage = multer.diskStorage({
  destination: (req, file, callback) => {// Définition du lieu de stockage des fichiers
    callback(null, 'images');
  },
//   Gestion nom + type d'extension du fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Uniformisation du nom du fichier
    const extension = MIME_TYPES[file.mimetype]; // Définition du type d'extension
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');