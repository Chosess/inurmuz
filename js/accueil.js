fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
  headers: {
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDk5NjM3MSwiZXhwIjoxNjg1MDMyMzcxfQ.m8lCMp4va3nuAtKfRal9VHP3NGlsOVdo3oWmIkPHTlc"
  }
})
  .then(reponse => reponse.json())
  .then(truc => {
    for (let id = 0; id < 10; id++) {
      document.querySelector(".divtest").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "' id = '" + id + "'>");
    }

    let lamusique = document.querySelector(".la_musique_trop_genial");
    let coeurvide = document.querySelector(".coeurvide");
    let coeurplein = document.querySelector(".coeurplein");
    let flechebas = document.querySelector(".flechebas");
    let lecteur = document.querySelector(".lecteur");
    let lecteurmini = document.querySelector(".lecteurmini");
    let flechehaut = document.querySelector(".flechehaut");
    let pauselec = document.querySelector(".pause_lecture");
    let lecpause = document.querySelector(".lecture_pause");
    let lecturemini = document.querySelector(".lecturemini");
    let pausemini = document.querySelector(".pausemini");
    let audio = document.querySelector("audio");

    document.querySelectorAll(".divtest img").forEach(image => {
      image.addEventListener("click", function () {
        sessionStorage.track = JSON.stringify(truc[image.id]);
        lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

        //la durée d'une musique
        document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

        //titre_de_la_chanson
        document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

        //cover_de_la_chanson
        document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

        //le lecteur
        lecteurmini.style.display = "none";
        lecteur.style.display = "block";
        accueil.style.display = "none";

        document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
        document.querySelector(".title").textContent = truc[image.id].title;

        //js pour le lecteur

        coeurvide.addEventListener("click", function () {
          coeurvide.style.display = "none";
          coeurplein.style.display = "initial"
        })

        coeurplein.addEventListener("click", function () {
          coeurplein.style.display = "none";
          coeurvide.style.display = "initial"
        })

        //réduire le lecteur

        flechebas.addEventListener("click", function () {
          lecteurmini.style.display = "block";
          lecteur.style.display = "none";
          accueil.style.display = "block"
        })

        //agrandir le lecteur

        flechehaut.addEventListener("click", function () {
          lecteurmini.style.display = "none";
          lecteur.style.display = "block";
          accueil.style.display = "none"
        })

        // lecture -> pause

        pauselec.addEventListener("click", function () {
          pauselec.style.display = "none";
          lecpause.style.display = "initial";
          audio.play();
          lecturemini.style.display = "none";
          pausemini.style.display = "initial";
        })

        lecpause.addEventListener("click", function () {
          lecpause.style.display = "none";
          pauselec.style.display = "initial";
          audio.pause();
          pausemini.style.display = "none";
          lecturemini.style.display = "initial";
        })

        //lecture mini -> pause mini

        lecturemini.addEventListener("click", function () {
          lecturemini.style.display = "none";
          pausemini.style.display = "initial";
          audio.play();
          pauselec.style.display = "none";
          lecpause.style.display = "initial";
        })

        pausemini.addEventListener("click", function () {
          pausemini.style.display = "none";
          lecturemini.style.display = "initial";
          audio.pause();
          lecpause.style.display = "none";
          pauselec.style.display = "initial";
        })

        //le bouton stop
        document.querySelector(".bouton_stop").addEventListener("click", function () {
          pausemini.style.display = "none";
          lecturemini.style.display = "initial";
          audio.pause();
          lecpause.style.display = "none";
          pauselec.style.display = "initial";
          audio.currentTime = 0;
        })

        pausemini.style.display = "none";
        lecturemini.style.display = "initial";
        audio.pause();
        lecpause.style.display = "none";
        pauselec.style.display = "initial";

        //la barre du lecteur
        let range = document.querySelector("#range");
        let rangemini = document.querySelector("#rangemini");

        range.max = Number(truc[image.id].duration.slice(14, 16)) * 60 + Number(truc[image.id].duration.slice(17, 19));
        rangemini.max = Number(truc[image.id].duration.slice(14, 16)) * 60 + Number(truc[image.id].duration.slice(17, 19));
      });
    }
    );




  })

fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=played&limit=8", {
  headers: {
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDk5NjM3MSwiZXhwIjoxNjg1MDMyMzcxfQ.m8lCMp4va3nuAtKfRal9VHP3NGlsOVdo3oWmIkPHTlc"
  }
})
  .then(reponse => reponse.json())
  .then(truc => {
    for (let id2 = 0; id2 < 8; id2++) {
      document.querySelector(".divtest2").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id2].cover + "' id = '" + id2 + "'>");
    }

    let lamusique = document.querySelector(".la_musique_trop_genial");
    let coeurvide = document.querySelector(".coeurvide");
    let coeurplein = document.querySelector(".coeurplein");
    let flechebas = document.querySelector(".flechebas");
    let lecteur = document.querySelector(".lecteur");
    let lecteurmini = document.querySelector(".lecteurmini");
    let flechehaut = document.querySelector(".flechehaut");
    let pauselec = document.querySelector(".pause_lecture");
    let lecpause = document.querySelector(".lecture_pause");
    let lecturemini = document.querySelector(".lecturemini");
    let pausemini = document.querySelector(".pausemini");
    let audio = document.querySelector("audio");

    document.querySelectorAll(".divtest2 img").forEach(image => {
      image.addEventListener("click", function () {
        sessionStorage.track = JSON.stringify(truc[image.id]);
        lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

        //la durée d'une musique
        document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

        //titre_de_la_chanson
        document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

        //cover_de_la_chanson
        document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

        //artiste_de_la_chanson
        // document.querySelector(".artiste_de_la_chanson").textContent = truc[image.id].artist

        //le lecteur
        lecteurmini.style.display = "none";
        lecteur.style.display = "block";
        accueil.style.display = "none";

        document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
        document.querySelector(".title").textContent = truc[image.id].title;

        //js pour le lecteur


        coeurvide.addEventListener("click", function () {
          coeurvide.style.display = "none";
          coeurplein.style.display = "initial"
        })

        coeurplein.addEventListener("click", function () {
          coeurplein.style.display = "none";
          coeurvide.style.display = "initial"
        })



        //réduire le lecteur

        flechebas.addEventListener("click", function () {
          lecteurmini.style.display = "block";
          lecteur.style.display = "none";
          accueil.style.display = "block"
        })

        //agrandir le lecteur

        flechehaut.addEventListener("click", function () {
          lecteurmini.style.display = "none";
          lecteur.style.display = "block";
          accueil.style.display = "none"
        })

        // lecture -> pause

        pauselec.addEventListener("click", function () {
          pauselec.style.display = "none";
          lecpause.style.display = "initial";
          audio.play();
          lecturemini.style.display = "none";
          pausemini.style.display = "initial";
        })

        lecpause.addEventListener("click", function () {
          lecpause.style.display = "none";
          pauselec.style.display = "initial";
          audio.pause();
          pausemini.style.display = "none";
          lecturemini.style.display = "initial";
        })

        //lecture mini -> pause mini

        lecturemini.addEventListener("click", function () {
          lecturemini.style.display = "none";
          pausemini.style.display = "initial";
          audio.play();
          pauselec.style.display = "none";
          lecpause.style.display = "initial";
        })

        pausemini.addEventListener("click", function () {
          pausemini.style.display = "none";
          lecturemini.style.display = "initial";
          audio.pause();
          lecpause.style.display = "none";
          pauselec.style.display = "initial";
        })

        //le bouton stop
        document.querySelector(".bouton_stop").addEventListener("click", function () {
          pausemini.style.display = "none";
          lecturemini.style.display = "initial";
          audio.pause();
          lecpause.style.display = "none";
          pauselec.style.display = "initial";
          audio.currentTime = 0;
        })

        pausemini.style.display = "none";
        lecturemini.style.display = "initial";
        audio.pause();
        lecpause.style.display = "none";
        pauselec.style.display = "initial";

        //la barre du lecteur
        let range = document.querySelector("#range");
        let rangemini = document.querySelector("#rangemini");

        range.max = Number(truc[image.id].duration.slice(14, 16)) * 60 + Number(truc[image.id].duration.slice(17, 19));
        rangemini.max = Number(truc[image.id].duration.slice(14, 16)) * 60 + Number(truc[image.id].duration.slice(17, 19));
      });
    }
    );

  })

