    // Making a map and tiles
    // On commence à 0,0 et zoom 6
    const mymap = L.map('issMap').setView([0, 0], 6);
    const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'; //toujours créditer openstreetmap

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; //s ->tile, z-> zoom, x et y -> position
    const tiles = L.tileLayer(tileUrl, {
        attribution
    });
    tiles.addTo(mymap);

    // Création d'un markeur avec une image personnalisée
    const issIcon = L.icon({
        iconUrl: 'space_station.png',
        iconSize: [50, 32],
        iconAnchor: [25, 16] //centre de l'image
    });
    let marker = L.marker([0, 0], { //création du markeur
        icon: issIcon
    }).addTo(mymap); //ajout à notre map

    //variables globales
    const api_url = "https://api.wheretheiss.at/v1/satellites/25544"; //url d'une api trouvée ici : https://wheretheiss.at/w/developer

    let firstTime = true;

    async function getISS() {
        const response = await fetch(api_url); //on a les données dans un blob (ici JSON) et on doit les organiser dans un format de notre choix
        const data = await response.json(); //on attend la récupération des données que l'on met dans data qui devient un objet javascript (car format JSON)

        /*console.log(data.latitude);
        console.log(data.longitude); //l'objet data à plusieurs variables comme id, latitude, longitude...
        */
        const { //récupère les variables de l'objet data dans des variables locales
            latitude,
            longitude
        } = data;
        //bouge la map en gardant le markeur toujours au centre de celle ci, on peut le laisser bouger normalement en appelant cette fonction qu'une seule fois avec un booléan
        mymap.setView([latitude, longitude], mymap.getZoom());
        //réactualise les coordonnées du markeur
        marker.setLatLng([latitude, longitude]);

        document.getElementById('lat').textContent = latitude.toFixed(2); //affiche la latitude avec 2 nombre après la virgule
        document.getElementById('lon').textContent = longitude.toFixed(2);
    }

    //actions qui s'effectuent
    getISS();
    setInterval(getISS, 1000); //réactualise getISS toutes les 1 s