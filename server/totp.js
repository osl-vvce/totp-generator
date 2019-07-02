const crypto = require("crypto");


let getToken = (RG_TIME) => {
 

  let CR_TIME = new Date().getTime();
  let mean = ~~((CR_TIME - RG_TIME) / 30000);
  let hash = crypto.createHmac("sha1", mean.toString()).digest("hex");

  return parseInt("0x" + hash.substr(-4)) % 10000;
};





const verifyToken = (secrete, tok) => {
  let token = getToken(secrete);

  return token === tok
}

module.exports = {verifyToken};