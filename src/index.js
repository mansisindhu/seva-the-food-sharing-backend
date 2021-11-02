const express = require("express");
const app = express();

const session = require("express-session");

require("dotenv").config();

app.use(express.json());

const passport = require("./configs/passport");

app.use(session({ secret: process.env.SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
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
        const { user, token } = req.user;
        return res.status(200).json({ user, token });
    }
);

module.exports = app;