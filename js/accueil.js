document.querySelector("#submit").addEventListener("click", function () {

  fetch("https://music.freefakeapi.io/api/login", {
    method: "post",

    body: JSON.stringify({
      "email": document.querySelector("#email").value,
      "password": document.querySelector("#motdepasse").value
    })
  })
    .then(reponse => reponse.json())
    .then(token2 => {

      if (token2.code == "403") {
        fetch("https://music.freefakeapi.io/api/register", {
          method: "post",

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
            } else {
              document.querySelector(".form").style.display = "none";
              document.querySelector(".accueil").style.display = "block";
              document.querySelector("footer").style.display = "flex";

              fetch("https://music.freefakeapi.io/api/login", {

                method: "post",


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

                              document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                              document.querySelector(".title").textContent = truc[image.id].title;

                              //js pour le lecteur

                              coeurvide.addEventListener("click", function () {
                                coeurvide.style.display = "none";
                                coeurplein.style.display = "initial";

                                fetch("https://music.freefakeapi.io/api/favorites", {
                                  method: "post",

                                  headers: {
                                    Authorization: "Bearer " + sessionStorage.token
                                  },

                                  body: JSON.stringify({
                                    track: truc[image.id].id
                                  })
                                }).then(reponse => reponse.json())
                              })

                              coeurplein.addEventListener("click", function () {
                                coeurplein.style.display = "none";
                                coeurvide.style.display = "initial";

                                fetch("https://music.freefakeapi.io/api/favorites/" + truc[image.id].id, {
                                  method: "delete",
                                  headers: {
                                    Authorization: "Bearer " + sessionStorage.token
                                  }
                                }).then(reponse => reponse.json())
                              })

                              //réduire le lecteur

                              flechebas.addEventListener("click", function () {
                                lecteurmini.style.display = "block";
                                lecteur.style.display = "none";

                              })

                              //agrandir le lecteur

                              flechehaut.addEventListener("click", function () {
                                lecteurmini.style.display = "none";
                                lecteur.style.display = "block";
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
                          Authorization: "Bearer " + sessionStorage.token
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

                              document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                              document.querySelector(".title").textContent = truc[image.id].title;

                              //js pour le lecteur


                              coeurvide.addEventListener("click", function () {
                                coeurvide.style.display = "none";
                                coeurplein.style.display = "initial";

                                fetch("https://music.freefakeapi.io/api/favorites", {
                                  method: "post",

                                  headers: {
                                    Authorization: "Bearer " + sessionStorage.token
                                  },

                                  body: JSON.stringify({
                                    track: truc[image.id].id
                                  })
                                }).then(reponse => reponse.json())
                              })

                              coeurplein.addEventListener("click", function () {
                                coeurplein.style.display = "none";
                                coeurvide.style.display = "initial";

                                fetch("https://music.freefakeapi.io/api/favorites/" + truc[image.id].id, {
                                  method: "delete",
                                  headers: {
                                    Authorization: "Bearer " + sessionStorage.token
                                  }
                                }).then(reponse => reponse.json())
                              })



                              //réduire le lecteur

                              flechebas.addEventListener("click", function () {
                                lecteurmini.style.display = "block";
                                lecteur.style.display = "none";
                              })

                              //agrandir le lecteur

                              flechehaut.addEventListener("click", function () {
                                lecteurmini.style.display = "none";
                                lecteur.style.display = "block";
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
                    }
                  }


                })
            }
          })

        document.querySelector(".form-example").onsubmit = (e) => {
          e.preventDefault();
        }
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

                document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                document.querySelector(".title").textContent = truc[image.id].title;

                //js pour le lecteur

                coeurvide.addEventListener("click", function () {
                  coeurvide.style.display = "none";
                  coeurplein.style.display = "initial";

                  fetch("https://music.freefakeapi.io/api/favorites", {
                    method: "post",

                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    },

                    body: JSON.stringify({
                      track: truc[image.id].id
                    })
                  }).then(reponse => reponse.json())
                })

                coeurplein.addEventListener("click", function () {
                  coeurplein.style.display = "none";
                  coeurvide.style.display = "initial";

                  fetch("https://music.freefakeapi.io/api/favorites/" + truc[image.id].id, {
                    method: "delete",
                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    }
                  }).then(reponse => reponse.json())
                })

                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
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
            Authorization: "Bearer " + sessionStorage.token
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

                document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                document.querySelector(".title").textContent = truc[image.id].title;

                //js pour le lecteur


                coeurvide.addEventListener("click", function () {
                  coeurvide.style.display = "none";
                  coeurplein.style.display = "initial";

                  fetch("https://music.freefakeapi.io/api/favorites", {
                    method: "post",

                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    },

                    body: JSON.stringify({
                      track: truc[image.id].id
                    })
                  }).then(reponse => reponse.json())
                })

                coeurplein.addEventListener("click", function () {
                  coeurplein.style.display = "none";
                  coeurvide.style.display = "initial";

                  fetch("https://music.freefakeapi.io/api/favorites/" + truc[image.id].id, {
                    method: "delete",
                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    }
                  }).then(reponse => reponse.json())
                })



                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
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
    method: "post",

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

                document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                document.querySelector(".title").textContent = truc[image.id].title;

                //js pour le lecteur

                coeurvide.addEventListener("click", function () {
                  coeurvide.style.display = "none";
                  coeurplein.style.display = "initial";

                  fetch("https://music.freefakeapi.io/api/favorites", {
                    method: "post",

                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    },

                    body: JSON.stringify({
                      track: truc[image.id].id
                    })
                  }).then(reponse => reponse.json())
                })

                coeurplein.addEventListener("click", function () {
                  coeurplein.style.display = "none";
                  coeurvide.style.display = "initial";

                  fetch("https://music.freefakeapi.io/api/favorites/" + truc[image.id].id, {
                    method: "delete",
                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    }
                  }).then(reponse => reponse.json())
                })

                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
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
            Authorization: "Bearer " + sessionStorage.token
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

                document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
                document.querySelector(".title").textContent = truc[image.id].title;

                //js pour le lecteur


                coeurvide.addEventListener("click", function () {
                  coeurvide.style.display = "none";
                  coeurplein.style.display = "initial";

                  fetch("https://music.freefakeapi.io/api/favorites", {
                    method: "post",

                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    },

                    body: JSON.stringify({
                      track: truc[image.id].id
                    })
                  }).then(reponse => reponse.json())
                })

                coeurplein.addEventListener("click", function () {
                  coeurplein.style.display = "none";
                  coeurvide.style.display = "initial";

                  fetch("https://music.freefakeapi.io/api/favorites/" + truc[image.id].id, {
                    method: "delete",
                    headers: {
                      Authorization: "Bearer " + sessionStorage.token
                    }
                  }).then(reponse => reponse.json())
                })



                //réduire le lecteur

                flechebas.addEventListener("click", function () {
                  lecteurmini.style.display = "block";
                  lecteur.style.display = "none";
                })

                //agrandir le lecteur

                flechehaut.addEventListener("click", function () {
                  lecteurmini.style.display = "none";
                  lecteur.style.display = "block";
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


      }
    })

  document.querySelector(".connexion").onsubmit = (e) => {
    e.preventDefault();
  }





})

