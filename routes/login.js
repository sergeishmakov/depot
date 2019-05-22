const passport = require ('passport');

const loginRouter = {
  submit (req, res) {
    passport.authenticate ('local', (err, user, messages) => {
      req.logIn (user, () => {
        user
          ? res.json ([null, user, null])
          : res.json ([null, null, messages.message]);
      });
    }) (req, res);
  },
};

export default loginRouter;
