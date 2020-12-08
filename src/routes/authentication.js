const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/profile', (req, res) => {
    res.send('Profile');
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