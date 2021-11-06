const mongoose      =   require("mongoose");
mongoose.Promise    =   global.Promise;
const connection    =   mongoose.connection;
const expressApp    =   require("../server.js");

// Config

const mongoURI      =   "mongodb+srv://annexus:pass123@cluster0.ezy7s.mongodb.net/pokemons?retryWrites=true&w=majority";

// Connect to Mongo
mongoose.connect(

    mongoURI,
        
    { useNewUrlParser: true, useUnifiedTopology: true },
    _ =>{
      expressApp.listen(5000 , _ => console.log("\nServer started. Listening on port 5000...") );
    }
  );

// Error / success

connection.on("error", (err) => console.log(err.message + " is Mongod not running?"));

connection.on("connected", () => console.log("Mongo running at " + mongoURI + "\n\nConnection to the database successfully made!"));

connection.on("disconnected", () => { 
                                      console.log("Mongo disconnected.Attempting to Reconnect");
                                      mongoose.connect(

                                        mongoURI,
                                            
                                        { useNewUrlParser: true, useUnifiedTopology: true },
                                        _ =>{
                                          console.log("Reconnected Successfully");
                                        }
                                      );
                                    }
             );

module.exports      =   connection;