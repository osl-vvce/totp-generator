const crypto = require('crypto');

module.exports = async  (password) => {
  return crypto
    .createHmac("sha256", process.env.SECRET)
    .update(password)
    .digest("hex");
}