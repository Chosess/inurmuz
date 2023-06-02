let random = document.querySelector(".random_music");

random.addEventListener("click", function () {
var numeroAleatoire = Math.floor(Math.random() * 60) + 1;
// console.log(numeroAleatoire)
fetch("https://music.freefakeapi.io/api/tracks/" + numeroAleatoire, {
          headers: {
            Authorization: "Bearer " + sessionStorage.token
          }
        })
          .then(reponse => reponse.json())
          .then(reponse => reponse.json())
          console.log(reponse)

  
    })
 
