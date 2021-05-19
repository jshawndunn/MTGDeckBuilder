const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');
const mtg = require('mtgsdk')

const db = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    res.render('search/search')
})

router.post('/results', isLoggedIn, async (req, res) => {
    const { card } = req.body 
    const cards = await mtg.card.where({ name: card })
    res.render('search/results', { cards })
})

router.post('/add', isLoggedIn, async (req, res) => {
    const { name, id } = req.body;
    const deck = await db.deck.findOne({
        where: { name }
    });
    const card = await mtg.card.find(id);

    const [addedCard] = await db.card.findOrCreate({
        where: { name:card.card.name,
            set:card.card.set,
            imgUrl:card.card.imageUrl
        }
    })
    deck.addCard(addedCard)
    res.redirect('/search')
})
module.exports = router;