// fetch("https://music.freefakeapi.io/api/login", {

//   method: "post",


//   body: JSON.stringify({
//     "email": "m.tahri552@gmail.com",
//     "password": "Unpasswordassezl0ng!"
//   })
// })
//   .then(reponse => reponse.json())
//   .then(token => sessionStorage.token = token.token)



//il faut mettre les trucs en dessous dans le fetch <--------------------------------------------------------------

// if (sessionStorage.token) {
//   if (!sessionStorage.token == "undefinded") {

//   } else {
//     fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.token
//       }
//     })
//       .then(reponse => reponse.json())
//       .then(truc => {
//         for (let id = 0; id < 10; id++) {
//           document.querySelector(".divtest").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "' id = '" + id + "'>");
//         }

//         let lamusique = document.querySelector(".la_musique_trop_genial");
//         let coeurvide = document.querySelector(".coeurvide");
//         let coeurplein = document.querySelector(".coeurplein");
//         let flechebas = document.querySelector(".flechebas");
//         let lecteur = document.querySelector(".lecteur");
//         let lecteurmini = document.querySelector(".lecteurmini");
//         let flechehaut = document.querySelector(".flechehaut");
//         let pauselec = document.querySelector(".pause_lecture");
//         let lecpause = document.querySelector(".lecture_pause");
//         let lecturemini = document.querySelector(".lecturemini");
//         let pausemini = document.querySelector(".pausemini");
//         let audio = document.querySelector("audio");

