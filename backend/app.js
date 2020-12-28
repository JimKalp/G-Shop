const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 3000;

//app.use(cors());
//app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//app.use('/users', usersRouter);
//app.use('/products, productsRouter);

app.get('/products', (req, res) => {
  const prod  = {name: "bla", price: "45"}
  res.send(prod)
})

app.post("/", (req, res) => {
    console.log(req)
    res.send("BLA")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})