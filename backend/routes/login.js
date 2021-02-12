const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ msg: "wrong.credentials" });
    }
    req.login(user, () => {
      const body = { _id: user.id, email: user.email };
      const role = user.role;

      const token = jwt.sign({ user: body }, "jwt_secret");
      return res.json({ token, role });
    });
  })(req, res, next);
});

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      res.json({
        username: "guest",
      });
    } else {
      res.json(req.user);
    }
  }
);

module.exports = router;
