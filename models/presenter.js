var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PresenterSchema = new Schema(
  {
    lastName: {type: String, max: 100, required: true},
    firstName: {type: String, max: 100, required: true},
    occupation: {type: String, max: 100},
    mainPhone: {type: String, max: 10},
  }
);

// Virtual for presenter's URL
PresenterSchema
.virtual('url')
.get(function () {
  return '/twist/presenter/' + this._id;
});

// Virtual for presenter's full name
PresenterSchema
.virtual('name')
.get(function () {
  return this.firstName + " " + this.lastName;
});


// Export model
module.exports = mongoose.model('Presenter', PresenterSchema);
