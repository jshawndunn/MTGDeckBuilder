const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

const db = require('../models');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have been logged out. Enjoy your day.')
  res.redirect('/')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back...',
  failureFlash: 'Either email or password is incorrect.'
}))

router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const [ user, created ] = await db.user.findOrCreate({
      where: { email },
      defaults: { name, password }
    });

    if (created) {
      const successObject = {
        successRedirect: '/',
        successFlash: `Welcome ${user.name}. Account was created.`
      }

      passport.authenticate('local', successObject)(req,res);
    } else {
      req.flash('error', 'Email already exist.');
      res.redirect('/auth/signup')
    }
  } catch (error) {
    req.flash('error', 'Either email or password is incorrect.')
    res.redirect('/auth/signup');
  }
})

module.exports = router;
