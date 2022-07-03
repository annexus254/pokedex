require('dotenv').config();
const app = require("./app");

const pokemonRouter = require("./routes/pokemon");
const storeSeedData = require("./routes/storeseeddata");

app.use("/pokemon", pokemonRouter);
app.use("/storeseeddata", storeSeedData);

//For custom.css only
app.get("/views/custom.css", (req, resp) => {
    resp.sendFile("custom.css", { root: path.resolve(__dirname, "views/") });
});