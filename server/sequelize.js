const Sequelize = require('sequelize');
const userModel = require('./models/user');
const sequelize = new Sequelize('osl', 'postgres', 'admin', {
  dialect : 'postgres'
});

const user = userModel(sequelize, Sequelize);
sequelize.sync()
         .then(() => {
           console.log('connected to Database');
         })
         .catch(err => console.log(err));

module.exports  =  user;

