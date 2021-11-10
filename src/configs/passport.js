require("dotenv").config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport = require("passport");

const User = require("../models/user.model");

const { v4: uuidv4 } = require('uuid');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:9900/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile, "profile");
        const email = profile?._json?.email;
        const name = profile?._json?.name;
        const picture = profile?._json?.picture;
        let user;
        try {
            user = await User.findOne({ email }).lean().exec();

            if (!user) {
                user = await User.create({
                    email: email,
                    password: uuidv4(),
                    name: name,
                    profilePic: picture,
                    donations: []
                })
            }

            return cb(null, user)
        } catch (err) {
            console.log({ err });
        }
    }
));

module.exports = passport;

// http://localhost:9900/auth/google