const express = require("express");
const app = express();

app.use(express.json());

const session = require("express-session");

if (process.env.IS_HEROKU) {
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: {
        sameSite: "none",
        secure: true,
        domain: process.env.BACKEND_URL,
        path: "/",
        httpOnly: true,
      },
    })
  );
} else {
  const redis = require("redis");
  const RedisStore = require("connect-redis")(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
    })
  );
}

const cors = require("cors");
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

const User = require("./models/user.model");
const userController = require("./controllers/user.controller");
const ngoController = require("./controllers/ngo.controller");

const passport = require("./configs/passport");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const newUser = await User.findById(id).lean().exec();
  done(null, newUser);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  function (req, res) {
    res.redirect(process.env.ORIGIN);
  }
);

const isAutheticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({});
  }
};

app.get("/test", isAutheticated, (req, res) => {
  res.send({ user: req.user || null });
});

app.use("/user", isAutheticated, userController);

app.use("/ngos", ngoController);

app.get("/logout", (req, res) => {
  req.logout();
  res.send("logout");
});

module.exports = app;
