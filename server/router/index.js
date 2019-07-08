const express = require('express');

const User = require('../sequelize')

const hashPassword = require('../config/hashPassword')

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello OSL')
})

router.post('/user/login', (req, res)=> {
  User.findAll({
    where : {
      username : req.body.username,
      password : req.body.password
    }
  }).then(user => {
    res.json(user)
  })
})

router.post('/validate', (req, res) => {
  User.findAll({
    where : {
      username : req.body.username,
      password : req.body.password
    }
  }).then(user => {
    // console.log(user[0].secrete)
    const isValid = verifyToken(user[0].secret, req.body.token)

    res.json({valid : isValid})
  })
})

// Register new user

router.post('/user/register', async (req, res) => { 
  let errors = [] ;
  let body = {
    email : req.body.email,
    username : req.body.username,
    password : req.body.password,
    secret : new Date().getTime(),
  }

  if(!req.body.email || req.body.email === undefined){
    errors.push('Email is not given');
  }
  if(!req.body.username || req.body.username === undefined){
    errors.push('username is not given');
  }
  if(!req.body.password || req.body.password === undefined){
    errors.push('Password is not given')
  }

  if(errors.length > 0){
    res.json({errors})
  } else {
    body.password = await hashPassword(body.password)
      
    User
        .create(body)
        .then(user => {
          res.status(200).json({
            msg : 'Successfully created new user',
            user
          });
        })
        .catch(err => console.log(err));
  }
})     

module.exports = router;