const sessionRouter = {
  autenticate (req, res) {
    if (req.user) {
      res.json (
        JSON.stringify (req.user, ['email', 'id', 'lastName', 'firstName'])
      );
    } else {
      res.json (null);
    }
  },
  logout (req, res) {
    try {
      req.session.destroy ();
      res.json (true);
    } catch (e) {
      res.json (false);
    }
  },
};

export default sessionRouter;
