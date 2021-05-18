const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const mtg = require('mtgsdk')

const db = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    res.render('search/search')
})

router.post('/results', async (req, res) => {
    const { card } = req.body 
    const cards = await mtg.card.where({ name: card })
    res.render('search/results', { cards })
})

module.exports = router;