fetch("https://music.freefakeapi.io/api/tracks/1", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDgyMzc4MSwiZXhwIjoxNjg0ODU5NzgxfQ.iNBBZaS4Rs7Lv1lWTg0QiTsoZIu2CJfZiPQomyEFfn4"
  }
})
  .then(reponse => reponse.json())
  .then(truc => {
    document.querySelector(".test").src = "https://music.freefakeapi.io" + truc.cover;
    // document.querySelector(".test2").textContent = truc.duration;
    document.querySelector(".test3").src = "https://music.freefakeapi.io" + truc.file;
    console.log(truc)
  })
