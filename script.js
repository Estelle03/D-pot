//La majeure partie de ce code est une version adaptée au projet Dataviz du tutoriel Interactive Choropleth Map du site leafletjs.com de Volodymyr Agafonkin que vous pouvez trouver ici : https://leafletjs.com/examples/choropleth/
//La base de données Geojson a été quant à elle tirée de ce site https://geojson-maps.ash.ms/ créé par @ashkyd qui permet de générer des fichiers geo.json avec les coordonnées des pays sélectionnés


const mapEurope = 'custom.geo.json';
let geojsoncouche = null;
var geojson;
// Initialisation du pays choisi (pas encore choisi)
var layer = null;

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
        document.querySelector("#explication p").innerHTML = "<strong>Depuis " + valeurCurseur + "</strong><br>" + feature.properties["d"+valeurCurseur].texte;
    }
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
        console.log("probable erreure de saisit dans la base de donnée, niveau trop faible : "+niveau);
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
    }).addTo(map);
    console.log(data)
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