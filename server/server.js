const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {verifyToken} = require('./totp')
const User = require('./sequelize')

// routes

const index = require('./router/index')

// Middlewares
app.use(bodyParser.urlencoded({
  extended : false
}));
app.use(bodyParser.json());


app.use('/', index)

app.listen(3000, ()=>{
  console.log(`server up at 3000`)
})