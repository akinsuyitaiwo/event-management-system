const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String },
  description: { type: String, required: true },
  attendee: { type: Number },
}, { timestamps: true}
);

module.exports = mongoose.model("Event", eventSchema);
