//La majeure partie de ce code est une version adaptée au projet Dataviz du tutoriel Interactive Choropleth Map du site leafletjs.com de Volodymyr Agafonkin que vous pouvez trouver ici : https://leafletjs.com/examples/choropleth/
//La base de données Geojson a été quant à elle tirée de ce site https://geojson-maps.ash.ms/ créé par @ashkyd qui permet de générer des fichiers geo.json avec les coordonnées des pays sélectionnés

const mapEurope = 'custom.geo.json';
let geojsoncouche = null;
var geojson;
// Initialisation du pays choisi (pas encore choisi)
var layer = null;

const Sources = [
        {
            "lien":"#",
            "nom":"Source indisponible"
        },{
            "lien":"https://www.femmeactuelle.fr/sante/sante-pratique/droit-avortement-en-france-histoire-d-un-combat-2047911",
            "nom":"Droit à l’avortement en France, l’histoire du combat - Femme Actuelle"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Droit_de_l%27avortement#:~:text=13%20d%C3%A9cembre%202018.-,Islande,tout%20moment%20de%20la%20grossesse",
            "nom":"Droit de l’avortement - Wikipédia"
        },
        {
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Irlande_(pays)",
            "nom":"Avortement en Irlande - Wikipédia"
        },
        {
            "lien":"https://avortement.ooreka.fr/comprendre/avortement-etranger",
            "nom":"Avortement à l’étranger - Ooreka"
        },
        {
            "lien":"http://eurojournalist.eu/le-droit-des-femmes-a-lislandaise/#:~:text=En%20Islande%2C%20l%E2%80%99avortement%20est%20un%20droit%20depuis%201935%2C,exemple%20une%20incapacit%C3%A9%20de%20prendre%20en%20charge%20l%E2%80%99enfant",
            "nom":"Le droit des femmes à l’islandaise - Eurojournalist"
        },
        {
            "lien":"https://www.lisbob.net/fr/blog/ivg-avortement-tout-savoir-ou-quand-comment-portugal",
            "nom":"Article - Portugal : IVG et Avortement tout savoir (Où ? Quand ? Comment ?) - Lisbob"
        },
        {
            "lien":"https://www.50-50magazine.fr/2015/07/27/droit-a-lavortement-au-portugal-un-grand-pas-en-arriere-apres-huit-ans-davancees-pour-les-femmes/#:~:text=Depuis%20le%20r%C3%A9f%C3%A9rendum%20de%202007%2C%20les%20femmes%20portugaises,prise%20en%20charge%20par%20le%20syst%C3%A8me%20de%20sant%C3%A9",
            "nom":"Article - Droit à l’avortement au Portugal : un grand pas en arrière après huit ans d’avancées - 50/50 Magazine"
        },
        {
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Espagne",
            "nom":"Avortement en Espagne - page wikipédia"
        },
        {
            "lien":"https://major-prepa.com/langues/espagnol/legalisation-avortement-pays-hispanophones/#:~:text=Jusqu%E2%80%99en%201985%2C%20avorter%20est%20consid%C3%A9r%C3%A9%20comme%20un%20d%C3%A9lit.,viol%C3%A9es%20et%20en%20cas%20de%20malformation%20du%20f%C5%93tus",
            "nom":"Article - La légalisation de l’avortement dans les pays hispanophones - Major Prepa"
        },
        {
            "lien":"",
            "nom":"Courrier international n°1666 du 6 au 12 octobre"
        },
        {
            "lien":"https://fr.wikipedia.org/wiki/Droit_de_l'avortement#Royaume-Uni ",
            "nom":"Avortement en Royaume-Uni - Wikipédia"
        },
        {
            "lien":"https://lequotidien.lu/a-la-une/pour-linscription-du-droit-a-lavortement-dans-la-constitution/",
            "nom":"Article - Pour l’inscription du droit à l’avortement dans la Constitution"
        },
        {
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Belgique",
            "nom":"Avortement en Belgique - Wikipédia"
        },
        {
            "lien":"https://www.genethique.org/avortement-les-pays-bas-suppriment-le-delai-de-reflexion/",
            "nom":"Article - Avortement : Les Pays-Bas suppriment le délai de réflexion"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_aux_Pays-Bas",
            "nom":"Avortement aux Pays-Bas - Wikipédia"
        },{
            "lien":"https://www.sante-sexuelle.ch/themes/grossesse-voulue-non-voulue/interrompre#histoire-de-l-interruption-de-grossesse-en-suisse ",
            "nom":"Article - Grossesse non voulue : histoire de l’interruption de grossesse en Suisse"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Suisse ",
            "nom":"Avortement en Suisse - Wikipédia"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Russie ",
            "nom":"Avortement en Russie - Wikipédia"
        },{
            "lien":"https://www.lefigaro.fr/vox/monde/avortement-l-etat-de-la-situation-en-allemagne-20220706",
            "nom":"Article - Avortement : l’état de la situation en Allemagne - Le Figaro"
        },{
            "lien":"https://www.ouest-france.fr/europe/allemagne/avortement-l-allemagne-supprime-une-loi-de-l-ere-nazie-04d3c35a-f3dc-11ec-96c2-5c611dc93293 ",
            "nom":"Article - Avortement : l’Allemagne supprime une loi de l’érénazie - Ouest-France"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Loi_sur_l%27interruption_volontaire_de_grossesse_en_R%C3%A9publique_d%C3%A9mocratique_allemande#cite_note-P218-1 ",
            "nom":"Article - Loi sur l’interruption volontaire de grossesse en République Démocratique Allemande - Wikipédia"
        },{
            "lien":"http://www.humansforwomen.org/le-blog/avortement-italie/",
            "nom":"Article - Avortement en Italie - Humans for Women"
        },{
            "lien":"https://www.rfi.fr/fr/europe/20221004-italie-quid-du-droit-%C3%A0-l-avortement-apr%C3%A8s-la-victoire-de-girogia-meloni",
            "nom":"Article - Italie : Quid du droit à l’avortement après la victoire de Girogia Meloni - RFI"
        },{
            "lien":"https://www.lefigaro.fr/international/le-debat-sur-l-avortement-relance-au-danemark-20220811#:~:text=Le%20royaume%20scandinave%20fit%20figure,du%20continent%20en%20la%20mati%C3%A8re.",
            "nom":"Article - Le débat sur l’avortement : relance au Danemark - Le Figaro"
        },{
            "lien":"https://www.sudouest.fr/sante/a-malte-seul-pays-d-europe-qui-interdit-totalement-l-avortement-des-medecins-deposent-un-recours-11449158.php",
            "nom":"Article - Malte : seul pays d’Europe qui interdit totalement l’avortement - Sud Ouest"
        },{
            "lien":"https://www.genethique.org/avortement-a-malte-le-president-pret-a-demissionner/",
            "nom":"Article - Avortement à Malte le président prêt à démisionner - Genethique"
        },{
            "lien":"https://causam.fr/medecine-et-sante-encyclopedie/180-histoire-de-l-avortement",
            "nom":"Histoire de l’avortement - Encyclopédie: médecine et santé - Causam"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Histoire_des_femmes_en_Norv%C3%A8ge",
            "nom":"Histoire des femmes en Norvège - Wikipédia"
        },{
            "lien":"https://www.touteleurope.eu/societe/le-droit-a-l-avortement-dans-l-union-europeenne/",
            "nom":"Article - Le droit à l’avortement dans l’Union européenne - Toute l’europe"
        },{
            "lien":"https://www.sudouest.fr/societe/le-droit-a-l-avortement-et-son-histoire-un-tres-long-combat-11440980.php",
            "nom":"Article - Le droit à l’avortement et son histoire - Sud Ouest"
        },{
            "lien":"https://reproductiverights.org/maps/worlds-abortion-laws/?country=FIN",
            "nom":"Article - The World’s Abortion Laws - Reproductive rights"
        },{
            "lien":"",
            "nom":""
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_%C3%A0_Monaco",
            "nom":"Avortement à Monaco - Wikipédia"
        },{
            "lien":"https://en.wikipedia.org/wiki/Estonia#World_War_II,_Soviet_and_German_Occupations",
            "nom":"Avortement en Estonie - Wikipédia (en)"
        },{
            "lien":"https://your-safe-abortion.com/law/abortion-laws-poland/",
            "nom":"L’avortement en pologne - Your safe abortion (en)"
        },{
            "lien":"https://abort-report.eu/europe/",
            "nom":"Europe - Abort report (en)"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Bi%C3%A9lorussie ",
            "nom":"Avortement au Bélarus - Wikipédia"
        },{
            "lien":"https://www.village-justice.com/articles/reglementation-juridique-avortement-hongrie,32211.html ",
            "nom":"Article - Réglementation juridique avortement en Hongrie - site village justice"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Serbia",
            "nom":"Avortement en Serbie - Wikipédia (en)"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_au_Liechtenstein ",
            "nom":"Avortement au Liechtenstein - Wikipédia"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_%C3%A0_Saint-Marin ",
            "nom":"Avortement au Saint-Marin - Wikipédia"
        },{
            "lien":"https://lepetitjournal.com/societe/avortement-en-europe-quels-sont-les-delais-respecter-260137",
            "nom":"Article - Avortement en Europe : Quels sont les délais à respecter - site le petit journal"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Romania",
            "nom":"Avortement en Roumanie - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Women_in_Vatican_City",
            "nom":"Avortement au Vatican - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Montenegro",
            "nom":"Avortement au Montenegro - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Turkey",
            "nom":"Avortement en Turquie - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Lithuania#:~:text=On%2031%20December%201987%2C%20the,abortions%20and%2035%2C626%20live%20births.",
            "nom":"Avortement en Lituanie - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Slovenia",
            "nom":"Avortement en Slovénie - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_North_Macedonia",
            "nom":"Avortement en Macédoine du nord - Wikipédia (en)"
        },{
            "lien":"https://www.persee.fr/doc/pop_0032-4663_1994_num_49_4_4247",
            "nom":"Histoire de la statistique de l'avortement en Russie et en URSS jusqu'en 1991"
        },{
            "lien":"https://www.spdc.pt/files/publicacoes/Pub_AbortionlegislationinEuropeIPPFEN_Feb2009.pdf",
            "nom":"Abortion legislation in Europe (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Ukraine",
            "nom":"Avortement en Ukraine - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Albania",
            "nom":"Avortement en Albanie - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Greece",
            "nom":"Avortement en Grèce - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Austria",
            "nom":"Avortement en Autriche - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Croatia",
            "nom":"Avortement en Croatie - Wikipédia (en)"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Andorre ",
            "nom":"Avortement en Andorre - Wikipédia"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Latvia",
            "nom":"Avortement en Lettonie - Wikipédia (en)"
        },{
            "lien":"https://www.liberation.fr/planete/2007/05/08/la-suede-propose-l-ivg-pour-tous_92545/",
            "nom":"Article - La Suède propose l’IVG pour tous - Libération"
        },{
            "lien":"https://www.persee.fr/doc/pop_0032-4663_1947_num_2_3_1829",
            "nom":"Article - Les avortements légaux eugéniques en Suède, au Danemark et en Suisse - site persee"
        },{
            "lien":"https://www.50-50magazine.fr/2012/06/11/ivg-en-bulgarie-quand-le-discours-moral-remplace-linaction-de-letat/",
            "nom":"Article - IVG en Bulgarie : quand le discours moral remplace l’inaction de l’Etat - site 50-50 magazine"
        },{
            "lien":"https://www.cairn.info/revue-population-et-avenir-2005-1-page-17.htm",
            "nom":"Article - La Bulgarie en crise démographique - site cairn"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Bosnie-Herz%C3%A9govine",
            "nom":"Avortement en Bosnie-Herzégovine - Wikipédia"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Moldavie#:~:text=L'avortement%20en%20Moldavie%20est,minist%C3%A8re%20de%20la%20Sant%C3%A9%20moldave.",
            "nom":"Avortement en Moldavie - Wikipédia"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Russia",
            "nom":"Avortement en Russie - Wikipédia (en)"
        },{
            "lien":"https://en.wikipedia.org/wiki/Abortion_in_Poland",
            "nom":"Avortement en Pologne - Wikipédia (en)"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Pologne",
            "nom":"Avortement en Pologne - Wikipédia "
        },{
            "lien":"https://histoireengagee.ca/lavortement-en-pologne-devolution-dune-pratique-aux-xxe-et-xxie-siecle/",
            "nom":"Article - L’avortement en Pologne d’évolution d’une pratique au XXe et XXIe siècle - site histoire engagée"
        },{
            "lien":"https://francais.radio.cz/histoire-de-livg-la-republique-tcheque-un-pays-en-avance-8155272",
            "nom":"Article - Histoire de l’IVG : la République tchèque, un pays en avance ? - site Français radio"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Slovaquie",
            "nom":"Avortement en Slovaquie - Wikipédia "
        },{
            "lien":"https://www.jstor.org/stable/2949057",
            "nom":"Article de journal - The History of Abortion Statistics in Russia and the USSR from 1900 to 1991"
        },{
            "lien":"https://fr.wikipedia.org/wiki/Avortement_en_Hongrie",
            "nom":"Avortement en Hongrie - Wikipédia "
        },{
            "lien":"https://www.village-justice.com/articles/reglementation-juridique-avortement-hongrie,32211.html",
            "nom":"Extrait d’une thèse - La réglementation juridique de l’avortement en Hongrie"
        },{
            "lien":"https://www.washingtonpost.com/world/2022/09/15/hungary-abortion-viktor-orban/",
            "nom":"Article - Hungary decree says abortion-seekers must listen to fetal vital signs - Washington Post"
        }
    ]
