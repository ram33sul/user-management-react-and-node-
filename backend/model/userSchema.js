const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, default: null},
    username: { type: String, unique: true},
    email: { type: String, unique: true},
    phone: { type: String },
    password: { type: String},
})

module.exports = mongoose.model("user", userSchema);