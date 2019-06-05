import express from "express";
import path from "path";
import http from "http";
import cookieParser from "cookie-parser";
import logger from "morgan";
import expressValidator from "express-validator";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import sequelizeSession from "connect-session-sequelize";
import models from "./models";
import passport from "passport";
import config from "./config/config";
import fs from "fs";

import sessionRouter from "./routes/session";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import updateRouter from "./routes/update";

const SequelizeStore = sequelizeSession(session.Store);
const myStore = new SequelizeStore({
  db: models.sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 2 * 60 * 60 * 1000
});
const app = express();
const server = http.createServer(app);
const port = "3001";

app.use(cors({ origin: config.corsDomain, credentials: true }));
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "sergey",
    resave: false,
    store: myStore,
    saveUninitialized: true,
    proxy: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/passport");
myStore.sync();

app.post("/api/register", registerRouter.submit);
app.post("/api/login", loginRouter.submit);
app.get("/api/checkuser", sessionRouter.autenticate);
app.get("/api/logout", sessionRouter.logout);
app.post("/api/update", updateRouter.updateUser);

app.get("/public/images", (req, res) => {
  const file = req.query.file;
  const resFile = fs.readFileSync(__dirname + "/public/images" + file);
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(resFile, "binary");
});
server.listen(port);
