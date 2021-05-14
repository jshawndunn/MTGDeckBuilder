const passport = require('passport');
const localStrategy = require('passport-local').Strategy

const db = require('../models');

const STRATEGY = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, cb) => {
    try {
        const user = await db.user.findOne({
            where: { email }
        });

        if(!user || !user.validPassword(password)){
            cb(null, false);
        } else {
            cb(null, user)
        }
    } catch (error) {
        console.log('---------ERROR----------');
        console.log(error);
    }
});

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await db.user.findByPk(id);

        if(user){
            cb(null, user)
        }
    } catch (error) {
        console.log('-------Yo, ERRORS---------')
        console.log(error)
    }
})

passport.use(STRATEGY);

module.exports = passport;