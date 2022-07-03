require('dotenv').config();
const app = require("./app");
const express = require("express");

const pokemonRouter = require("./routes/pokemon");
const storeSeedData = require("./routes/storeseeddata");

app.use("/pokemon", pokemonRouter);
app.use("/storeseeddata", storeSeedData);
app.use("/views/static" , express.static("views/static"));

app.get("/" , (req, res) => {
    res.redirect(301 , "/pokemon");
})