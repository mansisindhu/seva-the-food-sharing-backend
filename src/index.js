require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const session = require("express-session");
const redis = require("redis");

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const User = require("./models/user.model");

const userController = require("./controllers/user.controller");
const ngoController = require("./controllers/ngo.controller");

const passport = require("./configs/passport");

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

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
        const { ...user } = req.user;
        return res.status(200).json({ user });
    }
);

const isAutheticated = (req, res, next) => {
    if (req.session.passport) {
        next();
    } else {
        res.status(403).send({});
    }
}

app.get("/test", isAutheticated, (req, res) => {
    res.send({ user: req.user || null })
})

app.use("/user", isAutheticated, userController);

app.use("/ngos", ngoController);

app.get("/logout", (req, res) => {
    req.logout();
    res.send("logout");
});

module.exports = app;