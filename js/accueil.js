fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDgyMzc4MSwiZXhwIjoxNjg0ODU5NzgxfQ.iNBBZaS4Rs7Lv1lWTg0QiTsoZIu2CJfZiPQomyEFfn4"
  }
})
  .then(reponse => reponse.json())
  .then(truc => {
    for (let id = 0; id < 10; id++){
      document.querySelector(".divtest").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "'>");
      console.log(id);
      console.log(truc[id].cover)
    }
  })

  fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=played&limit=8", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDgyMzc4MSwiZXhwIjoxNjg0ODU5NzgxfQ.iNBBZaS4Rs7Lv1lWTg0QiTsoZIu2CJfZiPQomyEFfn4"
  }
})
  .then(reponse => reponse.json())
  .then(truc => {
    for (let id2 = 0; id2 < 8; id2++){
      document.querySelector(".divtest2").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id2].cover + "'>");
      console.log(id2);
      console.log(truc[id2].cover)
    }
  })
