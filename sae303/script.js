var mapEurope = 'custom.geo.json';
var legend = L.control({position: 'bottomleft'});

//fonction pour le curseur
function rangeSlide(value) {
    document.getElementById('rangeValue').innerHTML = value;
}

//attribut une couleur en fonction du niveau de l'indicateur
function ColorLevel(niveau) {
    if(niveau){
        const tabColor = ["#b0b0b0","#E32932","#F6AA1C","#BE95C4","#5A90D6"];
        return tabColor[niveau];
    } else if (niveau>4){
        console.log("t'as fumer quoi? y'a 4 niveau patate")
    }
    else {
        return "#b0b0b0";
    }
};

//ajoute la couleur au pays
function style(feature) {
    return {
        fillColor: ColorLevel(feature.properties.niveau),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

legend.onAdd = function (map) {
    console.log("fonction")
    var div = L.DomUtil.create('div', 'info legend'),
        niveau = [0, 1, 2, 3, 4];
        text = ["Pas de données",
            "Illégal",
            "Illégal sauf conditions (danger, viol, inceste)",
            "Légal sous conditions (santé, économie, statut social)",
            "Légal sans conditions (en fonction des délais)"];
    for (var i = 0; i < niveau.length; i++) {
        div.innerHTML +=
            '<i style="background:' + ColorLevel(niveau) + '"></i> ' +
            niveau[i] + text[i];
    }

    return div;
};

$.getJSON(mapEurope,function(data){
    var map = L.map('map').setView([58, 20], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.geoJson(data, {clickable: false , style: style }).addTo(map); 
    legend.addTo(map);
    console.log("hello")
})
