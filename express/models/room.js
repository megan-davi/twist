const mongoose = require ('mongoose')
var Schema = mongoose.Schema;

const room = new mongoose.schema({
    Building: {type:string},
    Capacity: {type: number},
    });

//Export model
module.exports = mongoose.model ('room', roomSchema);