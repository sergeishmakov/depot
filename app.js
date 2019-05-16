import express from 'express';
import path from 'path';
import http from 'http';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import sequelizeSession from 'connect-session-sequelize';
import models from './models';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import passport from 'passport';

const SequelizeStore = sequelizeSession (session.Store);
const myStore = new SequelizeStore ({
  db: models.sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 2 * 60 * 60 * 1000,
});
const app = express ();
const server = http.createServer (app);
const port = process.env.PORT || '3000';

app.use (cors ());
app.options ('*', cors ());
app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (expressValidator ());
app.use (cookieParser ());
app.use (express.static (path.join (__dirname, 'public')));

app.set ('trust proxy', 1);
app.use (
  session ({
    secret: 'sergey',
    resave: false,
    store: myStore,
    saveUninitialized: true,
    proxy: true,
  })
);
app.use (passport.initialize ());
app.use (passport.session ());
require ('./middleware/passport');
myStore.sync ();

app.post ('/register', registerRouter.submit);
app.post ('/login', loginRouter.submit);
app.get ('/checkuser', sessionRouter.autenticate);

server.listen (port);
