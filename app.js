const app               =   require("./server");
const pokemonInsert     =   require("./models/pokemon_insert");

app.get("/storeseeddata",(req,resp)=>{
    const pokemonData   =   require("./models/pokemon");
    pokemonData.forEach(element => {
        pokemonInsert.createPokemon(element , console.log);
    });
    resp.send("All Data Sent Successfully");
});