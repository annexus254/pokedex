const mongoose          =   require("mongoose");
const {pokemonModel}    =   require("./database_conn");

module.exports          =   {
                                createPokemon: function (pokemonData , callback)
                                               {
                                                pokemonDoc  =   new pokemonModel(pokemonData);
                                                pokemonDoc.save((err , resp)=>{
                                                    if(err) throw err;
                                                    else    callback(resp);
                                                });
                                               }
                            }