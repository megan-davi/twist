const mongoose = require ('mongoose')
var Schema = mongoose.Schema;


const topic = new mongoose.schema({
    Title: {type: string},
    Description: {type: string},
    });

//Export model
module.exports = mongoose.model ('topic', topicSchema);