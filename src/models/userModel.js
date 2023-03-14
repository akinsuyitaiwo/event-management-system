const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true, minlength: 8 }
}, { timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
