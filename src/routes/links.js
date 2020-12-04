const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/', async (req, res) => {
    const links = await db.query('SELECT * FROM links');
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
    req.flash('success', 'Enlace guardado exitosamente');
    res.redirect('/links');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE ID = ?', [ id ]);
    req.flash('success', 'Enlace eliminado exitosamente');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const link = await db.query('SELECT * FROM links WHERE ID = ?', [id]);
    res.render('links/edit', { link: link[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;

    const newLink = {
        title, url, description
    };

    await db.query('UPDATE links SET ? WHERE ID = ?', [newLink, id]);
    req.flash('success', 'Enlace actualizado exitosamente');
    res.redirect('/links');
});

module.exports = router;