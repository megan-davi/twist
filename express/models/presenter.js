const mongoose = require ('mongoose')
var Schema = mongoose.Schema;

const presenter = new mongoose.schema({
    LastName: {type: string},
    FirstName: {type: string},
    Occupation: {type: string},
    MainPhone: {type: number},
    MobilePhone: {type: number},
    Email: {type: string},
    });


//Export model
module.exports = mongoose.model ('presenter', presenterSchema);


// test