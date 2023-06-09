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

let home = document.querySelector(".home");
let chanteur = document.querySelector(".chanteur");
let coeur = document.querySelector(".coeur");
let perso = document.querySelector(".perso");
let unartiste = document.querySelector(".un_petit_artiste");


let accueil = document.querySelector(".accueil");
let favoris = document.querySelector(".favoris");
let artistes = document.querySelector(".artistes");


fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=1", {
  headers: {
    Authorization: "Bearer " + sessionStorage.token
  }
}).then(reponse => reponse.json())
  .then(dejaco => {

    if (dejaco.length == "1") {
      accueil.style.display = "block";
      document.querySelector(".form").style.display = "none";

      fetch("https://music.freefakeapi.io/api/login", {
        method: "POST",

        body: JSON.stringify({
          "email": document.querySelector("#email").value,
          "password": document.querySelector("#motdepasse").value
        })
      })
        .then(reponse => reponse.json())
        .then(token2 => {
          // console.log(token2)



          document.querySelector(".form").style.display = "none";
          document.querySelector(".accueil").style.display = "block";
          document.querySelector("footer").style.display = "flex";

          sessionStorage.token = token2.token;


          fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
            headers: {
              Authorization: "Bearer " + sessionStorage.token
            }
          })
            .then(reponse => reponse.json())
            .then(truc => {
              for (let id = 0; id < 10; id++) {
                document.querySelector(".divtest").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "' id = '" + id + "'>");
              }



              document.querySelectorAll(".divtest img").forEach(image => {
                image.addEventListener("click", function () {

                  lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

                  //la durée d'une musique
                  document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

                  //titre_de_la_chanson
                  document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

                  //cover_de_la_chanson
                  document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

                  if (truc[image.id].is_favorite == "true") {
                    coeurvide.style.display = "none";
                    coeurplein.style.display = "initial";
                  } else {
                    coeurplein.style.display = "none";
                    coeurvide.style.display = "initial";
                  }

                  coeurvide.setAttribute("data-id", truc[image.id].id);
                  coeurplein.setAttribute("data-id", truc[image.id].id);


                  //l'artiste
                  fetch("https://music.freefakeapi.io" + truc[image.id].artist, {
                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    }
                  }).then(reponse => reponse.json())
                    .then(lenom => {
                      document.querySelector(".artiste_de_la_chanson").textContent = lenom.name;
                      document.querySelector(".artiste_chanson").textContent = lenom.name;
                    })


                  //le lecteur
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
                  document.querySelector("body").style.overflow = "hidden";

                  document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                  document.querySelector(".title").textContent = truc[image.id].title;


                  //réduire le lecteur

                  flechebas.addEventListener("click", function () {
                    lecteurmini.style.display = "block";
                    lecteur.style.display = "none";
                    document.querySelector("body").style.overflow = "initial";
                  })

                  //agrandir le lecteur

                  flechehaut.addEventListener("click", function () {
                    lecteurmini.style.display = "none";
                    lecteur.style.display = "block";
                    document.querySelector("body").style.overflow = "hidden";
                  })

                  // lecture -> pause

                  pauselec.addEventListener("click", function () {
                    pauselec.style.display = "none";
                    lecpause.style.display = "initial";
                    audio.play();
                    lecturemini.style.display = "none";
                    pausemini.style.display = "initial";

                    lecpause.setAttribute("data-id", truc[image.id].id);

                    // fetch("https://music.freefakeapi.io/api/tracks/" + truc[image.id].id, {
                    //   method: "PATCH",
                    //   headers: {
                    //     Authorization: "Bearer " + sessionStorage.token
                    //   },
                    //   body: JSON.stringify({
                    //     last_play: new Date().toISOString()
                    //   })
                    // })
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
              Authorization: "Bearer " + sessionStorage.token
            }
          })
            .then(reponse => reponse.json())
            .then(truc => {
              for (let id2 = 0; id2 < 8; id2++) {
                document.querySelector(".divtest2").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id2].cover + "' id = '" + id2 + "'>");
              }



              document.querySelectorAll(".divtest2 img").forEach(image => {
                image.addEventListener("click", function () {

                  lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

                  //la durée d'une musique
                  document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

                  //titre_de_la_chanson
                  document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

                  //cover_de_la_chanson
                  document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

                  if (truc[image.id].is_favorite == "true") {
                    coeurvide.style.display = "none";
                    coeurplein.style.display = "initial";
                  } else {
                    coeurplein.style.display = "none";
                    coeurvide.style.display = "initial";
                  }

                  coeurvide.setAttribute("data-id", truc[image.id].id);
                  coeurplein.setAttribute("data-id", truc[image.id].id);

                  //l'artiste
                  fetch("https://music.freefakeapi.io" + truc[image.id].artist, {
                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    }
                  }).then(reponse => reponse.json())
                    .then(lenom => {
                      document.querySelector(".artiste_de_la_chanson").textContent = lenom.name;
                      document.querySelector(".artiste_chanson").textContent = lenom.name;
                    })

                  //le lecteur
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
                  document.querySelector("body").style.overflow = "hidden";

                  document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                  document.querySelector(".title").textContent = truc[image.id].title;




                  //réduire le lecteur

                  flechebas.addEventListener("click", function () {
                    lecteurmini.style.display = "block";
                    lecteur.style.display = "none";
                    document.querySelector("body").style.overflow = "initial";
                  })

                  //agrandir le lecteur

                  flechehaut.addEventListener("click", function () {
                    lecteurmini.style.display = "none";
                    lecteur.style.display = "block";
                    document.querySelector("body").style.overflow = "hidden";
                  })

                  // lecture -> pause

                  pauselec.addEventListener("click", function () {
                    pauselec.style.display = "none";
                    lecpause.style.display = "initial";
                    audio.play();
                    lecturemini.style.display = "none";
                    pausemini.style.display = "initial";

                    lecpause.setAttribute("data-id", truc[image.id].id);

                    // fetch("https://music.freefakeapi.io/api/tracks/" + truc[image.id].id, {
                    //   method: "PATCH",
                    //   headers: {
                    //     Authorization: "Bearer " + sessionStorage.token
                    //   },
                    //   body: JSON.stringify({
                    //     last_play: new Date().toISOString()
                    //   })
                    // })
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



          document.querySelector(".form-example").onsubmit = (e) => {
            e.preventDefault();
          }



        })

      document.querySelector(".form-example").onsubmit = (e) => {
        e.preventDefault();
      }



    }
  })

document.querySelector("#submit").addEventListener("click", function () {

  fetch("https://music.freefakeapi.io/api/login", {
    method: "POST",

    body: JSON.stringify({
      "email": document.querySelector("#email").value,
      "password": document.querySelector("#motdepasse").value
    })
  })
    .then(reponse => reponse.json())
    .then(token2 => {
      // console.log(token2)

      if (token2.code == "403") {
        fetch("https://music.freefakeapi.io/api/register", {
          method: "POST",

          body: JSON.stringify({
            "pseudo": document.querySelector("#identifiant").value,
            "email": document.querySelector("#email").value,
            "password": document.querySelector("#motdepasse").value
          })

        })
          .then(reponse => reponse.json())
          .then(reponse => {

            if (reponse.code == "403") {

              if (reponse.message.email == "Invalid email") {

                document.querySelector(".wrong").innerHTML = "Email invalide";

              } else if (reponse.message.password[0] == "Uppercase missing") {

                document.querySelector(".wrong").innerHTML = "Il manque une majuscule";

              } else if (reponse.message.password[1] == "Number missing") {

                document.querySelector(".wrong").innerHTML = "Il manque un nombre";

              } else if (reponse.message.password[2] == "Special char missing") {

                document.querySelector(".wrong").innerHTML = "Il manque un caractère spécial";

              } else if (reponse.message.password[3] == "Too short, password must be at least 16 characters long") {

                document.querySelector(".wrong").innerHTML = "Mot de passe trop court (au moins 16 caractère)";

              } 
            } else if (reponse.code == "400") {
              
              document.querySelector(".wrong").innerHTML = "Identifiant ou Mot de passe incorrect";//làààààààààààààààààààààààààààààà

            } else if (document.querySelector("#motdepasse").value == document.querySelector("#confirmationmdp").value){
              document.querySelector(".form").style.display = "none";
              document.querySelector(".accueil").style.display = "block";
              document.querySelector("footer").style.display = "flex";

              fetch("https://music.freefakeapi.io/api/login", {

                method: "POST",


                body: JSON.stringify({
                  "email": document.querySelector("#email").value,
                  "password": document.querySelector("#motdepasse").value
                })
              })
                .then(reponse => reponse.json())
                .then(token => {
                  sessionStorage.token = token.token


                  if (sessionStorage.token) {
                    if (sessionStorage.token == "undefinded") {

                    } else {
                      fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
                        headers: {
                          Authorization: "Bearer " + sessionStorage.token
                        }
                      })
                        .then(reponse => reponse.json())
                        .then(truc => {
                          for (let id = 0; id < 10; id++) {
                            document.querySelector(".divtest").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "' id = '" + id + "'>");
                          }



                          document.querySelectorAll(".divtest img").forEach(image => {
                            image.addEventListener("click", function () {

                              lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

                              //la durée d'une musique
                              document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

                              //titre_de_la_chanson
                              document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

                              //cover_de_la_chanson
                              document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

                              if (truc[image.id].is_favorite == "true") {
                                coeurvide.style.display = "none";
                                coeurplein.style.display = "initial";
                              } else {
                                coeurplein.style.display = "none";
                                coeurvide.style.display = "initial";
                              }

                              coeurvide.setAttribute("data-id", truc[image.id].id);
                              coeurplein.setAttribute("data-id", truc[image.id].id);

                              //l'artiste
                              fetch("https://music.freefakeapi.io" + truc[image.id].artist, {
                                headers: {
                                  Authorization: "Bearer " + sessionStorage.token
                                }
                              }).then(reponse => reponse.json())
                                .then(lenom => {
                                  document.querySelector(".artiste_de_la_chanson").textContent = lenom.name;
                                  document.querySelector(".artiste_chanson").textContent = lenom.name;
                                })

                              //le lecteur
                              lecteurmini.style.display = "none";
                              lecteur.style.display = "block";

                              document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                              document.querySelector(".title").textContent = truc[image.id].title;


                              //réduire le lecteur

                              flechebas.addEventListener("click", function () {
                                lecteurmini.style.display = "block";
                                lecteur.style.display = "none";
                                document.querySelector("body").style.overflow = "initial";

                              })

                              //agrandir le lecteur

                              flechehaut.addEventListener("click", function () {
                                lecteurmini.style.display = "none";
                                lecteur.style.display = "block";
                                document.querySelector("body").style.overflow = "hidden";
                              })

                              // lecture -> pause

                              pauselec.addEventListener("click", function () {
                                pauselec.style.display = "none";
                                lecpause.style.display = "initial";
                                audio.play();
                                lecturemini.style.display = "none";
                                pausemini.style.display = "initial";

                                lecpause.setAttribute("data-id", truc[image.id].id);

                                // fetch("https://music.freefakeapi.io/api/tracks/" + truc[image.id].id, {
                                //   method: "PATCH",
                                //   headers: {
                                //     Authorization: "Bearer " + sessionStorage.token
                                //   },
                                //   body: JSON.stringify({
                                //     last_play: new Date().toISOString()
                                //   })
                                // })
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
                          Authorization: "Bearer " + sessionStorage.token
                        }
                      })
                        .then(reponse => reponse.json())
                        .then(truc => {
                          for (let id2 = 0; id2 < 8; id2++) {
                            document.querySelector(".divtest2").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id2].cover + "' id = '" + id2 + "'>");
                          }



                          document.querySelectorAll(".divtest2 img").forEach(image => {
                            image.addEventListener("click", function () {

                              lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

                              //la durée d'une musique
                              document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

                              //titre_de_la_chanson
                              document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

                              //cover_de_la_chanson
                              document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

                              if (truc[image.id].is_favorite == "true") {
                                coeurvide.style.display = "none";
                                coeurplein.style.display = "initial";
                              } else {
                                coeurplein.style.display = "none";
                                coeurvide.style.display = "initial";
                              }

                              coeurvide.setAttribute("data-id", truc[image.id].id);
                              coeurplein.setAttribute("data-id", truc[image.id].id);

                              //l'artiste
                              fetch("https://music.freefakeapi.io" + truc[image.id].artist, {
                                headers: {
                                  Authorization: "Bearer " + sessionStorage.token
                                }
                              }).then(reponse => reponse.json())
                                .then(lenom => {
                                  document.querySelector(".artiste_de_la_chanson").textContent = lenom.name;
                                  document.querySelector(".artiste_chanson").textContent = lenom.name;
                                })

                              //le lecteur
                              lecteurmini.style.display = "none";
                              lecteur.style.display = "block";

                              document.querySelector("body").style.overflow = "hidden";

                              document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                              document.querySelector(".title").textContent = truc[image.id].title;




                              //réduire le lecteur

                              flechebas.addEventListener("click", function () {
                                lecteurmini.style.display = "block";
                                lecteur.style.display = "none";
                                document.querySelector("body").style.overflow = "initial";
                              })

                              //agrandir le lecteur

                              flechehaut.addEventListener("click", function () {
                                lecteurmini.style.display = "none";
                                lecteur.style.display = "block";
                                document.querySelector("body").style.overflow = "hidden";
                              })

                              // lecture -> pause

                              pauselec.addEventListener("click", function () {
                                pauselec.style.display = "none";
                                lecpause.style.display = "initial";
                                audio.play();
                                lecturemini.style.display = "none";
                                pausemini.style.display = "initial";

                                lecpause.setAttribute("data-id", truc[image.id].id);

                                // fetch("https://music.freefakeapi.io/api/tracks/" + truc[image.id].id, {
                                //   method: "PATCH",
                                //   headers: {
                                //     Authorization: "Bearer " + sessionStorage.token
                                //   },
                                //   body: JSON.stringify({
                                //     last_play: new Date().toISOString()
                                //   })
                                // })
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
                    }
                  }


                })
            }
          })

        document.querySelector(".form-example").onsubmit = (e) => {
          e.preventDefault();
        }
      } else if (token2.code == "400") {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      } else {

        document.querySelector(".form").style.display = "none";
        document.querySelector(".accueil").style.display = "block";
        document.querySelector("footer").style.display = "flex";

        sessionStorage.token = token2.token;


        fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
          headers: {
            Authorization: "Bearer " + sessionStorage.token
          }
        })
          .then(reponse => reponse.json())
          .then(truc => {
            for (let id = 0; id < 10; id++) {
              document.querySelector(".divtest").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "' id = '" + id + "'>");
            }



            document.querySelectorAll(".divtest img").forEach(image => {
              image.addEventListener("click", function () {

                lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

                //la durée d'une musique
                document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

                //titre_de_la_chanson
                document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

                //cover_de_la_chanson
                document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

                if (truc[image.id].is_favorite == "true") {
                  coeurvide.style.display = "none";
                  coeurplein.style.display = "initial";
                } else {
                  coeurplein.style.display = "none";
                  coeurvide.style.display = "initial";
                }

                coeurvide.setAttribute("data-id", truc[image.id].id);
                coeurplein.setAttribute("data-id", truc[image.id].id);


                //l'artiste
                fetch("https://music.freefakeapi.io" + truc[image.id].artist, {
                  headers: {
                    Authorization: "Bearer " + sessionStorage.token
                  }
                }).then(reponse => reponse.json())
                  .then(lenom => {
                    document.querySelector(".artiste_de_la_chanson").textContent = lenom.name;
                    document.querySelector(".artiste_chanson").textContent = lenom.name;
                  })


                //le lecteur
                lecteurmini.style.display = "none";
                lecteur.style.display = "block";
                document.querySelector("body").style.overflow = "hidden";

                document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                document.querySelector(".title").textContent = truc[image.id].title;


                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                  document.querySelector("body").style.overflow = "initial";
                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
                  document.querySelector("body").style.overflow = "hidden";
                })

                // lecture -> pause

                pauselec.addEventListener("click", function () {
                  pauselec.style.display = "none";
                  lecpause.style.display = "initial";
                  audio.play();
                  lecturemini.style.display = "none";
                  pausemini.style.display = "initial";

                  lecpause.setAttribute("data-id", truc[image.id].id);

                  // fetch("https://music.freefakeapi.io/api/tracks/" + truc[image.id].id, {
                  //   method: "PATCH",
                  //   headers: {
                  //     Authorization: "Bearer " + sessionStorage.token
                  //   },
                  //   body: JSON.stringify({
                  //     last_play: new Date().toISOString()
                  //   })
                  // })
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
            Authorization: "Bearer " + sessionStorage.token
          }
        })
          .then(reponse => reponse.json())
          .then(truc => {
            for (let id2 = 0; id2 < 8; id2++) {
              document.querySelector(".divtest2").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id2].cover + "' id = '" + id2 + "'>");
            }



            document.querySelectorAll(".divtest2 img").forEach(image => {
              image.addEventListener("click", function () {

                lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

                //la durée d'une musique
                document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

                //titre_de_la_chanson
                document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

                //cover_de_la_chanson
                document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

                if (truc[image.id].is_favorite == "true") {
                  coeurvide.style.display = "none";
                  coeurplein.style.display = "initial";
                } else {
                  coeurplein.style.display = "none";
                  coeurvide.style.display = "initial";
                }

                coeurvide.setAttribute("data-id", truc[image.id].id);
                coeurplein.setAttribute("data-id", truc[image.id].id);

                //l'artiste
                fetch("https://music.freefakeapi.io" + truc[image.id].artist, {
                  headers: {
                    Authorization: "Bearer " + sessionStorage.token
                  }
                }).then(reponse => reponse.json())
                  .then(lenom => {
                    document.querySelector(".artiste_de_la_chanson").textContent = lenom.name;
                    document.querySelector(".artiste_chanson").textContent = lenom.name;
                  })

                //le lecteur
                lecteurmini.style.display = "none";
                lecteur.style.display = "block";
                document.querySelector("body").style.overflow = "hidden";

                document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                document.querySelector(".title").textContent = truc[image.id].title;




                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                  document.querySelector("body").style.overflow = "initial";
                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
                  document.querySelector("body").style.overflow = "hidden";
                })

                // lecture -> pause

                pauselec.addEventListener("click", function () {
                  pauselec.style.display = "none";
                  lecpause.style.display = "initial";
                  audio.play();
                  lecturemini.style.display = "none";
                  pausemini.style.display = "initial";

                  lecpause.setAttribute("data-id", truc[image.id].id);

                  // fetch("https://music.freefakeapi.io/api/tracks/" + truc[image.id].id, {
                  //   method: "PATCH",
                  //   headers: {
                  //     Authorization: "Bearer " + sessionStorage.token
                  //   },
                  //   body: JSON.stringify({
                  //     last_play: new Date().toISOString()
                  //   })
                  // })
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

      }

      document.querySelector(".form-example").onsubmit = (e) => {
        e.preventDefault();
      }



    })

  document.querySelector(".form-example").onsubmit = (e) => {
    e.preventDefault();
  }


})



document.querySelector(".btn2").addEventListener("click", function () {
  fetch("https://music.freefakeapi.io/api/login", {
    method: "POST",

    body: JSON.stringify({
      "email": document.querySelector(".identifiant").value,
      "password": document.querySelector(".mot").value
    })

  })
    .then(reponse => reponse.json())
    .then(token => {

      if (token.code == "403") {

        document.querySelector(".wrong2").innerHTML = "Email ou Mot de passe incorrect";

      } else {
        document.querySelector(".formulaire_de_connexion").style.display = "none";
        document.querySelector(".accueil").style.display = "block";
        document.querySelector("footer").style.display = "flex";

        sessionStorage.token = token.token;


        fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
          headers: {
            Authorization: "Bearer " + sessionStorage.token
          }
        })
          .then(reponse => reponse.json())
          .then(truc => {
            for (let id = 0; id < 10; id++) {
              document.querySelector(".divtest").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "' id = '" + id + "'>");
            }



            document.querySelectorAll(".divtest img").forEach(image => {
              image.addEventListener("click", function () {

                lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

                //la durée d'une musique
                document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

                //titre_de_la_chanson
                document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

                //cover_de_la_chanson
                document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

                if (truc[image.id].is_favorite == "true") {
                  coeurvide.style.display = "none";
                  coeurplein.style.display = "initial";
                } else {
                  coeurplein.style.display = "none";
                  coeurvide.style.display = "initial";
                }

                coeurvide.setAttribute("data-id", truc[image.id].id);
                coeurplein.setAttribute("data-id", truc[image.id].id);

                //l'artiste
                fetch("https://music.freefakeapi.io" + truc[image.id].artist, {
                  headers: {
                    Authorization: "Bearer " + sessionStorage.token
                  }
                }).then(reponse => reponse.json())
                  .then(lenom => {
                    document.querySelector(".artiste_de_la_chanson").textContent = lenom.name;
                    document.querySelector(".artiste_chanson").textContent = lenom.name;
                  })

                //le lecteur
                lecteurmini.style.display = "none";
                lecteur.style.display = "block";
                document.querySelector("body").style.overflow = "hidden";

                document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                document.querySelector(".title").textContent = truc[image.id].title;


                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                  document.querySelector("body").style.overflow = "initial";
                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
                  document.querySelector("body").style.overflow = "hidden";
                })

                // lecture -> pause

                pauselec.addEventListener("click", function () {
                  pauselec.style.display = "none";
                  lecpause.style.display = "initial";
                  audio.play();
                  lecturemini.style.display = "none";
                  pausemini.style.display = "initial";

                  lecpause.setAttribute("data-id", truc[image.id].id);

                  // fetch("https://music.freefakeapi.io/api/tracks/" + truc[image.id].id, {
                  //   method: "PATCH",
                  //   headers: {
                  //     Authorization: "Bearer " + sessionStorage.token
                  //   },
                  //   body: JSON.stringify({
                  //     last_play: new Date().toISOString()
                  //   })
                  // })
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
            Authorization: "Bearer " + sessionStorage.token
          }
        })
          .then(reponse => reponse.json())
          .then(truc => {
            for (let id2 = 0; id2 < 8; id2++) {
              document.querySelector(".divtest2").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id2].cover + "' id = '" + id2 + "'>");
            }



            document.querySelectorAll(".divtest2 img").forEach(image => {
              image.addEventListener("click", function () {

                lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

                //la durée d'une musique
                document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

                //titre_de_la_chanson
                document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

                //cover_de_la_chanson
                document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

                if (truc[image.id].is_favorite == "true") {
                  coeurvide.style.display = "none";
                  coeurplein.style.display = "initial";
                } else {
                  coeurplein.style.display = "none";
                  coeurvide.style.display = "initial";
                }

                coeurvide.setAttribute("data-id", truc[image.id].id);
                coeurplein.setAttribute("data-id", truc[image.id].id);

                //l'artiste
                fetch("https://music.freefakeapi.io" + truc[image.id].artist, {
                  headers: {
                    Authorization: "Bearer " + sessionStorage.token
                  }
                }).then(reponse => reponse.json())
                  .then(lenom => {
                    document.querySelector(".artiste_de_la_chanson").textContent = lenom.name;
                    document.querySelector(".artiste_chanson").textContent = lenom.name;
                  })

                //le lecteur
                lecteurmini.style.display = "none";
                lecteur.style.display = "block";
                document.querySelector("body").style.overflow = "hidden";

                document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                document.querySelector(".title").textContent = truc[image.id].title;



                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                  document.querySelector("body").style.overflow = "initial";
                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
                  document.querySelector("body").style.overflow = "hidden";
                })

                // lecture -> pause

                pauselec.addEventListener("click", function () {
                  pauselec.style.display = "none";
                  lecpause.style.display = "initial";
                  audio.play();
                  lecturemini.style.display = "none";
                  pausemini.style.display = "initial";

                  lecpause.setAttribute("data-id", truc[image.id].id);

                  // fetch("https://music.freefakeapi.io/api/tracks/" + truc[image.id].id, {
                  //   method: "PATCH",
                  //   headers: {
                  //     Authorization: "Bearer " + sessionStorage.token
                  //   },
                  //   body: JSON.stringify({
                  //     last_play: new Date().toISOString()
                  //   })
                  // })
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


      }
    })

  document.querySelector(".connexion").onsubmit = (e) => {
    e.preventDefault();
  }





})





home.addEventListener("click", function () {
  accueil.style.display = "block";
  favoris.style.display = "none";
  artistes.style.display = "none";
  // "la classe".style.display = "none";
  lecteur.style.display = "none";
  document.querySelector("body").style.overflow = "initial";
  unartiste.style.display = "none";
  if (document.querySelector(".la_musique_trop_genial").src == "" || document.querySelector(".la_musique_trop_genial").src.slice(-10) == "index.html") {
    lecteurmini.style.display = "none";
  } else {
    lecteurmini.style.display = "block";
  }
  //tada

  location.reload()
});


coeur.addEventListener("click", function () { // lààààààààààààààààààààààààààààààààààààààààààààààààààààààààà
  favoris.style.display = "block";
  accueil.style.display = "none";
  artistes.style.display = "none";
  // "la classe".style.display = "none";
  lecteur.style.display = "none";
  document.querySelector("body").style.overflow = "initial";
  unartiste.style.display = "none";
  if (document.querySelector(".la_musique_trop_genial").src == "" || document.querySelector(".la_musique_trop_genial").src.slice(-10) == "index.html") {
    lecteurmini.style.display = "none";
  } else {
    lecteurmini.style.display = "block";
  }


  //fetch des favoris

  fetch("https://music.freefakeapi.io/api/favorites", {
    headers: {
      Authorization: "Bearer " + sessionStorage.token
    }
  }).then(reponse => reponse.json())
    .then(truc => {
      // console.log(truc);
      favoris.innerHTML = "";

      //boucle pour récupérer tous les favoris

      for (let id3 = 0; id3 < truc.length; id3++) {

        //fetch des artistes

        fetch("https://music.freefakeapi.io" + truc[id3].artist, {
          headers: {
            Authorization: "Bearer " + sessionStorage.token
          }
        }).then(reponse => reponse.json())
          .then(nom => {
            // console.log(nom);

            //boucle pour récupérer tous les artistes

            for (let id4 = 0; id4 < 1; id4++) {

              //fetch des catégories

              fetch("https://music.freefakeapi.io" + truc[id3].categories[id4], {
                headers: {
                  Authorization: "Bearer " + sessionStorage.token
                }
              }).then(reponse => reponse.json())
                .then(cata => {
                  // console.log(cata);

                  //création de l'html

                  favoris.insertAdjacentHTML("beforeend", "<div class='truc_favoris truc_favoris" + id3 + "'> <img src='https://music.freefakeapi.io" + truc[id3].cover + "' alt='cover'> <div> <p>" + truc[id3].title + "</p> <p>" + nom.name + "</p> </div> <div> <img src='images/coeurplein.svg' alt='like' class='im" + id3 + "'> <img src='images/coeurvide.svg' alt='like' class='imc" + id3 + " dn'> <p>" + cata.name.slice(0, 6) + " ...</p> </div> </div>");



                  //le click sur une musique

                  document.querySelector(".truc_favoris" + id3).addEventListener("click", function () {
                    document.querySelector("audio").src = "https://music.freefakeapi.io" + truc[id3].file;
                    lecteur.style.display = "block";

                    //la durée d'une musique
                    document.querySelector(".tracktime").textContent = truc[id3].duration.slice(15);

                    //titre_de_la_chanson
                    document.querySelector(".titre_de_la_chanson").textContent = truc[id3].title.slice(0, 5) + "...";

                    //cover_de_la_chanson
                    document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[id3].cover;

                    if (truc[id3].is_favorite == "true") {
                      coeurvide.style.display = "none";
                      coeurplein.style.display = "initial";
                    } else {
                      coeurplein.style.display = "none";
                      coeurvide.style.display = "initial";
                    }

                    coeurvide.setAttribute("data-id", truc[id3].id);
                    coeurplein.setAttribute("data-id", truc[id3].id);

                    //l'artiste
                    document.querySelector(".artiste_de_la_chanson").textContent = nom.name;
                    document.querySelector(".artiste_chanson").textContent = nom.name;


                    //le lecteur

                    document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[id3].cover;
                    document.querySelector(".title").textContent = truc[id3].title;

                    //la barre du lecteur
                    let range = document.querySelector("#range");
                    let rangemini = document.querySelector("#rangemini");

                    range.max = Number(truc[id3].duration.slice(14, 16)) * 60 + Number(truc[id3].duration.slice(17, 19));
                    rangemini.max = Number(truc[id3].duration.slice(14, 16)) * 60 + Number(truc[id3].duration.slice(17, 19));
                  })




                  //réduire le lecteur

                  flechebas.addEventListener("click", function () {
                    lecteurmini.style.display = "block";
                    lecteur.style.display = "none";
                    document.querySelector("body").style.overflow = "initial";

                  })

                  //agrandir le lecteur

                  flechehaut.addEventListener("click", function () {
                    lecteurmini.style.display = "none";
                    lecteur.style.display = "block";
                    document.querySelector("body").style.overflow = "hidden";
                  })

                  // lecture -> pause

                  pauselec.addEventListener("click", function () {
                    pauselec.style.display = "none";
                    lecpause.style.display = "initial";
                    audio.play();
                    lecturemini.style.display = "none";
                    pausemini.style.display = "initial";

                    lecpause.setAttribute("data-id", truc[id3].id);

                    // fetch("https://music.freefakeapi.io/api/tracks/" + truc[id3].id, {
                    //   method: "PATCH",
                    //   headers: {
                    //     Authorization: "Bearer " + sessionStorage.token
                    //   },
                    //   body: JSON.stringify({
                    //     last_play: new Date().toISOString()
                    //   })
                    // })
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


                })
            }
          })
      }
    });



});


chanteur.addEventListener("click", function () {
  artistes.style.display = "block";
  accueil.style.display = "none";
  favoris.style.display = "none";
  // "la classe".style.display = "none";
  lecteur.style.display = "none";
  document.querySelector("body").style.overflow = "initial";

  if (document.querySelector(".la_musique_trop_genial").src == "" || document.querySelector(".la_musique_trop_genial").src.slice(-10) == "index.html") {
    lecteurmini.style.display = "none";
  } else {
    lecteurmini.style.display = "block";
  }

  artistes.innerHTML = "";

  document.querySelector(".la_fameuse_div").innerHTML = "";

  fetch("https://music.freefakeapi.io/api/artists?page=1", {
    headers: {
      Authorization: "Bearer " + sessionStorage.token
    }
  }).then(reponse => reponse.json())
    .then(arts => {
      // console.log(arts);
      for (let idd = 0; idd < arts.length; idd++) {
        artistes.insertAdjacentHTML("beforeend", "<div class='un_artiste artiste" + idd + "'><img src='https://music.freefakeapi.io" + arts[idd].picture + "' alt=''><p>" + arts[idd].name + "</p></div>");

        document.querySelector(".artiste" + idd).addEventListener("click", function () {
          artistes.style.display = "none";
          unartiste.style.display = "block";
          document.querySelector(".nomart").textContent = arts[idd].name;
          document.querySelector(".nbart").textContent = arts[idd].tracks.length + " titre(s)";
          document.querySelector(".tempsart").textContent = "La flemme";//làààààààààààààààààààààààààààààààààààààààààààààààààààààààààà
          document.querySelector(".l_image_de_l_artiste").src = "https://music.freefakeapi.io" + arts[idd].picture;

          // document.querySelector(".la_fameuse_div").innerHTML = "";

          for (let ide = 0; ide < arts[idd].tracks.length; ide++) {
            // console.log(arts[idd]);
            fetch("https://music.freefakeapi.io" + arts[idd].tracks[ide], {
              headers: {
                Authorization: "Bearer " + sessionStorage.token
              }
            }).then(reponse => reponse.json())
              .then(musics => {
                // console.log(musics);
                // console.log(arts[idd].name );
                document.querySelector(".la_fameuse_div").insertAdjacentHTML("beforeend", "<div class='les_chansons les_chansons" + ide + "'><img src='https://music.freefakeapi.io" + musics.cover + "' alt=''><div><p>" + musics.title + "</p><p>" + arts[idd].name + "</p></div> <p>" + musics.duration.slice(14) + "</p><div><img src='images/coeurvide.svg' alt=''> <p>Rap</p> </div> </div>");


                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                  document.querySelector("body").style.overflow = "initial";

                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
                  document.querySelector("body").style.overflow = "hidden";
                })

                // lecture -> pause

                pauselec.addEventListener("click", function () {
                  pauselec.style.display = "none";
                  lecpause.style.display = "initial";
                  audio.play();
                  lecturemini.style.display = "none";
                  pausemini.style.display = "initial";

                  lecpause.setAttribute("data-id", musics.id);

                  // fetch("https://music.freefakeapi.io/api/tracks/" + musics.id, {
                  //   method: "PATCH",
                  //   headers: {
                  //     Authorization: "Bearer " + sessionStorage.token
                  //   },
                  //   body: JSON.stringify({
                  //     last_play: new Date().toISOString()
                  //   })
                  // })
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


                document.querySelector(".les_chansons" + ide).addEventListener("click", function () {

                  document.querySelector("audio").src = "https://music.freefakeapi.io" + musics.file;
                  lecteur.style.display = "block";

                  //la durée d'une musique
                  document.querySelector(".tracktime").textContent = musics.duration.slice(15);

                  //titre_de_la_chanson
                  document.querySelector(".titre_de_la_chanson").textContent = musics.title.slice(0, 5) + "...";

                  //cover_de_la_chanson
                  document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + musics.cover;

                  if (arts[idd].is_favorite == "true") {
                    coeurvide.style.display = "none";
                    coeurplein.style.display = "initial";
                  } else {
                    coeurplein.style.display = "none";
                    coeurvide.style.display = "initial";
                  }

                  coeurvide.setAttribute("data-id", arts[idd].id);
                  coeurplein.setAttribute("data-id", arts[idd].id);

                  //l'artiste
                  document.querySelector(".artiste_de_la_chanson").textContent = arts[idd].name;
                  document.querySelector(".artiste_chanson").textContent = arts[idd].name;


                  //le lecteur

                  document.querySelector(".cover").src = "https://music.freefakeapi.io" + musics.cover;
                  document.querySelector(".title").textContent = musics.title;

                  //la barre du lecteur
                  let range = document.querySelector("#range");
                  let rangemini = document.querySelector("#rangemini");

                  range.max = Number(musics.duration.slice(14, 16)) * 60 + Number(musics.duration.slice(17, 19));
                  rangemini.max = Number(musics.duration.slice(14, 16)) * 60 + Number(musics.duration.slice(17, 19));
                })
              })
          }
        })
      }
    })
});

perso.addEventListener("click", function () {
  artistes.style.display = "none";
  accueil.style.display = "none";
  favoris.style.display = "none";
  // "la classe".style.display = "block";
  lecteur.style.display = "none";
  document.querySelector("body").style.overflow = "initial";
  unartiste.style.display = "none";
  lecteurmini.style.display = "none";
  document.querySelector(".form").style.display = "block";
  document.querySelector("footer").style.display = "none";
})



let range = document.querySelector("#range");
let rangemini = document.querySelector("#rangemini");
let elapsed = document.querySelector(".elapsed");
let elapsedmini = document.querySelector(".elapsed_mini");
let duration = audio.duration;
// let pausemini = document.querySelector(".pausemini");

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



pausemini.addEventListener("click", function () {
  pausemini.style.display = "none";
  lecturemini.style.display = "initial";
})


document.querySelector(".vers_connexion").addEventListener("click", function () {
  document.querySelector(".form").style.display = "none";
  document.querySelector(".formulaire_de_connexion").style.display = "block";
});


// il faut trouver comment fonctionne la putain de source sa mère


coeurvide.addEventListener("click", function () {
  coeurvide.style.display = "none";
  coeurplein.style.display = "initial";
  let id_music = this.dataset.id;


  fetch("https://music.freefakeapi.io/api/favorites", {
    method: "POST",

    headers: {
      Authorization: "Bearer " + sessionStorage.token
    },

    body: JSON.stringify({
      track: id_music
    })
  }).then(reponse => reponse.json())
})

coeurplein.addEventListener("click", function () {
  coeurplein.style.display = "none";
  coeurvide.style.display = "initial";
  let id_music = this.dataset.id;

  fetch("https://music.freefakeapi.io/api/favorites/" + id_music, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + sessionStorage.token
    }
  }).then(reponse => reponse.json())
})
let random = document.querySelector(".random_music");

random.addEventListener("click", function () {
  var numeroAleatoire = Math.floor(Math.random() * 60) + 1;

  fetch("https://music.freefakeapi.io/api/tracks?order=alpha&limit=100", {
    headers: {
      Authorization: "Bearer " + sessionStorage.token
    }
  })
    .then(reponse => reponse.json()).then((tracks) => {
      var numeroAleatoire = Math.floor(Math.random() * Object.keys(tracks).length);

      let idMusic = tracks[numeroAleatoire].id;
      let player = document.querySelector("audio")
      if (!player.paused) {
        player.pause();
        document.querySelector(".pause_lecture").style.display = "block";
        document.querySelector(".lecture_pause").style.display = "none";
      }

      fetch("https://music.freefakeapi.io/api/tracks/" + idMusic, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token
        }
      })
        .then(reponse => reponse.json())
        .then(track => {
          console.log(track)
          document.querySelector(".cover").src = "https://music.freefakeapi.io" + track.cover;
          document.querySelector(".title").textContent = track.title;
          player.src = "https://music.freefakeapi.io" + track.file

        })
    })






})


lecpause.addEventListener("click", function () {
  fetch("https://music.freefakeapi.io/api/tracks/" + this.dataset.id, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + sessionStorage.token
    },
    body: JSON.stringify({
      last_play: new Date().toISOString()
    })
  })
})
