const express = require("express");
const bodyParser = require("body-parser");
const Speakeasy = require("speakeasy");
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose");
const QRCode = require("qrcode");

const app = express();
const mongoURI = process.env.mogoURI || "mongodb://localhost:27017/osl";
const port = process.env.PORT || 3000;

// Middlewares
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));

const OSL = require("./models/register");

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/secret", (req, res) => {
  const secret = Speakeasy.generateSecret({ length: 20 });

  OSL.deleteMany()
    .then(() => {
      new OSL({ secret: secret.base32, otpauth_url: secret.otpauth_url })
        .save()
        .then(totp => {
          QRCode.toDataURL(totp.otpauth_url, function(err, data_url) {
            // console.log(data_url);
            res.render("secret", { secret: totp.secret, qrcode: data_url });
          });
        });
    })
    .catch(err => console.log(err));
});

app.get("/validate", (req, res) => {
  res.render("validate");
});

app.post("/validate", (req, res) => {
  // console.log(req.body)
  OSL.find({}).then(totp => {
    // console.log(totp);
    let valid = Speakeasy.totp.verify({
      secret: totp[0].secret,
      encoding: "base32",
      token:  req.body.token,
      window: 0
    });
    res.render('validate', {msg : valid})
  }).catch(err => console.log(err));
});
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`server up at ${port}`);
});
