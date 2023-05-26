// fetch('https://music.freefakeapi.io/api/artists?page=1', {
//     headers: {
//       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMCwiZW1haWwiOiJicm91ZXR0ZUB5b3BtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2ODQ5OTY4MDMsImV4cCI6MTY4NTAzMjgwM30.yKGf6FVDBFCiZec3pm4Zmf5TvXpd_B9Z7DJoKxpXsmQ'
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log('Une erreur s\'est produite:', error);
//   });
  
//   // Supposons que vous avez récupéré les noms d'artistes dans un tableau nommé "artistes"
// const artistes = [''];

// // Sélectionnez les éléments d'affichage des noms d'artistes
// const artistNameElements = document.querySelectorAll('.artist-name');

// // Parcourez les éléments et mettez à jour leur contenu avec les noms d'artistes
// artistNameElements.forEach((element, index) => {
//   element.textContent = artistes[index];
// });
fetch('https://music.freefakeapi.io/api/artists?page=1', {
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMCwiZW1haWwiOiJicm91ZXR0ZUB5b3BtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2ODQ5OTY4MDMsImV4cCI6MTY4NTAzMjgwM30.yKGf6FVDBFCiZec3pm4Zmf5TvXpd_B9Z7DJoKxpXsmQ'
  }
})
  .then(response => response.json())
  .then(data => {
    const artistes = data.map(artist => artist.name);


   
    const artistNameElements = document.querySelectorAll('.artist-name');
    artistNameElements.forEach((element, index) => {
      element.textContent = artistes[index];
    });
  })
  .catch(error => {
    console.log('Une erreur s\'est produite:', error);
  });

