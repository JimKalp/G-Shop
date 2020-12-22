const express = require('express')
const app = express()
const port = 3000

app.get('/products', (req, res) => {
  const prod  = {name: "bla", price: "44"}
  res.send(prod)
})

app.post("/", (req, res) => {
    console.log(req)
    res.send("BLA")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})