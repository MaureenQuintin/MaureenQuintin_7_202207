const Post = require('../models/Post');
const User = require('../models/User');

const fs = require('fs');

// Création d'un post
exports.createPost = (req, res, next) => {
  const postObject = req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : { ...JSON.parse(req.body.post) };

  console.log(postObject);
    const post = new Post({
        ...postObject
    });
  
    post.save()
    .then(() => { res.status(201).json({message: 'Post créé !'})})
    .catch(error => { res.status(400).json( { error })})
 };

//  Récupération d'un post en fonction de l'ID
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Modification d'un post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...JSON.parse(req.body.post) };

    Post.findOne({_id: req.params.id})
    .then((post) => {
      // Vérification userID
      console.log(postObject.userId),
      User.findOne({_id: postObject.userId})
      .then((user) => {
        console.log(user);
        if ((post.userId === postObject.userId) || user.isAdmin) {
                delete postObject.userId;
                if(post.imageUrl !== undefined){
                  // Supression si image
                  const filename = post.imageUrl.split('/images/')[1];
                  fs.unlink(`images/${filename}`, () => {
                      Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                      .then(() => res.status(200).json({message : 'Post modifié!'}))
                      .catch(error => res.status(400).json({ error }));
                  })
                } else {
                  Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                      .then(() => res.status(200).json({message : 'Post modifié!'}))
                      .catch(error => res.status(400).json({ error }));
                }
              } else {
                res.status(403).json({ message : 'Unauthorized request'});
              }
            });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
 };

//  Supression d'un post
 exports.deletePost = (req, res, next) => {
  console.log('r', req.auth.userId);
  Post.findOne({ _id: req.params.id})
      .then((post) => {
        // Vérification userID
        User.findOne({_id: req.auth.userId})
        .then((user) => {
          console.log('u', user);
          if ((post.userId === req.auth.userId) || user.isAdmin) {
            if(post.imageUrl !== undefined){
              // Supression si image
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Post.deleteOne({ _id: req.params.id})
                  .then(() => res.status(200).json({message : 'Post supprimé !'}))
                  .catch(error => res.status(400).json({ error }));
              })
            } else {
              Post.deleteOne({ _id: req.params.id})
                  .then(() => res.status(200).json({message : 'Post supprimé !'}))
                  .catch(error => res.status(400).json({ error }));
            }
          } else {
            res.status(403).json({ message : 'Unauthorized request'});
          }
        });
    })
      .catch( error => {
          res.status(500).json({ error });
      });
 };

// Récupération de tous les posts
exports.getAllPost = (req, res, next) => {
  Post.find().then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
};

// Gestion des likes
exports.updateLikePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
    .then(post => {
        let postObject = post;
        // Si l'utilisateur like
        if (req.body.like === 1) { // vérification du like
            if (postObject.usersLiked.indexOf(req.body.userId) === -1) {  // vérification existence userID dans l'array like
                postObject.usersLiked.push(req.body.userId); // si pas d'userID = ajout de l'userID dans l'array like
                postObject.likes = postObject.likes+1; // ajout du like dans le compteur
            }

            // Si l'utilisateur retire son like
        } else if (req.body.like === 0) { // vérification du like
            // Ajout du like
            if (postObject.usersLiked.indexOf(req.body.userId) !== -1) {
                let i = postObject.usersLiked.indexOf(req.body.userId);
                postObject.usersLiked.splice(i, 1);
                postObject.likes = postObject.likes-1;
            }
        }

        // Récupération du post et mise à jour 
        Post.findOneAndUpdate({ _id: req.params.id}, { ...postObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Post modifié!'}))
            .catch(error => res.status(400).json({ error }));  
    })
    .catch( error => {
        res.status(500).json({ error });
    });
}