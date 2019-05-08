import createError from "http-errors";
import express from "express";
import path from "path";
import http from "http";
import cookieParser from "cookie-parser";
import logger from "morgan";
import expressSession from "express-session";
import expressValidator from "express-validator";
import bodyParser from "body-parser";
import config from "./config/config.json";

import registerRouter from "./routes/register";
import usersRouter from "./routes/users";
import indexRouter from "./routes/index";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || "8000";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    name: config.configSession.name,
    secret: config.configSession.secret,
    saveUninitialized: false,
    resave: false
  })
);

app.get("/", indexRouter);
app.get("/users", usersRouter);
app.get("/register", registerRouter.form);
app.post("/register", registerRouter.submit);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
server.listen(port);
// module.exports = app;