//Fonction qui initialise les couleurs de la carte
function coloreCarte(){
    geojsoncouche.eachLayer(function(layer){
        layer.setStyle(styleupdate(layer.feature))
    }); 
};

document.querySelector("#fader").addEventListener("change", ()=> {
    rangeSlide(document.querySelector("#fader").value)
    coloreCarte();
});

//Fonction qui gère le curseur
function rangeSlide(value) {
    document.getElementById('rangeValue').innerHTML = value;
    if(layer != null){
        // Mise à jour du texte affiché en fonction du pays choisi
        afficheTexte(layer.feature);
    };
}

//Fonction qui affiche le texte correspondant au pays et à la date choisie
function afficheTexte(feature){
    let valeurCurseur = document.querySelector("#fader").value;
    valeurCurseur = testAfficheText(valeurCurseur,feature);
    if(valeurCurseur >= 1912){
        let content = "<strong>Depuis " 
        + valeurCurseur 
        + "</strong><br>" 
        + feature.properties["d"+valeurCurseur].texte
        + "<br>";
        //Affichage des sources
        if(feature.properties["d"+valeurCurseur].link != undefined){
            /* const Sources =[];
            const Sources1 = fetch("./sources.json")
                .then(response => response.json())
                .then(data => {
                    //parcours du json
                    console.log(data)}) */

            if(Sources[feature.properties["d"+valeurCurseur].link.numero] != undefined){
                content = content + "Sources : <a href='" 
                + Sources[feature.properties["d"+valeurCurseur].link.numero].lien 
                + "'>" 
                + Sources[feature.properties["d"+valeurCurseur].link.numero].nom 
                + "</a>";
            } else {
                console.log("Source manquante dans le tableau de sources");
                content = content +"<p>" 
                + Sources[0].nom
                + "</p>";  
            }
        } else {
            console.log("Source manquante dans la base de données custom.geo.json");
            content = content + "<p>Source manquante</p>"; 
        }
        document.querySelector("#explication p").innerHTML = content;}
    else{
        document.querySelector("#explication p").innerHTML = "Cliquez sur un pays coloré pour obtenir plus d'informations.";
    }
}
//Fonction qui teste si un texte est disponible à la date choisie, sinon il retourne la date du texte antérieur, et s'il n'y en a aucun alors il retourne 1912 la date la plus ancienne
function testAfficheText(valeurCurseur,feature){
    while (valeurCurseur >= 1912){
        if(feature.properties["d"+valeurCurseur]!=undefined){
            return valeurCurseur;
        } else {
            valeurCurseur= valeurCurseur-1;
        }
    }
}

