const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/', async (req, res) => {
    const links = await db.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', { links });
});

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;

    const newLink = {
        title, url, description
    };

    await db.query('INSERT INTO links SET ?', [newLink]);
    res.send('recibido');
});

module.exports = router;