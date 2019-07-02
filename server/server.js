const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {verifyToken} = require('./totp')
const User = require('./sequelize')

// Middlewares
app.use(bodyParser.urlencoded({
  extended : false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello OSL')
})

app.post('/user/login', (req, res)=> {
  User.findAll({
    where : {
      username : req.body.username,
      password : req.body.password
    }
  }).then(user => {
    res.json(user)
  })
})

app.post('/validate', (req, res) => {
  User.findAll({
    where : {
      username : req.body.username,
      password : req.body.password
    }
  }).then(user => {
    // console.log(user[0].secrete)
    const isValid = verifyToken(user[0].secrete, req.body.token)

    res.json({valid : isValid})
  })
})

app.post('/user/register', (req, res) => {
  User.create({
    username : req.body.username,
    password : req.body.password,
    secrete : new Date().getTime().toString()
  }).then(user => {
    res.json(user)
  }).catch(err => console.log(err))
})


app.listen(3000, ()=>{
  console.log(`server up at 3000`)
})