const {pokemonModel}    =   require("./database_conn");

module.exports          =   {
                                createPokemon: function (pokemonData , callback)
                                               {
                                                let pokemonDoc  =   new pokemonModel(pokemonData);
                                                pokemonDoc.save((err , resp)=>{
                                                    if(err) throw err;
                                                    else    callback(resp);
                                                });
                                               },
                                updatePokemon: function(pokemonId , pokemonData , callback)
                                               {                                         
                                                   pokemonModel.updateOne({id:pokemonId} , pokemonData , (err , result)=>{
                                                       if(err)  throw(err);
                                                       else     callback(result);
                                                   });
                                               },
                                deletePokemon:  function(pokemonId , callback)
                                               {
                                                   pokemonModel.deleteOne({id:pokemonId} , (err , result)=>{
                                                        if(err)  throw(err);
                                                        else     callback(result);  
                                                    });
                                               }
                            }