import express from 'express';
import path from 'path';
import http from 'http';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import cors from 'cors';

import registerRouter from './routes/register';

const app = express ();
const server = http.createServer (app);
const port = process.env.PORT || '3000';

app.use(cors());
app.options("*", cors());
app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (expressValidator ());
app.use (cookieParser ());
app.use (express.static (path.join (__dirname, 'public')));

app.post ('/register', registerRouter.submit);

server.listen (port);
