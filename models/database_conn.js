const mongoose        =   require("mongoose");
mongoose.Promise      =   global.Promise;
const connection      =   mongoose.connection;
const expressApp      =   require("../app.js");
const Schema          =   mongoose.Schema;

//Create a Schema
const pokemonSchema   =   new Schema(
                        {
                            id      :   { type : String, required : true, unique : true },
                            name    :   { type : String, required : true},
                            img     :   { type : String, required : true },
                            type    :   [ { type : String }   ],
                            stats    :   {
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


//Create a model for the above Schema
const pokemonModel      =   mongoose.model("pokemon" , pokemonSchema);

// Config
const mongoURI          =   "mongodb+srv://annexus:pass123@cluster0.ezy7s.mongodb.net/pokemons?retryWrites=true&w=majority";

// Connect to Mongo
mongoose.connect(

    mongoURI,
        
    { useNewUrlParser: true, useUnifiedTopology: true },
    error =>{
        if(error)
            console.log("[CRITICAL] Error connecting to MongoDB.Not starting the server.");
        else{
                let port = process.env.PORT || 3000;
                expressApp.listen(port , _ => console.log(`[SUCCESS] Server started.Listening on port ${port}...`) );
            }
    }
  );

// Error / success

connection.on("error", (err) => console.log(err.message + " is Mongod not running?"));

connection.on("connected", () => console.log("[INFO] MongoDB running at " + `'${mongoURI}'` + "\n[SUCCESS] Connection to the database successfully made!"));

connection.on("disconnected", () => { 
                                      console.log("[WARNING] Mongo disconnected.Attempting to Reconnect");
                                      mongoose.connect(

                                        mongoURI,
                                            
                                        { useNewUrlParser: true, useUnifiedTopology: true },
                                        error =>{
                                            if(error)
                                            {
                                                console.log("[CRITICAL] Error reconnecting to MongoDB.Closing the server");
                                                expressApp.close();
                                            }
                                            else
                                                console.log("[SUCESS] Reconnected to MongoDB Successfully");
                                        }
                                      );
                                    }
             );

module.exports        =   { pokemonSchema : pokemonSchema, pokemonModel : pokemonModel,  connection : connection};