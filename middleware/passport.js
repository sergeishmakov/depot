const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User = require ('../controllers/userController');

passport.serializeUser ((user, done) => {
  done (null, user.id);
});

passport.deserializeUser ((id, done) => {
  User.findById (id)
    .then (user => {
      return done (null, user);
    })
    .catch (done);
});

passport.use (
  new LocalStrategy (
    {usernameField: 'email'},
    async (email, password, done) => {
      let user = await User.findOne (email);
      if (!user) {
        return done (null, false, {message: 'Incorrect username.'});
      }
      if (!User.validPassword (password, user)) {
        return done (null, false, {message: 'Incorrect password.'});
      }
      return done (null, user);
    }
  )
);
