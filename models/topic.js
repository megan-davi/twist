var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TopicSchema = new Schema(
  {
    title: {type: String, max: 100, required: true},
    description: {type: String, max: 1000},
    presenter: {type: String, max: 100, type: Schema.Types.ObjectId, ref: 'Presenter'}
  }
);


// Virtual for topic's URL
TopicSchema
.virtual('url')
.get(function () {
  return '/twist/topic/' + this._id;
});

// Export model
module.exports = mongoose.model('Topic', TopicSchema);
