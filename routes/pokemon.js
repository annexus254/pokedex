const express = require("express");
const router = express.Router();
const path = require('path');
const { Liquid } = require("liquidjs");

const pokemonInsert = require("../models/pokemon_insert");
const pokemonFetch = require("../models/pokemon_fetch");

const engine = new Liquid({
    root: path.resolve(__dirname, "../views/"),
    extname: ".liquid"
});

//INDEX
router.get("/", (req, resp) => {
    pokemonFetch.fetchAll().then(pokemons => {
        let page = engine.renderFileSync("index", { pokemons: pokemons });
        resp.send(page);
    });
})

//NEW
router.get("/new", (req, resp) => {
    let page = engine.renderFileSync("new_pokemon");
    resp.send(page);
})

//SHOW
router.get("/:id", (req, resp) => {
    pokemonFetch.fetchById(req.params.id).then(pokemon => {
        pokemon = pokemon[0];
        let page = engine.renderFileSync("show_pokemon", { pokemon: pokemon });
        resp.send(page);
    })
})

//EDIT
router.get("/:id/edit", (req, resp) => {
    pokemonFetch.fetchById(req.params.id).then(pokemon => {
        pokemon = pokemon[0];
        pokemon.type = pokemon.type.join();
        let page = engine.renderFileSync("edit_pokemon", { pokemon: pokemon });
        resp.send(page);
    })
})

//CREATE
router.post("/", (req, resp) => {
    req.body['type'] = req.body['type'].split(',');
    req.body['stats'] = {
        hp: req.body['hp'],
        attack: req.body['attack'],
        defense: req.body['defense'],
        spattack: req.body['spattack'],
        spdefense: req.body['spdefense'],
        speed: req.body['speed']
    }
    pokemonInsert.createPokemon(req.body, console.log);
    resp.send('0');
})

//UPDATE
router.put("/:id", (req, resp) => {
    req.body['type'] = req.body['type'].split(',');
    req.body['stats'] = {
        hp: req.body['hp'],
        attack: req.body['attack'],
        defense: req.body['defense'],
        spattack: req.body['spattack'],
        spdefense: req.body['spdefense'],
        speed: req.body['speed']
    }
    pokemonInsert.updatePokemon(req.params.id, req.body, console.log);
    resp.send('0');
})

//DELETE
router.delete("/:id", (req, resp) => {
    pokemonInsert.deletePokemon(req.params.id, console.log);
    resp.send('0');
})

module.exports = router;