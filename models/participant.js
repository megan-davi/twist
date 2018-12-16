var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ParticipantSchema = new Schema(
  {
    lastName: {type: String, max: 100},
    firstName: {type: String, max: 100},
    address: {type: String, max: 400},
    email: {type: String, max: 300},
    timeStamp: {type: Date, default: Date.now},
    participantType: {type: String, enum: ['Educator/Sponsor', 'Student'], default: 'Student', required: true},
    highSchool: {type: Schema.Types.ObjectId, ref: 'HighSchool'}
  }
);


// Virtual for participant's URL
ParticipantSchema
.virtual('url')
.get(function () {
  return '/twist/participant/' + this._id;
});

// Virtual for participant's full name
ParticipantSchema
.virtual('name')
.get(function () {
  return this.firstName + " " + this.lastName;
});

// Export model
module.exports = mongoose.model('Participant', ParticipantSchema);
