const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const schema = new Schema({
  secret : {
    type : String,
    trim : true,
    required: true,
    minlength : 20,
  },
  otpauth_url : {
    type : String,
    trim : true,
    minlength : 20,
  },
})

module.exports = mongoose.model('secrete', schema);