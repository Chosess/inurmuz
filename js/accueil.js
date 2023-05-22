fetch("https://music.freefakeapi.io/api/artists", {
  headers: { 
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJlbWFpbCI6Im0udGFocmk1NTJAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY4NDc0NjQwNiwiZXhwIjoxNjg0NzgyNDA2fQ.MjPT0cyoIovDVTRltTJNfyR3fOI-p3DvCXT5kvabb3k"
  }
})
  .then(reponse => reponse.json())
  .then(truc => console.log(truc))




































// fetch("https://music.freefakeapi.io/api/register", {
//   "pseudo": "unpseudo",
//   "email": "m.tahri552@gmail.com",
//   "password": "Unpasswordassezl0ng!"
// })
//   .then(reponse2 => reponse2.json())
//   .then(truc2 => {
//     fetch("https://music.freefakeapi.io/api/login", {
//       "email": "m.tahri552@gmail.com",
//       "password": "Unpasswordassezl0ng!"
//     })
//     .then(reponse3 => reponse3.json())
//     .then(truc3 => {
//       fetch("https://music.freefakeapi.io/api/artists")
//       .then(reponse4 => reponse4.json())
//       .then(truc4 => console.log(truc4))
//     })
//   })


// fetch("https://music.freefakeapi.io/api/register", {
//   "pseudo": "unpseudo",
//   "email": "m.tahri552@gmail.com",
//   "password": "Unpasswordassezl0ng!"
// })
//   .then(reponse2 => reponse2.json())
//   .then(truc2 => console.log(truc2))