for (var i = 0; i < 7; i++) {
    console.log(liste1[i]);
    var blocanalogie = document.createElement("section");

    blocanalogie.innerHTML = "<div class='pp' id='ancre" + i + "'>Si j’étais " + liste1[i] + " je serais <strong> <br>" + liste2[i] + "</strong></div> <div class='ppp'>" + liste3[i] + "</div><img src=" + liste4[i] + ">";
    console.log(blocanalogie);
    document.querySelector('.liste-analogie').append(blocanalogie);

    ;
}


//Fait apparaitre le formulaire quand on clique dessus
document.querySelector('.button1').addEventListener('click', function (clic) {
    console.log('click');
    document.querySelector('.formulaire-invisible').animate({ height: '200px', duration: 200 });
    setTimeout(function () {
        document.querySelector('.formulaire-invisible').setAttribute('class', 'formulaire-visible');
    }, 200);
});

//Fait disparaitre le formulaire quans on clique dessus
document.querySelector('.button2').addEventListener('click', function (clic) {
    console.log('click');
    document.querySelector('.formulaire-visible').animate({ height: '200px', duration: 200 });
    setTimeout(function () {
        document.querySelector('.formulaire-visible').setAttribute('class', 'formulaire-invisible');
    }, 200);
});

//Envoie les réponses du formulaire et affiche si ca à marcher ou non.
document.querySelector('.envoyer').addEventListener('click', function (clic) {
    console.log('click');
    fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=estelle.fabert&courriel=" + document.querySelector("#courriel").value + "&message=Si j'étais ... " + document.querySelector("#analogie").value + " je serais ... " + document.querySelector("#valeur-analogie").value).then(function (response) {
        response.json().then(function (data) {
            //console.log("Réponse reçue : ")
            //console.log(data);
            if (data.status == "success") {
                document.querySelector("#messageApresEnvoi").innerHTML = "Merci! Votre message a bien été reçu";
            } else {
                document.querySelector("#messageApresEnvoi").innerHTML = "Problème : votre message n'a pas été reçu";
            }

            //Affiche nouvelle analogie proposer dans le formulaire.
            if (data.status == "success") {
                document.querySelector(".proposition-invisible").setAttribute('class', 'proposition-visible')
            }
        })
    });
});

//Fait apparaitre les mentions légales quand on clique dessus
    document.querySelector('.volet-invisible').addEventListener('click', function (clic) {
        console.log('click');
        document.querySelector('.volet-invisible').animate({ height: '200px', duration: 20 });
        setTimeout(function () {
            document.querySelector('.volet-invisible').setAttribute('class', 'volet-visible');
        }, 20);
    })

//Fait disparaitre les mentions mégales quand on clique dessus
    document.querySelector('.button3').addEventListener('click', function (clic) {
        console.log('click');
        document.querySelector('.volet-visible').animate({ height: '20px', duration: 20 });
        setTimeout(function () {
            document.querySelector('.volet-visible').setAttribute('class', 'volet-invisible');
        }, 20);
});




    //affiche le lien dans la console quand on clique sur envoyer (formulaire)
    /* document.querySelector('.envoyer').addEventListener('click',function(clic){
        console.log("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=estelle.fabert&courriel=" + document.querySelector("#courriel").value + "&message=Si j'étais ... " + document.querySelector("#analogie").value + " je serais ... " + document.querySelector("#valeur-analogie").value);
    }) */
