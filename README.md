Comment installer le site ?

Copier le lien du repository.
Ouvrir un terminal.
Écrire la commande git clone + coller le lien du repository.


Installation du backend

Dans un terminal 

cd backend.
NPM install.
Nodemon.


Installation de la Base de données (MongoDB)

Si vous utilisez les fichiers .env fournis alors pas besoin d’utiliser l’export de la base de données.

Si vous n’utilisez pas les fichiers .env fournis alors il faut importer la base de données.
(la base de données n’est pas fournie sur ce repository)

Comment importer des données sur MongoDB ? (Via MongoDB Compass)

Se connecter à cluster.
Se rendre sur la collection.
Cliquer sur ADD FILE puis ajouter le fichier correspondant à chaque table.


Installation du frontend

Dans un terminal

cd frontend.
NPM install.
NPM start.


Fonctionnement global du site

Groupomania Network est un réseau social d’entreprise.

Les utilisateurs peuvent s’inscrire et/ou se connecter. 

Ils peuvent créer des posts avec un titre, un texte et une image (facultative). Seul l’utilisateur ayant créer le post peut le modifier ou le supprimer.

Il y a également un système de like.

Il faut être connecté en tant qu’administrateur pour avoir accès à la modification et la suppression de tous les posts.
