/* var analogie = ['une couleur','un film','un pays','un animal','un élément','une saison','un aliment' ];
var valeursAnalogie =['le jaune', 'grease?', 'pays', 'un oiseau', 'l\'eau', 'le printemps', 'le chocolat'];
var explication =['car j\'aime le jaune de ouf', 'car les films c\'est bien', 'car c\'est un pays super', 'car il peut voler et pas moi', 'parce que l\ eau c\'est bon', 'parce qu\'il fait beau en cette saison', 'parce que c\'est trop bon']
/* var image = ['dessin grease.jpg'] */


/* var data = [{ analogie:'une couleur', valeursAnalogie: 'le jaune', image:'', explication:'car j\'aime le jaune de ouf...', class:'couleur'},{ analogie:'un film', valeursAnalogie: 'Grease', explication:'car les films c\'est bien', image:scr='dessin grease.jpg', class:'film'}, { analogie:'un pays', valeursAnalogie: 'pays...', explication:'car...', image:'', class:'pays' }, { analogie:'un animal', valeursAnalogie: 'un oiseau', explication:'car je veux voler', image:'' , class:'animal'}, { analogie:'un élément', valeursAnalogie: 'l\'eau', explication:'car...', image:'', class:'élément'},{ analogie:'une saison', valeursAnalogie: 'le printemps', explication:'car...', image:'', class:'saison'}, { analogie:'un aliment', valeursAnalogie: 'le chocolat', explication:'car...', image:'', class:'aliment'} ] */



var liste1 = ['une couleur','un film','un pays','un animal','un élément','une saison','un aliment' ];

var liste2 = ['le jaune', 'Grease', 'le Canada', 'un oiseau', 'l\'eau', 'le printemps', 'le chocolat'];

var liste3 = ['car le jaune est tel un soleil au zénith, par un beau jour d\'été. C\'est aussi une couleur qui représente la joie, la bonne humeur, la positivité et la fête', 'car c\'est film/ comédie musicale que j\'aime beaucoup. Je suis allé le voir au théâtre avec ma mère et ma soeur et j\'en garde un beau souvenir', 'car c\'est un pays que je ne connais pas du tout et que j\'ai promis d\'y emmener ma mère un jour', 'car les oiseaux sont de magnifiques créatures capable de voler et que j\'adorerais en être un', 'car l\' eau est un élément puissant et dangereux comme la mer mais aussi indispensable à la vie', 'parce que c\'est le retour des beaux jours. Il fait ni trop froid, ni trop chaud, parfait!', 'parce que c\'est trop bon, il y en a plein de sorte et on peut en manger quand on veut!'];

var liste4 = ["images/jaune.png", "images/dessinGrease2.png","images/dessinCanada2.png","images/oiseau.png","images/eau.png","images/printemps.png","images/chocolat.png"]




document.querySelector("#analogie").addEventListener('keyup', function(e){
    console.log("Champ analogie modifié");

document.querySelector("#analogieSuggeree").innerHTML = document.querySelector("#analogie").value;
})



document.querySelector("#valeur-analogie").addEventListener('keyup', function(e){
    console.log("Champ valeur-analogie modifié");

    document.querySelector("#valeur-analogieSuggeree").innerHTML = document.querySelector("#valeur-analogie").value;
})


/*  document.querySelector(".envoyer").addEventListener('click', function (e) {

    var urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=fabert&courriel=" + document.querySelector("#courriel").value + "&message=Si j'étais ... " + document.querySelector("#analogie").value + " je serais ... " + document.querySelector("#valeur-analogie").value;
    fetch(urlVisitee).then(function (response) {
        response.json().then(function (data) {
            //console.log("Réponse reçue : ")
            console.log(data);
            if(data.status == "success"){
            document.querySelector("#messageApresEnvoi").innerHTML = "Votre message a bien été reçu";
        }else{
            document.querySelector("#messageApresEnvoi").innerHTML = "Problème : votre message n'a pas été reçu";
        }
        })
    })

}) */