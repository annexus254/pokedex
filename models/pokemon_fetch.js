const mongoose          =   require("mongoose");
const {pokemonModel}    =   require("./database_conn.js");

module.exports          =   {
                                fetchAll: ()=>pokemonModel.find({})
                            }
