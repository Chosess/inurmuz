fetch("https://music.freefakeapi.io/api/tracks/2", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZW1haWwiOiJ5dXN0eW5pcmluYUBnbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjg0ODI0MzQ4LCJleHAiOjE2ODQ4NjAzNDh9.MS2pRCIHwJiG6KtxL___ys0c-dXm0NMyYYqrYZG-Qg8"
  }
})
  .then(reponse => reponse.json())
  .then(truc => {
    document.querySelector(".test").src = "https://music.freefakeapi.io" + truc.cover;
    // document.querySelector(".test2").textContent = truc.duration;
    document.querySelector(".test3").src = "https://music.freefakeapi.io" + truc.file;
    console.log(truc)
  })