//         document.querySelectorAll(".divtest img").forEach(image => {
//           image.addEventListener("click", function () {

//             lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

//             //la durée d'une musique
//             document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

//             //titre_de_la_chanson
//             document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

//             //cover_de_la_chanson
//             document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

//             //le lecteur
//             lecteurmini.style.display = "none";
//             lecteur.style.display = "block";
//             accueil.style.display = "none";

//             document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
//             document.querySelector(".title").textContent = truc[image.id].title;

//             //js pour le lecteur

//             coeurvide.addEventListener("click", function () {
//               coeurvide.style.display = "none";
//               coeurplein.style.display = "initial"
//             })

//             coeurplein.addEventListener("click", function () {
//               coeurplein.style.display = "none";
//               coeurvide.style.display = "initial"
//             })

//             //réduire le lecteur

//             flechebas.addEventListener("click", function () {
//               lecteurmini.style.display = "block";
//               lecteur.style.display = "none";
//               accueil.style.display = "block"
//             })

//             //agrandir le lecteur

//             flechehaut.addEventListener("click", function () {
//               lecteurmini.style.display = "none";
//               lecteur.style.display = "block";
//               accueil.style.display = "none"
//             })

//             // lecture -> pause

//             pauselec.addEventListener("click", function () {
//               pauselec.style.display = "none";
//               lecpause.style.display = "initial";
//               audio.play();
//               lecturemini.style.display = "none";
//               pausemini.style.display = "initial";
//             })

//             lecpause.addEventListener("click", function () {
//               lecpause.style.display = "none";
//               pauselec.style.display = "initial";
//               audio.pause();
//               pausemini.style.display = "none";
//               lecturemini.style.display = "initial";
//             })

//             //lecture mini -> pause mini

//             lecturemini.addEventListener("click", function () {
//               lecturemini.style.display = "none";
//               pausemini.style.display = "initial";
//               audio.play();
//               pauselec.style.display = "none";
//               lecpause.style.display = "initial";
//             })

//             pausemini.addEventListener("click", function () {
//               pausemini.style.display = "none";
//               lecturemini.style.display = "initial";
//               audio.pause();
//               lecpause.style.display = "none";
//               pauselec.style.display = "initial";
//             })

//             //le bouton stop
//             document.querySelector(".bouton_stop").addEventListener("click", function () {
//               pausemini.style.display = "none";
//               lecturemini.style.display = "initial";
//               audio.pause();
//               lecpause.style.display = "none";
//               pauselec.style.display = "initial";
//               audio.currentTime = 0;
//             })

//             pausemini.style.display = "none";
//             lecturemini.style.display = "initial";
//             audio.pause();
//             lecpause.style.display = "none";
//             pauselec.style.display = "initial";

//             //la barre du lecteur
//             let range = document.querySelector("#range");
//             let rangemini = document.querySelector("#rangemini");

//             range.max = Number(truc[image.id].duration.slice(14, 16)) * 60 + Number(truc[image.id].duration.slice(17, 19));
//             rangemini.max = Number(truc[image.id].duration.slice(14, 16)) * 60 + Number(truc[image.id].duration.slice(17, 19));
//           });
//         }
//         );




//       })

//     fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=played&limit=8", {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.token
//       }
//     })
//       .then(reponse => reponse.json())
//       .then(truc => {
//         for (let id2 = 0; id2 < 8; id2++) {
//           document.querySelector(".divtest2").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id2].cover + "' id = '" + id2 + "'>");
//         }

