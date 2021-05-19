const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

const db = require('../models');

// ROUTES GET
// Displays all decks
router.get('/', isLoggedIn, async (req, res) => {
  const { id } = req.user.get(); 
  const decks = await db.deck.findAll({ where: { userId:id } });
  res.render('decks/display', { decks });
})
// Create New Deck Form  
router.get('/new', isLoggedIn, (req, res) => {
  res.render('decks/createForm');
})
// Display all cards belonging to a deck
router.get('/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const deck = await db.deck.findOne({ where: { id }, include: [db.card] }); 
  res.render("decks/show", { deck });
})

// ROUTES POST
// Create new deck
router.post('/new', isLoggedIn, async (req,res) => {
  const { id } = req.user.get();
  const { deckName } = req.body;
  const user  = await db.user.findOne({ where:{ id:id } });
  user.createDeck({ name:deckName });
  res.redirect('/decks')
})

// ROUTES PUT
// Update deck name
router.put('/name', isLoggedIn, async (req,res) => {
  const { id, name } = req.body;
  const deck = await db.deck.findOne({ where: { id }});
  await deck.update({ name })
  res.redirect(`/decks/${id}`)
})

// ROUTES DELETE
// Delete Entire Deck
router.delete('/remove/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params
  await db.deck.destroy({ where: { id } })
  res.redirect('/decks')
})

// Delete a single card from a deck. 
router.delete('/card/:deckId/:cardId', isLoggedIn, async (req, res) => {
  // params passed in from view decks/display
  const { deckId, cardId } = req.params
  // grab deck from model on deckId
  const deck = await db.deck.findOne({ where: { id:deckId }})
  // grab card from model on cardId
  const card = await db.card.findOne({ where: { id:cardId }})
  // use the association helper REMOVE to, well, remove the association from deck to the card instance 
  await deck.removeCard(card)
  // redirect(we don't want their URL on /card/:deckId/:cardId) to show cards in deck.
  res.redirect(`/decks/${deckId}`)
})


module.exports = router;