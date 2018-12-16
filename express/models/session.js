const mongoose = require ('mongoose')
var Schema = mongoose.Schema;

const session = new mongoose.schema({
    Time: {type:number},
    });

//Export model
module.exports = mongoose.model ('session', sessionSchema);