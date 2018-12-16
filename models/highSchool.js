var mongoose = require('mongoose');

// Define Schema
var Schema = mongoose.Schema;

var HighSchoolSchema = new Schema(
  {
    highSchoolName: {type: String, max: 100},
    address: {type: String, max: 400}
  }
);


// Virtual for high school's URL
HighSchoolSchema
.virtual('url')
.get(function () {
  return '/twist/highSchool/' + this._id;
});

// Export function to create model class
module.exports = mongoose.model('HighSchool', HighSchoolSchema);
