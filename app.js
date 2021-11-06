const app               =   require("./server");
const pokemonInsert     =   require("./models/pokemon_insert");
const pokemonFetch      =   require("./models/pokemon_fetch");
const path              =   require('path');
const {Liquid}          =   require("liquidjs");
const engine            =   new Liquid({
                                        root: path.resolve(__dirname , "views/"),
                                        extname:".liquid"
                                        });

app.get("/storeseeddata",(req,resp)=>{
    const pokemonData   =   require("./models/pokemon");
    pokemonData.forEach(element => {
        pokemonInsert.createPokemon(element , console.log);
    });
    resp.send("All Data Sent Successfully");
});

//INDEX
app.get('/pokemon', (req, resp) => {
    pokemonFetch.fetchAll().then(pokemons=>{
        let page =  engine.renderFileSync("index" , {pokemons:pokemons});
        resp.send(page);
    });
});

//SHOW
app.get('/pokemon/:id', (req, resp) => {
    pokemonFetch.fetchById(req.params.id).then(pokemon=>{
        pokemon     =   pokemon[0];
        let page =  engine.renderFileSync("show_pokemon" , {pokemon:pokemon});
        resp.send(page);
    })
});

//NEW
app.get('/pokemon/new', (req, resp) => {
    
});

//EDIT
app.get('/pokemon/:id/edit', (req, resp) => {
    
});

//CREATE
app.post('/pokemon', (req, resp) => {
    
});

//UPDATE
app.put('/pokemon/:id', (req, resp) => {
    
});

//DESTROY
app.delete('/pokemon/:id', (req, resp) => {
    
});

//For custom.css only
app.get("/views/custom.css" , (req , resp)=>{
    resp.sendFile("custom.css" , { root: path.resolve(__dirname , "views/")});
});