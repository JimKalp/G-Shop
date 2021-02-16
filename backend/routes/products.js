require("dotenv").config();
var Product = require("../models/products.model");
var User = require("../models/user.model");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

const host_URL = process.env.HOST_URL;
const router = require("express").Router();
const passport = require("passport");
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
router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});
const { check, validationResult } = require("express-validator");
router
  .route("/add")
  .post(
    upload.single("uploaded_file"),
    passport.authenticate("jwt", { session: false }),
    amw,
    [
      check("price").isNumeric().trim().escape(),
      check("description").trim().escape(),
      check("category").trim().escape(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const description = req.body.description;
        const price = Number(req.body.price);
        const category = req.body.category;
        const newProduct = new Product({
          description,
          price,
          category,
          img: {
            url: host_URL + "/" + req.file.path,
            contentType: "image/jpeg",
          },
        });

        newProduct
          .save()
          .then(() => {
            res.json(newProduct);
          })
          .catch((err) => {
            res.status(400).json("wrong.attributes");
          });
      } catch (err) {
        res.status(400).json({ error: "Missing required fields" });
      }
    }
  );

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router
  .route("/:id")
  .delete(passport.authenticate("jwt", { session: false }), amw, (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json("Exercise deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router
  .route("/update/:id")
  .put(
    upload.any("uploaded_file"),
    passport.authenticate("jwt", { session: false }),
    amw,
    [
      check("price").isNumeric().trim().escape(),
      check("description").trim().escape(),
      check("category").trim().escape(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      Product.findById(req.params.id)
        .then((product) => {
          try {
            product.price = Number(req.body.price);
            product.category = req.body.category;
            product.description = req.body.description;

            if (req.files[0]) {
              product.img.url = host_URL + "/" + req.files[0].path;
            }
          } catch (err) {
            res.status(400).json({ error: "Missing required fields" });
          }

          product
            .save()
            .then(() => res.json(product))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  );

module.exports = router;