//         let lamusique = document.querySelector(".la_musique_trop_genial");
//         let coeurvide = document.querySelector(".coeurvide");
//         let coeurplein = document.querySelector(".coeurplein");
//         let flechebas = document.querySelector(".flechebas");
//         let lecteur = document.querySelector(".lecteur");
//         let lecteurmini = document.querySelector(".lecteurmini");
//         let flechehaut = document.querySelector(".flechehaut");
//         let pauselec = document.querySelector(".pause_lecture");
//         let lecpause = document.querySelector(".lecture_pause");
//         let lecturemini = document.querySelector(".lecturemini");
//         let pausemini = document.querySelector(".pausemini");
//         let audio = document.querySelector("audio");

//         document.querySelectorAll(".divtest2 img").forEach(image => {
//           image.addEventListener("click", function () {

//             lamusique.src = "https://music.freefakeapi.io" + truc[image.id].file;

//             //la durée d'une musique
//             document.querySelector(".tracktime").textContent = truc[image.id].duration.slice(15);

//             //titre_de_la_chanson
//             document.querySelector(".titre_de_la_chanson").textContent = truc[image.id].title.slice(0, 5) + "...";

//             //cover_de_la_chanson
//             document.querySelector(".cover_de_la_chanson").src = "https://music.freefakeapi.io" + truc[image.id].cover;

//             //artiste_de_la_chanson
//             // document.querySelector(".artiste_de_la_chanson").textContent = truc[image.id].artist

//             //le lecteur
//             lecteurmini.style.display = "none";
//             lecteur.style.display = "block";
//             accueil.style.display = "none";

//             document.querySelector(".cover").src = "https://music.freefakeapi.io" + truc[image.id].cover;
//             document.querySelector(".title").textContent = truc[image.id].title;

//             //js pour le lecteur


//             coeurvide.addEventListener("click", function () {
//               coeurvide.style.display = "none";
//               coeurplein.style.display = "initial"
//             })

//             coeurplein.addEventListener("click", function () {
//               coeurplein.style.display = "none";
//               coeurvide.style.display = "initial"
//             })



//             //réduire le lecteur

//             flechebas.addEventListener("click", function () {
//               lecteurmini.style.display = "block";
//               lecteur.style.display = "none";
//               accueil.style.display = "block"
//             })

//             //agrandir le lecteur

//             flechehaut.addEventListener("click", function () {
//               lecteurmini.style.display = "none";
//               lecteur.style.display = "block";
//               accueil.style.display = "none"
//             })

//             // lecture -> pause

//             pauselec.addEventListener("click", function () {
//               pauselec.style.display = "none";
//               lecpause.style.display = "initial";
//               audio.play();
//               lecturemini.style.display = "none";
//               pausemini.style.display = "initial";
//             })

//             lecpause.addEventListener("click", function () {
//               lecpause.style.display = "none";
//               pauselec.style.display = "initial";
//               audio.pause();
//               pausemini.style.display = "none";
//               lecturemini.style.display = "initial";
//             })

//             //lecture mini -> pause mini

//             lecturemini.addEventListener("click", function () {
//               lecturemini.style.display = "none";
//               pausemini.style.display = "initial";
//               audio.play();
//               pauselec.style.display = "none";
//               lecpause.style.display = "initial";
//             })

//             pausemini.addEventListener("click", function () {
//               pausemini.style.display = "none";
//               lecturemini.style.display = "initial";
//               audio.pause();
//               lecpause.style.display = "none";
//               pauselec.style.display = "initial";
//             })

//             //le bouton stop
//             document.querySelector(".bouton_stop").addEventListener("click", function () {
//               pausemini.style.display = "none";
//               lecturemini.style.display = "initial";
//               audio.pause();
//               lecpause.style.display = "none";
//               pauselec.style.display = "initial";
//               audio.currentTime = 0;
//             })

//             pausemini.style.display = "none";
//             lecturemini.style.display = "initial";
//             audio.pause();
//             lecpause.style.display = "none";
//             pauselec.style.display = "initial";

