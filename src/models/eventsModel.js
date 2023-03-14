const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, unique: true },
  description: { type: String, required: true },
  attendee: { type: Schema.Types.ObjectId, ref: 'attendee' },
}, { timestamps: true}
);

module.exports = mongoose.model("event", eventSchema);
