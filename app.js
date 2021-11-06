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

app.get('/', (req, resp) => {
    pokemonFetch.fetchAll().then(pokemons=>{
        let page = engine.renderFileSync("index" , {pokemons:pokemons});
        resp.send(page);
    });
});

app.get("/views/custom.css" , (req , resp)=>{
    resp.sendFile("custom.css" , { root: path.resolve(__dirname , "views/")});
});