fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDk5NjM3MSwiZXhwIjoxNjg1MDMyMzcxfQ.m8lCMp4va3nuAtKfRal9VHP3NGlsOVdo3oWmIkPHTlc"
  }
})
  .then(reponse => reponse.json())
  .then(truc => {
    for (let id = 0; id < 10; id++){
      document.querySelector(".divtest").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "'>");
    }
  })

  fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=played&limit=8", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDk5NjM3MSwiZXhwIjoxNjg1MDMyMzcxfQ.m8lCMp4va3nuAtKfRal9VHP3NGlsOVdo3oWmIkPHTlc"
  }
})
  .then(reponse => reponse.json())
  .then(truc => {
    for (let id2 = 0; id2 < 8; id2++){
      document.querySelector(".divtest2").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id2].cover + "'>");
    }
  })

let home = document.querySelector(".home");
let chanteur = document.querySelector(".chanteur");
let coeur = document.querySelector(".coeur");
let perso = document.querySelector(".perso");
let accueil = document.querySelector(".accueil");


home.addEventListener("click", function(){
  accueil.style.display = "initial"
})




//js pour le lecteur

let coeurvide = document.querySelector(".coeurvide");
let coeurplein = document.querySelector(".coeurplein");

coeurvide.addEventListener("click", function(){
    coeurvide.style.display = "none";
    coeurplein.style.display = "initial"
})

coeurplein.addEventListener("click", function(){
    coeurplein.style.display = "none";
    coeurvide.style.display = "initial"

})

let flechebas = document.querySelector(".flechebas");
let lecteur = document.querySelector(".lecteur");
let lecteurmini = document.querySelector(".lecteurmini");
let flechehaut = document.querySelector(".flechehaut");

//réduire le lecteur

flechebas.addEventListener("click", function(){
    lecteurmini.style.display = "block";
    lecteur.style.display = "none";
    accueil.style.display = "block"
})

//agrandir le lecteur

flechehaut.addEventListener("click", function(){
    lecteurmini.style.display = "none";
    lecteur.style.display = "block";
    accueil.style.display = "none"
})

// lecture -> pause

let pauselec = document.querySelector(".pause_lecture");
let lecpause = document.querySelector(".lecture_pause");

pauselec.addEventListener("click", function(){
    pauselec.style.display = "none";
    lecpause.style.display = "initial";
})

lecpause.addEventListener("click", function(){
    lecpause.style.display = "none";
    pauselec.style.display = "initial";
})

//lecture mini -> pause mini

let lecturemini = document.querySelector(".lecturemini");
let pausemini = document.querySelector(".pausemini");

lecturemini.addEventListener("click", function(){
  lecturemini.style.display = "none";
  pausemini.style.display = "initial";
})

pausemini.addEventListener("click", function(){
  pausemini.style.display = "none";
  lecturemini.style.display = "initial";
})