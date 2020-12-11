const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('auth/profile');
});

router.get('/login', isNotLoggedIn, (req, res) => {
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

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = router;