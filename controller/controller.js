const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../config/sequelize');
const hashPassword = require('../config/hashPassword');
const totp = require('../config/totp');

exports.signin = async (req, res) => {
  const email = req.body.email;
  const pwd = req.body.password;
  console.log(email, pwd);
  let hashPwd;
  try {
    hashPwd = await hashPassword(pwd);
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
  User.findOne({
    where : {
      email
    }
  }).then(user => {
    if(!user) {
      return res.status(404).json({error :'User data is not found in the database'});
    }

    if(user.password === hashPwd) {
      return res.status(401).json({msg : 'Invalid password'});
    }

    res.status(200).json({user});
  }).catch(err => {
    res.status(500).json({msg : err.message})
  })
};

exports.signup = async (req, res) => {
  let errors = [] ;
  let hashSecret = hashPassword(new Date().getTime());
  let body = {
    email : req.body.email,
    password : req.body.password,
    secret : new Date().getTime(),
  };

  if(!req.body.email){
    errors.push('E-mail is not provided');
  }

  if(!req.body.password){
    errors.push('Password is not provided')
  }

  if(errors.length > 0){
    res.json({errors})
  } else {
    try{
      body.password = await hashPassword(body.password);
    } catch(e){
      return res.json({error: e.message});
    }

    User
        .create(body)
        .then(user => {
          res.status(200).json({
            msg : 'Successfully created new user',
            user
          });
        })
        .catch(err => res.status(400).json(err.errors[0]));
  }
};

exports.validate = (req, res) => {
  const token = req.body.token;
  const email = req.body.email;
  if(!token) {
    return res.status(400).json({msg: 'Authentication Error'})
  }

  User.findOne({
    where : {
      email
    }
  }).then(user => {
    if(!user){
      return res.status(404).json({msg: 'User not found'})
    }
    const verify = totp.verifyToken(user.secret, token);

    if(!verify){
      return res.status(400).json({msg : 'Authentication Error'});
    }

    res.status(200).json({msg : "Token is verified successfully"});

  }).catch(err => {
    res.send(err)
  })
};
