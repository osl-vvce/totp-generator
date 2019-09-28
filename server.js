const express = require('express');
const bodyParser = require('body-parser');
const hbs = require("hbs");
const path = require("path");
require('dotenv').config();

const app = express();

app.use(express.static("public"));

// Middleware
app.use(bodyParser.urlencoded({
  extended : false
}));
app.use(bodyParser.json());

// hbs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials");

require('./router/index')(app);

// To start the server
app.listen(process.env.PORT, ()=>{
  console.log(`server up at ${process.env.PORT}`)
});
