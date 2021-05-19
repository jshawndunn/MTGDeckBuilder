const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

const db = require('../models');


router.get('/', isLoggedIn, async (req, res) => {
  const { id } = req.user.get(); 
  const decks = await db.deck.findAll({
      where: {
          userId:id
      }
  });
  res.render('decks/display', { decks })
})
  
router.get('/new', isLoggedIn, (req, res) => {
  res.render('decks/createForm')
})

router.get('/remove/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params
  await db.deck.destroy({ where: { id } })

  res.redirect('/decks')
})

router.get('/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params
  const deck = await db.deck.findOne({ where: { id }, include: [db.card] })
  
  res.render("decks/show", { deck })
})

router.get('/card/:deckId/:cardId', isLoggedIn, async (req, res) => {
  // params passed in from decks/display
  const { deckId, cardId } = req.params
  // grab deck from model on deckId
  const deck = await db.deck.findOne({ where: { id:deckId }})
  // grab card from model on cardId
  const card = await db.card.findOne({ where: { id:cardId }})
  // use the association helper REMOVE to, well, remove the association from deck to the card instance 
  deck.removeCard(card)

  res.redirect(`/decks/${deckId}`)
})

router.post('/new', isLoggedIn, async (req,res) => {
  const { id } = req.user.get();
  const { deckName } = req.body
  const user  = await db.user.findOne({
    where: {
      id:id
    }
  })
  user.createDeck({
    name: deckName
  })
  res.redirect('/decks')
})

module.exports = router;