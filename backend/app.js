const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Authentication
const passport = require('passport')
const passportLocal = require('passport-local')
const passportJWT = require('passport-jwt')
const loginRouter = require('./routes/login');

jwtStrategy = passportJWT.Strategy

app.use(passport.initialize())

passport.use(new passportLocal({
  usernameField: "email"
}, (email, password, done) => {
  if(email === user.email && password === user.password) {
    return done(null, user)
  }else {
    return done(null, false)
  }
}))

passport.use(new jwtStrategy({
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwt_secret"
}, (jwt_payload, done) => {
  if(user.id === jwt_payload.user._id){
    return done(null, user)
  } else {
    return done(null, false, {
      message: "Token not matched"
    })
  }
}))

const port = 8080
const host = '0.0.0.0'

app.use(loginRouter)

app.listen(port, host, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
