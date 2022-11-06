//La majeur partie de ce code est une version adapté au projet Dataviz du tutoriel Interactive Choropleth Map du site leafletjs.com de Volodymyr Agafonkin que vous pouvez trouver ici: https://leafletjs.com/examples/choropleth/
//La base de donnée Geojson à été quand à elle tirée de ce site créer par @ashkyd https://geojson-maps.ash.ms/ qui permet de générer des fichier geojson avec les coordonnées des pays sélectionnés
const mapEurope = 'custom.geo.json';
let geojsoncouche = null;
var geojson;

document.querySelector("#fader").addEventListener("click", ()=> {
        geojsoncouche.eachLayer(function (layer) {
        layer.setStyle(styleupdate(layer.feature))
    }); 
});

function onEachFeature(feature, layer) {
    layer.on({
        click: afficheTexte
    });
}

document.querySelector("#map").addEventListener("click", ()=>{
    
})
function afficheTexte(feature){
    console.log("click sur",feature.properties.name)
    const valeurCurseur = document.querySelector("#fader").value;
    document.querySelector("#explication.p").textContent = feature.properties["d"+valeurCurseur]
    console.log("hi")
    console.log(feature.properties.d1920.texte)//["d"+valeurCurseur])
}

//fonction pour le curseur
function rangeSlide(value) {
    document.getElementById('rangeValue').innerHTML = value;
}

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

//attribut une couleur en fonction du niveau de l'indicateur
function ColorLevel(niveau) {
    if(niveau<=4){
        const tabColor = ["#b0b0b0","#E32932","#BE95C4","#F6AA1C","#5A90D6"];
        return tabColor[niveau];
    } else if (niveau>4){
        console.log("t'as fumer quoi? y'a 4 niveau patate")
    }
    else {
        return "#b0b0b0";
    }
};

//ajoute la couleur au pays
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
    geojsoncouche = L.geoJson(data, {clickable: false , style: style}).addTo(map); 
    legend.addTo(map);
    geojson = L.geoJson(data, {
        style: nostyle,
        onEachFeature: onEachFeature
    }).addTo(map);
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
};