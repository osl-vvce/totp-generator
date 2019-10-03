const express = require("express");

const router = express.Router();
// routers
const controller = require('../controller/controller')
const authJwt = require('./verifyJwtToken')



router.get('/', (req, res) => {
    // res.sendFile(__dirname+ '/index.html');
    res.render("index", {secret: "1234"});
});

// login the users
router.post('/signin',controller.signin);

// Validate the token
router.post('/validate',[authJwt.isAuthenticated] ,controller.validate);

// Register new user
router.post('/signup', controller.signup);

module.exports = router;
