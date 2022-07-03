const express = require("express");
const router = express.Router();

const pokemonData   =   require("../models/pokemon");
const pokemonInsert = require("../models/pokemon_insert");

router.get("/" , (req , resp)=>{
    pokemonData.forEach(element => {
        pokemonInsert.createPokemon(element , console.log);
    }
    );
    resp.send("All Data Sent Successfully");
})

module.exports = router;