var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionSchema = new Schema(
  {
    time: {type: String}
  }
);


// Virtual for session's URL
SessionSchema
.virtual('url')
.get(function () {
  return '/twist/session/' + this._id;
});

// Export model
module.exports = mongoose.model('Session', SessionSchema);
