const mongoose = require ('mongoose')
var Schema = mongoose.Schema;


const highschool = new mongoose.schema({
    HSName: {type:string},
    });


    //Export model
module.exports = mongoose.model ('highschool', highschoolSchema);