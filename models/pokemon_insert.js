const mongoose          =   require("mongoose");
const db_connection     =   require("./database_conn.js");
const Schema            =   mongoose.Schema;

const pokemonSchema     =   new Schema(
                            {
                                id      :   { type : String, required : true, unique : true },
                                name    :   { type : String, required : true},
                                img     :   { type : String, required : true },
                                type    :   [ { type : String }   ],
                                stat    :   {
                                                hp : String,
                                                attack : String,
                                                defense : String,
                                                spattack : String,
                                                spdefense: String,
                                                speed : String
                                            },
                                moves   :   {
                                                level:  [
                                                            {                                     
                                                                learnedat : String,
                                                                name : String ,
                                                                gen : String
                                                            }
                                                        ],
                                                tmhm:   [
                                                            {                                     
                                                                learnedat : String,
                                                                name : String ,
                                                                gen : String
                                                            }
                                                        ],
                                                egg:    [
                                                            {
                                                                name : String,
                                                                gen : String
                                                            }
                                                        ],
                                                tutor:  [
                                                            {
                                                                name : String,
                                                                gen : String
                                                            }
                                                        ],
                                                gen34:  [
                                                            {
                                                                name : String,
                                                                method : String
                                                            }
                                                        ]
                                            },

                                damages :   {
                                                normal: String,
                                                fire: String,
                                                water: String,
                                                electric: String,
                                                grass: String,
                                                ice: String,
                                                fight: String,
                                                poison: String,
                                                ground: String,
                                                flying: String,
                                                psychic: String,
                                                bug: String,
                                                rock: String,
                                                ghost: String,
                                                dragon: String,
                                                dark: String,
                                                steel: String
                                            },
                                misc    :   {
                                                sex:{
                                                        male:String,
                                                        female:String
                                                    },
                                                abilities:{
                                                            normal:[{type:String}],
                                                            hidden:[{type:String}]
                                                        },
                                                classification:String,
                                                height:String,
                                                weight:String,
                                                capturerate:String,
                                                eggsteps:String,
                                                expgrowth:String,
                                                happiness:String,
                                                evpoints:[{type:String}],
                                                fleeflag:String,
                                                entreeforestlevel:String
                                            }
                            },
                            {   timestamps : true }
                            );

const pokemonModel      =   mongoose.model("pokemon" , pokemonSchema);

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