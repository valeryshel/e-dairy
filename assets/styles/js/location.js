let findLocation = document.getElementById('findLocation');

findLocation.addEventListener('click', createMap);

let mapInitialized = false;
let map;
const defaultLocation = [51.505, -0.09];

function updateLocation(userLocation) {
    const geocodeAPI = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + userLocation[0] + '&lon=' + userLocation[1];
    fetch(geocodeAPI)
        .then(response => response.json())
        .then(data => {
            document.getElementById('address').innerText = 'Адрес: ' + data.display_name;
        })
        .catch(error => console.log('Ошибка получения адреса', error));
}

function createMap() {
    findLocation.textContent = 'Вычисляем...';

    if (mapInitialized) {
        map.setView(defaultLocation, 12);
        return;
    }

    map = L.map('map').setView(defaultLocation, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    mapInitialized = true;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            map.setView(userLocation, 12);
            const marker = L.marker(userLocation).addTo(map).openPopup();

            updateLocation(userLocation);

            findLocation.style.display = 'none';
            document.querySelector('.location-container').style.display = '';

            navigator.geolocation.watchPosition(function(position) {
                const userLocation = [position.coords.latitude, position.coords.longitude];
                map.setView(userLocation, 12);
                marker.setLatLng(userLocation);
                updateLocation(userLocation);
            });
        }, function() {
            handleLocationError(true, defaultLocation);
        });
    } else {
        handleLocationError(false, defaultLocation);
    }
}

function handleLocationError(browserHasGeolocation, defaultLocation) {
    map.setView(defaultLocation, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker(defaultLocation).addTo(map)
        .bindPopup(browserHasGeolocation ? 'Ошибка: Геолокация не была определена из-за ошибки сервера.' : 'Ошибка: Ваш браузер не поддерживает определение геопозиции.').openPopup();
}


/*function createMap() {
    document.getElementById('findLocation').textContent = 'Вычисляем...';
    var defaultLocation = [51.505, -0.09]; 
    var map = L.map('map').setView(defaultLocation, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = [position.coords.latitude, position.coords.longitude];
        map.setView(userLocation, 12);
        var marker = L.marker(userLocation).addTo(map)
            .openPopup();
        var geocodeAPI = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + userLocation[0] + '&lon=' + userLocation[1];
        fetch(geocodeAPI)
            .then(response => response.json())
            .then(data => {
                document.getElementById('findLocation').style.display = 'none';
                document.querySelector('.location-container').style.display = '';
                document.getElementById('address').innerText = 'Адрес: ' + data.display_name;
            })
            .catch(error => console.log('Ошибка получения адреса', error));
        }, function() {
        handleLocationError(true, defaultLocation);
        });
    } else {
        handleLocationError(false, defaultLocation);
    }
}
function handleLocationError(browserHasGeolocation, defaultLocation) {
    var map = L.map('map').setView(defaultLocation, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    L.marker(defaultLocation).addTo(map)
        .bindPopup(browserHasGeolocation ?
        'Ошибка: Геолокация нее определена из-за ошибки сервера.' :
        'Ошибка: Ваш браузер не поддерживает определение геопозиции.')
        .openPopup();
}*/