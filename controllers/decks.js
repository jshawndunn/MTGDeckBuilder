const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

const db = require('../models');

const decks = async (userId) => {
  const decks = await db.deck.findAll({
      where: {
          id:userId
      }
  });
}

router.get('/', isLoggedIn, async (req, res) => {
  const { id } = req.user.get(); 
  const decks = await db.deck.findAll({
      where: {
          id:id
      }
  });
  console.log(decks)
  res.render('decks/display', { decks })
})
  
router.get('/new', isLoggedIn, (req, res) => {
  res.send('Forms to make a new deck')
})

module.exports = router;