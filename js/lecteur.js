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
    favoris.style.display = "block";

})

//agrandir le lecteur

flechehaut.addEventListener("click", function(){
    lecteurmini.style.display = "none";
    lecteur.style.display = "block";
    favoris.style.display = "none";
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

let favoris = document.querySelector(".favoris");