const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const User = require("./models/user.model");

require("dotenv").config();

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Authentication
const passport = require("passport");
const passportLocal = require("passport-local");
const passportJWT = require("passport-jwt");
const loginRouter = require("./routes/login");

jwtStrategy = passportJWT.Strategy;

app.use(passport.initialize());

passport.use(
  new passportLocal(
    {
      usernameField: "username",
    },
    (username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (username === user.username && password === user.password) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "jwt_secret",
    },
    (jwt_payload, done) => {
      User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Token not matched",
          });
        }
      });
    }
  )
);

app.use(loginRouter);
app.listen(port, host, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
