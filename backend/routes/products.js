require("dotenv").config();
var Product = require("../models/products.model");
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

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(upload.single("uploaded_file"), (req, res, next) => {
  const description = req.body.description;
  const price = Number(req.body.price);
  const category = req.body.category;
  const newProduct = new Product({
    id: price + 1,
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
      console.log(err);
    });
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.id = req.body.id;
      product.price = Number(req.body.duration);
      product.category = req.body.category;

      product
        .save()
        .then(() => res.json("Products updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
