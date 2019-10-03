const crypto = require("crypto");


let getToken = (RG_TIME) => {


  let CR_TIME = new Date().getTime();
  let mean = ~~((CR_TIME - RG_TIME) / 30000);
  let hash = crypto.createHmac("sha1", mean.toString()).digest("hex");

  return parseInt("0x" + hash.substr(-4)) % 10000;
};

const verifyToken = (secret, user_token) => {
  let token = getToken(secret);

  token = token.toString().padStart(4, "0");

  return token === user_token
};
console.log(getToken(1569681945027));
module.exports = {verifyToken};
