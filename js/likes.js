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

