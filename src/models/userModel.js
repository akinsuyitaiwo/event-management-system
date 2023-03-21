const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, maxLength: 100 },
  lastName: { type: String, maxLength: 100 },
  email: { type: String, lowercase: true, unique: true },
  password: { type: String, minlength: 8 },
  role: { type: String, enum: ['user', 'admin'], default: 'user'}
}, { timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
