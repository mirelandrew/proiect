

class DBHelper {
    static link(x) {
        window.location.replace(x);
    }
    // FUNCTIE PENTRU LOGIN
    static loginUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (e) {
                //DACA DATELE SUNT INTRODUSE CORECT ATUNCI REDIRECTIONAM USERUL CATRE PRIMA PAGINA
                setTimeout(function(){ DBHelper.link("http://localhost:5500/index.html"); }, 2000);
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log(errorCode);
                var errorMessage = error.message;
                // DACA DATELE SUNT INCORECTE ATUNCI ESTE AFISATA EROAREA
                errorBox.innerHTML = `<p class="errorBox"> ${errorMessage} </p>`;
            
        });
    }


    // FUNCTIE PENTRU CREARE STUDENT 
    static registerUser(email, password, nume, gen, varsta, timpNou) {
        //CREAZA CONTUL
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                //FOLOSIND PARAMETRUL UID ATASAT USERULUI PUTEM INCARCA DATE IN CONTUL RESPECTIV
                db.collection("users").doc(user.uid).set({
                    nume: nume,
                    gen: gen,
                    milisecunde: 0,
                    varsta: varsta,
                    lastLogin: timpNou
                    })
                    .then(function() {
                        //DUPA CE DATELE AU FOST INTRODUSE PUTEM REDIRECTIONA STUDENTUL CATRE PRIMA PAGINA
                        console.log("Document successfully written!");
                        setTimeout(function(){ DBHelper.link("http://localhost:5500/index.html"); }, 5000);
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });    
                //console.log("this is working also");
                //console.log("success register");
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode);
                console.log(errorMessage);
                errorBox.innerHTML = `<p class="errorBox"> ${errorMessage} </p>`;
            });

    }
    
    //FUNCTIE PENTRU AFISARE DATE STUDENT
    static getUserDetails(nume, varsta, timp, lastLogin, displayPage) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in. 
                displayPage.style.display = "block";
                console.log("there is a logged in user with email: " + user.email + " and the id of: " + user.uid );
                // Display user info
                db.collection("users").doc(user.uid).get()
                .then(function(doc) {
                    if (doc.exists) {
                        nume.innerHTML = doc.data().nume;
                        varsta.innerHTML = doc.data().varsta;
                        timp.innerHTML = DBHelper.parseMillisecondsIntoReadableTime( doc.data().milisecunde);
                        lastLogin.innerHTML = doc.data().lastLogin;
                        console.log("Document data:", doc.data());
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                })
                .catch(function(error) {
                     console.log("Error getting document:", error);
                 });
            } else {
                      console.log("no logged in user");
                        // User is signed out.
                    document.write("YOU DONT HAVE ACCES, YOU WILL BE REDIRECTED");
                    setTimeout(function(){ DBHelper.link("http://localhost:5500/index.html"); }, 2000);
              
            }
            
        });
    }
    // FUNCTIE PENTRU ACTUALIZAREA TIMPULUI PETRECUT ONLINE DE STUDENT
    static updateTime(diferentaTimp, endSesiune, startSesiune) {
            var user = firebase.auth().currentUser;
            var docRef = db.collection("users").doc(user.uid);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    diferentaTimp = doc.data().milisecunde;

                    
                    let millisec = endSesiune.getTime() - startSesiune.getTime();
                    diferentaTimp+=millisec;

                    console.log(DBHelper.parseMillisecondsIntoReadableTime(diferentaTimp));

                    // seteaza ultimul login si timpul total online
                                docRef.update({
                                    lastLogin: timpNou,
                                    milisecunde: diferentaTimp
                                })
                                .then(function() {
                                    console.log("Scris cu succes!!!!");
                                })
                                .catch(function(error) {
                                    console.error("Error writing document: ", error);
                                });
                }}).catch(function(error) {
                    console.log("Error getting document:", error);
                    });

                    
            
            //diferentaTimp += millisec;
    }

    static displayMyClass(className) {
        firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                // User is signed in.
                className.innerHTML = "Clasa mea";
                className.setAttribute("href", "/study.html");
             
              
    }
                else {
                    console.log("no logged in user");
                // User is signed out.
                // ...
                }
            });
}
    
    static parseMillisecondsIntoReadableTime(milliseconds){
        //Get hours from milliseconds
        var hours = milliseconds / (1000*60*60);
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
      
        //Get remainder from hours and convert to minutes
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
      
        //Get remainder from minutes and convert to seconds
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
      
      
        return h + ' : ' + m + ' : ' + s;
      }
    

}

