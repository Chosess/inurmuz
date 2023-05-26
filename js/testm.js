document.querySelector("#submit").addEventListener("click", function () {
    fetch("https://music.freefakeapi.io/api/register", {
        method: "post",

        body: JSON.stringify({
            "pseudo": document.querySelector("#identifiant").value,
            "email": document.querySelector("#email").value,
            "password": document.querySelector("#motdepasse").value
        })

    })
        .then(reponse => reponse.json())
        .then(reponse => console.log(reponse))








    // fetch("https://music.freefakeapi.io/api/login", {

    //     method: "post",


    //     body: JSON.stringify({
    //         "email": "m.tahri552@gmail.com",
    //         "password": "Unpasswordassezl0ng!"
    //     })
    // })
        // .then(reponse => reponse.json())
        // .then(token => console.log(token.token))

    // return false;
})
