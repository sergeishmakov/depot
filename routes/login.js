const passport = require ('passport');

const loginRouter = {
  async submit (req, res) {
    passport.authenticate ('local', (err, user, messages) => {
      req.logIn (user, () => {
        user ? res.json ([user, null]) : res.json ([null, messages]);
      });
    }) (req, res);
  },
};

export default loginRouter;
