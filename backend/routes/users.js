const router = require("express").Router();
let User = require("../models/user.model");
const passport = require("passport");
const { check, validationResult } = require("express-validator");

const amw = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user.role !== "admin") {
        console.log("not admin");
        console.log(req.user);
        res.status(401).json({ error: "Unauthorized" });
      }
    })
    .catch((err) => {
      res.status(401).json({ error: "Unauthorized" });
    });
  next();
};

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), amw, (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router
  .route("/add")
  .post(
    [
      check("username").trim().escape(),
      check("email").isEmail().normalizeEmail(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res
          .status(400)
          .json({ errors: errors.array(), sanitizationError: true });
      }
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const newUser = new User({ username, email, password, role: "user" });

      newUser
        .save()
        .then(() => res.json("User added!"))
        .catch((err) => {
          res.status(400).json("Error: " + err);
        });
    }
  );

module.exports = router;
