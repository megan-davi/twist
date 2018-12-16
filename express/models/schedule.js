const mongoose = require ('mongoose')
var Schema = mongoose.Schema;

const schedule = new mongoose.schema({
    TopicCode: {},
    PresenterID: {},
    });


//Export model
module.exports = mongoose.model ('schedule', scheduleSchema);