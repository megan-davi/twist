var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ScheduleSchema = new Schema(
  {
    session: {type: Schema.Types.ObjectId, ref: 'Session', required: true},
    room: {type: Schema.Types.ObjectId, ref: 'Room', required: true},
    topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
    presenter: {type: Schema.Types.ObjectId, ref: 'Presenter'}
  }
);


// Virtual for schedule's URL
ScheduleSchema
.virtual('url')
.get(function () {
  return '/twist/schedule/' + this._id;
});

// Export model
module.exports = mongoose.model('Schedule', ScheduleSchema);
