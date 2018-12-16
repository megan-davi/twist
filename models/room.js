var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema(
  {
    roomNumber: {type: Number, required: true},
    building: {type: String, max: 100, required: true},
    capacity: {type: Number}
  }
);


// Virtual for room's URL
RoomSchema
.virtual('url')
.get(function () {
  return '/twist/room/' + this._id;
});

// Export model
module.exports = mongoose.model('Room', RoomSchema);
