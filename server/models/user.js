module.exports = (sequlize, type) => {
  return sequlize.define('user', {
    id : {
      type: type.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    username : {
      type : type.STRING,
      allowNull : false
    },
    password : {
      type : type.STRING,
      allowNull : false
    },
    email : {
      type : type.STRING,
      allowNull : false,
      unique : true
    },
    secret : type.STRING
  })
}