let home = document.querySelector(".home");
let chanteur = document.querySelector(".chanteur");
let coeur = document.querySelector(".coeur");
let perso = document.querySelector(".perso");
let accueil = document.querySelector(".accueil");


home.addEventListener("click", function () {
  accueil.style.display = "initial"
})




// //js pour le lecteur

// let coeurvide = document.querySelector(".coeurvide");
// let coeurplein = document.querySelector(".coeurplein");

// coeurvide.addEventListener("click", function () {
//   coeurvide.style.display = "none";
//   coeurplein.style.display = "initial"
// })

// coeurplein.addEventListener("click", function () {
//   coeurplein.style.display = "none";
//   coeurvide.style.display = "initial"
// })

// let flechebas = document.querySelector(".flechebas");
// let lecteur = document.querySelector(".lecteur");
// let lecteurmini = document.querySelector(".lecteurmini");
// let flechehaut = document.querySelector(".flechehaut");

// //réduire le lecteur

// flechebas.addEventListener("click", function () {
//   lecteurmini.style.display = "block";
//   lecteur.style.display = "none";
//   accueil.style.display = "block"
// })

// //agrandir le lecteur

// flechehaut.addEventListener("click", function () {
//   lecteurmini.style.display = "none";
//   lecteur.style.display = "block";
//   accueil.style.display = "none"
// })

// // lecture -> pause

// let pauselec = document.querySelector(".pause_lecture");
// let lecpause = document.querySelector(".lecture_pause");

// pauselec.addEventListener("click", function () {
//   pauselec.style.display = "none";
//   lecpause.style.display = "initial";
// })

// lecpause.addEventListener("click", function () {
//   lecpause.style.display = "none";
//   pauselec.style.display = "initial";
// })

// //lecture mini -> pause mini

// let lecturemini = document.querySelector(".lecturemini");
// let pausemini = document.querySelector(".pausemini");

// lecturemini.addEventListener("click", function () {
//   lecturemini.style.display = "none";
//   pausemini.style.display = "initial";
// })

// pausemini.addEventListener("click", function () {
//   pausemini.style.display = "none";
//   lecturemini.style.display = "initial";
// })

let audio = document.querySelector("audio");
let range = document.querySelector("#range");
let rangemini = document.querySelector("#rangemini");
let elapsed = document.querySelector(".elapsed");
let elapsedmini = document.querySelector(".elapsed_mini");
let duration = audio.duration;

range.addEventListener("input", function () {
  elapsed.textContent = buildDuration(audio.value);
  elapsedmini.textContent = buildDuration(audio.value);
  audio.currentTime = this.value;
})

rangemini.addEventListener("input", function () {
  elapsed.textContent = buildDuration(audio.value);
  elapsedmini.textContent = buildDuration(audio.value);
  audio.currentTime = this.value;
})



audio.addEventListener("timeupdate", function () {
  range.value = audio.currentTime;
  rangemini.value = audio.currentTime;
  elapsed.textContent = buildDuration(audio.currentTime);
  elapsedmini.textContent = buildDuration(audio.currentTime);
})



buildDuration(duration);

function buildDuration(duration) {
  let minutes = Math.floor(duration / 60);
  let reste = duration % 60;
  let secondes = Math.floor(reste);
  secondes = String(secondes).padStart(2, "0");
  return minutes + ":" + secondes;
}


