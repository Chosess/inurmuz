fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=true&order=latest&limit=5", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDc0NjQwNiwiZXhwIjoxNjg0NzgyNDA2fQ.MjPT0cyoIovDVTRltTJNfyR3fOI-p3DvCXT5kvabb3k"
  }
})
  .then(reponse => reponse.json())
  .then(truc => console.log(truc))
