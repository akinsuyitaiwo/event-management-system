const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  event: { type: Schema.Types.ObjectId, ref: 'event' },
}
);

module.exports = mongoose.model("attendee", attendeeSchema);
