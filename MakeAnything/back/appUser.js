const User = require('./models/User');
const bcrypt = require('bcrypt');
const Model = require('./models/Model');

function doAll(app) {

    app.post('/api/inscription', function(req, res) {
        var username = req.body.username;
        var password = bcrypt.hashSync(req.body.password, 10);
        var email = req.body.email;
        var admin = false;
        var newUser = new User({
            username : username,
            email : email,
            password : password,
            admin : admin
        });
        newUser.save()
        .then( item => {
            console.log("Utilisateur créé");
            res.redirect('/login');
        }).catch(err => {
            res.status(404).send("Erreur lors de la création de l'utilisateur");
        });
    });

    app.get('/login', function(req, res) {
        res.render('Login');
    });

    app.post('/api/connexion', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({username : username}).then(function(user) {
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    console.log("Connexion réussie");
                    req.session.user = user;
                    res.redirect('/monCompte');
                } else {
                    res.status(404).send("Mot de passe incorrect");
                }
            } else {
                res.status(404).send("Utilisateur introuvable");
            }
        }).catch(function(err) {
            res.status(404).send("Erreur lors de la connexion");
        });

    });

    app.get('/monCompte', function(req, res) {
        if(req.session.user) {
            Model.find({auteurID : req.session.user._id})
            .then((modeles) =>{
                res.render('MonCompte', {user : req.session.user, modeles : modeles});
            }).catch((err) => {
                res.status(404).send("Erreur lors de la recherche des modèles");
            });
        } else {
            res.redirect('/');
        }
    });

    app.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/');
    });
};

exports.doAll = doAll;