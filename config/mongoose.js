const mongoose = require('mongoose');
const environment=require("./environment")

mongoose.connect(`mongodb://localhost/${environment.database}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;