//             //la barre du lecteur
//             let range = document.querySelector("#range");
//             let rangemini = document.querySelector("#rangemini");

//             range.max = Number(truc[image.id].duration.slice(14, 16)) * 60 + Number(truc[image.id].duration.slice(17, 19));
//             rangemini.max = Number(truc[image.id].duration.slice(14, 16)) * 60 + Number(truc[image.id].duration.slice(17, 19));
//           });
//         }
//         );

//       })
//   }
// }



let home = document.querySelector(".home");
let chanteur = document.querySelector(".chanteur");
let coeur = document.querySelector(".coeur");
let perso = document.querySelector(".perso");


let accueil = document.querySelector(".accueil");
let favoris = document.querySelector(".favoris");
let artistes = document.querySelector(".artistes");

let lecteur = document.querySelector(".lecteur");
let lecteurmini = document.querySelector(".lecteurmini");


home.addEventListener("click", function () {
  accueil.style.display = "block";
  favoris.style.display = "none";
  artistes.style.display = "none";
  // "la classe".style.display = "none";
  lecteurmini.style.display = "block";
  lecteur.style.display = "none";
});


coeur.addEventListener("click", function () { // lààààààààààààààààààààààààààààààààààààààààààààààààààààààààà
  favoris.style.display = "block";
  accueil.style.display = "none";
  artistes.style.display = "none";
  // "la classe".style.display = "none";
  lecteurmini.style.display = "block";
  lecteur.style.display = "none";

  // fetch("https://music.freefakeapi.io/api/favorites", {
  //   method: "post",

  //   headers: {
  //     Authorization: "Bearer " + sessionStorage.token
  //   },

  //   body: JSON.stringify({
  //     track: 53
  //   })
  // }).then(reponse => reponse.json())
  //   .then(truc => console.log(truc))


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

                  favoris.insertAdjacentHTML("beforeend", "<div class='truc_favoris'> <img src='https://music.freefakeapi.io" + truc[id3].cover + "' alt='cover'> <div> <p>" + truc[id3].title + "</p> <p>" + nom.name + "</p> </div> <div> <img src='images/coeurplein.svg' alt='like' class='im" + id3 + "'> <img src='images/coeurvide.svg' alt='like' class='imc" + id3 + " dn'> <p>" + cata.name.slice(0, 6) + " ...</p> </div> </div>");

                  //le dé-like

                  document.querySelector(".im" + id3).addEventListener("click", function () {
                    document.querySelector(".im" + id3).style.display = "none";
                    document.querySelector(".imc" + id3).style.display = "block";

                    fetch("https://music.freefakeapi.io/api/favorites/" + truc[id3].id, {
                      method: "delete",
                      headers: {
                        Authorization: "Bearer " + sessionStorage.token
                      }
                    }).then(reponse => reponse.json())
                  });


                  //le like

                  document.querySelector(".imc" + id3).addEventListener("click", function () {
                    document.querySelector(".im" + id3).style.display = "block";
                    document.querySelector(".imc" + id3).style.display = "none";

                    fetch("https://music.freefakeapi.io/api/favorites", {
                      method: "post",

                      headers: {
                        Authorization: "Bearer " + sessionStorage.token
                      },

                      body: JSON.stringify({
                        track: truc[id3].id
                      })
                    }).then(reponse => reponse.json())
                  });

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
  lecteurmini.style.display = "block";
  lecteur.style.display = "none";
});

perso.addEventListener("click", function () {
  artistes.style.display = "none";
  accueil.style.display = "none";
  favoris.style.display = "none";
  // "la classe".style.display = "block";
  lecteurmini.style.display = "block";
  lecteur.style.display = "none";
})



let audio = document.querySelector("audio");
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



// pausemini.addEventListener("click", function(){
//   pausemini.style.display = "none";
//   lecturemini.style.display = "initial";
// })


document.querySelector(".vers_connexion").addEventListener("click", function () {
  document.querySelector(".form").style.display = "none";
  document.querySelector(".formulaire_de_connexion").style.display = "block";
});