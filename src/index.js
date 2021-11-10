const express = require("express");
const app = express();

const session = require("express-session");

require("dotenv").config();

app.use(express.json());

const passport = require("./configs/passport");

app.use(session({
    secret: process.env.SECRET_KEY ,
    resave: false,
    saveUninitialized: true,
    name: "Karthik"
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (user, done) {
    console.log(user, "des");
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
        const { ...user} = req.user;
        return res.status(200).json({ user});
    }
);

const isAutheticated = (req, res, next) => {
    if (req.session.passport) {
        next();
    } else {
        res.redirect("/auth/google")
    }
}

app.get("/test", isAutheticated, (req, res) => {
    res.send({user: req.user || null})
})

// app.get('/test', (req, res) => {
//     console.log(req.session.passport, req.user)
//     res.send({user: req.user || null})
// })

app.get("/logout", (req, res) => {
    req.logOut();
    res.send("logout")
})

module.exports = app;