//Fonction qui met a jour les couleur des pays en fonction de leurs indicateur à la date sélectionnée par le curseur
function styleupdate(features){
    let valueCurseur = document.querySelector("#fader").value;
    while (valueCurseur>=1913){
        if(features.properties["d"+valueCurseur]!=undefined){
            let lesdates = features.properties["d"+valueCurseur];
            return {fillColor: ColorLevel(lesdates.niveau)}
        } else {
            valueCurseur= valueCurseur-1
        }
    }
    return {fillColor: ColorLevel(0)}
    }

//Fonction qui renvoie une couleur en fonction du niveau de l'indicateur
function ColorLevel(niveau) {
    if(niveau<=4){
        const tabColor = ["#b0b0b0","#E32932","#BE95C4","#F6AA1C","#5A90D6"];
        return tabColor[niveau];
    } else if (niveau>4){
        console.log("erreure de saisit dans la base de donnée, niveau trop élevé : "+niveau);
    }
    else {
        return "#b0b0b0";
    }
};

//attribue le style au pays
function style(niveau) {
    return {
        fillColor: ColorLevel(niveau),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

//stylise les bordures lors du passage du curseur
function hoverstyle(niveau) {
    return{
        fillColor: ColorLevel(niveau),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0
    }
}

//supprime le style du pays
function nostyle(){
    return {
        fillColor: 'rgba(255, 255, 255, 0)',
        weight: 0,
        opacity: 0,
        color: 'rgba(255, 255, 255, 0)',
        dashArray: '',
        fillOpacity: 0
    };
}

//affiche la carte
const legend = L.control({position: 'bottomleft'});
$.getJSON(mapEurope,function(data){
    var map = L.map('map').setView([58, 20], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);/* 
    console.log(data) */
    geojsoncouche = L.geoJson(data, {clickable: false, style: style}).addTo(map);
    legend.addTo(map);
    geojson = L.geoJson(data, {style: hoverstyle, onEachFeature: onEachFeature}).addTo(map);
    // Initialiser à l'année 2022
    document.querySelector("#fader").value = 2022;
    // Simuler le clic sur l'outil de choix de date
    document.querySelector("#fader").dispatchEvent(new Event("change"));
})

//affiche la légende
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        level = [0, 1, 2, 3, 4];
        text = ["Pas de données","Illégal","Illégal sauf conditions (danger, viol, inceste)","Légal sous conditions (santé, économie, statut social)","Légal sans conditions (en fonction des délais)"];
    for (var i = 0; i < level.length; i++) {
        div.innerHTML +=
            '<i style="background:' + ColorLevel(level[i]) + '"></i> ' + text[i] + "</br>";
    }
    return div;
}

function highlightFeature(e) {
    var layer = e.target;
    
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });

    layer.bringToFront();
    /* info.update(layer.feature.properties); */
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    /* info.update(); */
}

function zoomToFeature(e) {
    layer = e.target;
    /* console.log(layer.feature) */
    afficheTexte(layer.feature)
}

function onEachFeature(features, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}



/*TEST VOLET DEROULANT*/
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}