if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.js')
        .then(function(registration) {
          console.log('Service worker is enabled successfully, scope is:', registration.scope);
        })
        .catch(function(error) {
          console.log('Service worker registration failed, error:', error);
        });
  });
}

const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';
var deferredPrompt;
window.addEventListener("beforeinstallprompt", (e)=> {
  // console.log(e);
  e.preventDefault();
  deferredPrompt = e;
  addBtn.style.display = 'block';
  addBtn.addEventListener("click", () => {
    e.prompt();

    e.userChoice.then((res)=> {
      if (res.outcome === "accepted") {
        console.log("user accepted to add home screen")
      } else {
        console.log("user decline to add home screen")
      }
    })
  })
});

localStorage.setItem("email", "test@test.com");
localStorage.setItem("secret", "1569681945027");
const body ={
  email: localStorage.getItem("email"),
  secret: localStorage.getItem("secret")
};

const qrcode = new QRCode("qrcode");
qrcode.makeCode(JSON.stringify(body));

let getToken = (RG_TIME) => {
  let CR_TIME = new Date().getTime();
  let mean = Math.floor((CR_TIME - RG_TIME) / 30000);

  // sha1("");
  // var hash = sha1.create();
  // hash.update(mean.toString())
  // hash.hex();
  //
  // hash = hash.toString("hex");
  // console.log(hash);

  // var hash = CryptoJS.HmacSHA1(mean.toString(), "");
  //   var hashInBase64 = CryptoJS.enc.Base64.stringify(hash).finalize();
  // console.log(hashInBase64.substr(-4));
  // return (parseInt("0x" + hashInBase64.substr(-4)) % 10000);
  var hash1 = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1,mean.toString()); /** Hashing algorithm sha512 */

  // hash1.update();

  var value = '' + hash1.finalize();
  return (parseInt("0x" + value.substr(-4)) % 10000);

};
 // getToken( parseInt(body.secret));
const token =  getToken( parseInt(body.secret));
console.log(token);
