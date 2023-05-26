fetch("https://music.freefakeapi.io/api/tracks?page=1&nopaginate=false&order=latest&limit=100", {
  headers: {
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NTA4MTM1OSwiZXhwIjoxNjg1MTE3MzU5fQ.BmvmzMk7O78l2mcHZQHVPiPci2g3b9RoSRuUGzbszl0"
  }
})
  .then(reponse => {
    console.log(reponse)})