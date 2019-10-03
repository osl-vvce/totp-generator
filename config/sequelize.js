const Sequelize = require('sequelize');
const userModel = require('../models/user');
const sequelize = new Sequelize("users", "root", "MySql@1230", {
    host: "localhost",
    dialect: "mysql"
});

const user = userModel(sequelize, Sequelize);
sequelize.sync()
         .then(() => {
           console.log('connected to Database');
         })
         .catch(err => console.log(err));

module.exports  =  user;
