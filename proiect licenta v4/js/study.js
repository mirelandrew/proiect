
const curs1 = document.querySelector(".curs1");
const curs2 = document.querySelector(".curs2");
const iframeCurs = document.getElementsByTagName("iframe")[0];
const logOut = document.querySelector(".logout");
const timp = new Date();
const timpNou = timp.toLocaleString();
let startSesiune = new Date();
let diferentaTimp;



curs1.addEventListener("click", function () {
    iframeCurs.src="http://localhost:5500/ceas/ceas.html";
});

curs2.addEventListener("click", function () {
    iframeCurs.src="http://localhost:5500/calculator/index.html";
});

let loggedInUser = (function() {
          const displayPage = document.querySelector("body");
          const nume = document.querySelector("#nume-utilizator");
          const varsta = document.querySelector("#varsta-utilizator");
          const ore = document.querySelector("#timp-online-utilizator");
          const lastLogin = document.querySelector("#last-login-utilizator");
          DBHelper.getUserDetails(nume,varsta,ore,lastLogin,displayPage);
})();
//INVOCA IMEDIAT FUNCTIA loggedInUser
loggedInUser;
//BUTON PENTRU LOGOUT ATASAT FUNCTIE logOutUser
logOut.addEventListener("click", logOutUser);
/*
setInterval(() => {
    let endSesiune = new Date();
    DBHelper.updateTime(diferentaTimp,endSesiune,startSesiune);
    console.log("updated time online");
}, 10000);
*/
function logOutUser() {
    let endSesiune = new Date();
    DBHelper.updateTime(diferentaTimp,endSesiune,startSesiune);
    firebase.auth().signOut().then(function() {
        
        // Sign-out successful.
        console.log("logout succes");
        setTimeout(function(){ DBHelper.link("http://localhost:5500/index.html"); }, 5000);
      }).catch(function(error) {
        // An error happened.
        console.log("logout error");
      });

}





  





