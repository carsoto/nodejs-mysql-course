const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    req.flash('success', 'Usuario creado exitosamente');
    res.redirect('/links');
    //res.render('auth/login');
});

module.exports = router;