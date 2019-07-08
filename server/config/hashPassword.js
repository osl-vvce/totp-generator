const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

module.exports = async  (password) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if(err) reject(err)
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) reject(err);

        resolve(hash)
      })
    }) 
  })

  return hashedPassword
}