const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/profile', (req, res) => {
    res.render('auth/profile');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// Forma larga de hacer la autenticación
/*router.post('/signup', (req, res) => {
    //console.log(req.body);
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });
});*/

// Forma corta de hacer la autenticación
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = router;