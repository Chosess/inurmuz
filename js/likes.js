fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=10", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDk5NjM3MSwiZXhwIjoxNjg1MDMyMzcxfQ.m8lCMp4va3nuAtKfRal9VHP3NGlsOVdo3oWmIkPHTlc"
  }
})
.then(reponse => reponse.json())
.then(truc => {
  for (let id = 0; id < 10; id++){
    document.querySelector(".favoris").insertAdjacentHTML("beforeend", "<img src='https://music.freefakeapi.io" + truc[id].cover + "'>");
  }
})