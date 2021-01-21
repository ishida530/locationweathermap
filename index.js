function deleteItems() {
    localStorage.clear();
}
let apiKey = "f0ed0697e1bc8c3fef3cb1226387b850"

let acc = document.querySelectorAll(".accordion");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
let latitude;
let longitude;

function geoFindMe() {
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        let params2 = {
            lan: latitude,
            lon: longitude,
            format: 'json'
        };
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`, {
                params: params2

            })
            .then(function (response) {

                let weather = response.data.weather[0];
                let city = response.data.name;

                if (weather.description === "clear sky") {
                    weather.description = "czyste niebo";
                } else if (weather.description === "broken clouds") {
                    weather.description = "pochmurne niebo";

                } else if (weather.description === "overcast clouds") {
                    weather.description = "zachmurzenie";
                } else if (weather.description === "scattered clouds") {
                    weather.description = "rozproszone chmury";
                } else weather.description;

                map.fitBounds([
                    [latitude, longitude],
                    [57, 0]
                ]);
                map.panInsideBounds([
                    [latitude, longitude],
                    [28, 44]
                ], {
                    heading: 90,
                    tilt: 5,
                    duration: 5
                });
                var marker1 = WE.marker([latitude, longitude]).addTo(map);
                marker1.bindPopup(`W ${city} jest ${weather.description}`, {
                    maxWidth: 150,
                    closeButton: true
                }).closePopup();

            })
            .catch(function (error) {

            })
            .then(function () {
                // always executed

            });
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    };
};
document.querySelector('#find-me').addEventListener('click', geoFindMe);

function flyToWarsaw() {
    map.fitBounds([
        [52.25761532999481, 21.011868034900846],
        [57, 0]
    ]);
    map.panInsideBounds([
        [52.25761532999481, 21.011868034900846],
        [28, 44]
    ], {
        heading: 90,
        tilt: 5,
        duration: 5
    });
    var marker1 = WE.marker([52.25761532999481, 21.011868034900846]).addTo(map);
    marker1.bindPopup("<img style='width:150px;' src='https://lh5.googleusercontent.com/p/AF1QipNFFKZ1LTkDZa3Sb-0dtuTskUmdoHu2Ctl_HDRJ=w408-h272-k-no'><b>warszawa</b> ", {
        maxWidth: 150,
        closeButton: true
    }).closePopup();

}

function flyToOlsztyn() {
    map.fitBounds([
        [53.77961569914136, 20.475662524751833],
        [57, 0]
    ]);
    map.panInsideBounds([
        [53.77961569914136, 20.475662524751833],
        [28, 44]
    ], {
        heading: 90,
        tilt: 5,
        duration: 5
    });


    var marker1 = WE.marker([53.77961569914136, 20.475662524751833]).addTo(map);
    marker1.bindPopup("<img style='width:150px;' src='https://lh5.googleusercontent.com/p/AF1QipNFFKZ1LTkDZa3Sb-0dtuTskUmdoHu2Ctl_HDRJ=w408-h272-k-no'><b>olsztyn</b> ", {
        maxWidth: 150,
        closeButton: true
    }).closePopup();
}

function flyToKatowice() {
    map.fitBounds([
        [50.268835740521446, 19.036235498141764],
        [57, 0]
    ]);
    map.panInsideBounds([
        [50.268835740521446, 19.036235498141764],
        [28, 44]
    ], {
        heading: 90,
        tilt: 5,
        duration: 5
    });

    var marker1 = WE.marker([50.268835740521446, 19.036235498141764]).addTo(map);
    marker1.bindPopup("<img style='width:150px;' src='https://lh5.googleusercontent.com/p/AF1QipNFFKZ1LTkDZa3Sb-0dtuTskUmdoHu2Ctl_HDRJ=w408-h272-k-no'><b>katowice</b> ", {
        maxWidth: 150,
        closeButton: true
    }).closePopup();

}
var map;

function init() {
    let inputCity;
    let x;
    let y;
    map = WE.map('map', {
        center: [52.057944835, 19.18688965],
        zoom: 1,
        dragging: true,
        scrollWheelZoom: true
    });
    let btn = document.querySelector('#findLocation').addEventListener('click', () => {
        inputCity = prompt('Wpisz nazwe miejsowości której szukasz i sprawdź aktualną pogodę :)')
        let params = {
            city: inputCity,
            format: 'json'
        };
        axios.get('https://nominatim.openstreetmap.org/search', {
                params: params

            })
            .then(function (response) {
                x = response.data[0].lat;
                y = response.data[0].lon;
                let latitude = x;
                let longitude = y;

                let params3 = {
                    lan: latitude,
                    lon: longitude,
                    format: 'json'
                };

                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`, {
                        params: params3

                    }).then(function (response) {

                        let weather = response.data.weather[0];
                        let city = response.data.name;

                        if (weather.description === "clear sky") {
                            weather.description = "czyste niebo";
                        } else if (weather.description === "broken clouds") {
                            weather.description = "pochmurne niebo";

                        } else if (weather.description === "overcast clouds") {
                            weather.description = "zachmurzenie";
                        } else if (weather.description === "scattered clouds") {
                            weather.description = "rozproszone chmury";
                        } else weather.description;
                        map.fitBounds([
                            [latitude, longitude],
                            [57, 0]
                        ]);
                        map.panInsideBounds([
                            [latitude, longitude],
                            [28, 44]
                        ], {
                            heading: 90,
                            tilt: 5,
                            duration: 5
                        });
                        var marker4 = WE.marker([latitude, longitude]).addTo(map);
                        marker4.bindPopup(`W ${city} jest ${weather.description}`, {
                            maxWidth: 150,
                            closeButton: true
                        }).closePopup();

                    })
                    .catch(function (error) {

                    })
                    .then(function () {
                        // always executed

                    })
                map.fitBounds([
                    [x, y],
                    [57, 0]
                ]);
                map.panInsideBounds([
                    [x, y],
                    [28, 44]
                ], {
                    heading: 90,
                    tilt: 50,
                    duration: 5
                });

            })
            .catch(function (error) {

            })
            .then(function () {
                // always executed

            });


        ;


    });
    var before = null;
    requestAnimationFrame(function animate(now) {
        var c = map.getPosition();
        var elapsed = before ? now - before : 0;
        before = now;
        map.setCenter([c[0], c[1] + 0.1 * (elapsed / 200)]);
        requestAnimationFrame(animate);
    });
    var baselayer = WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
        tileSize: 256,
        bounds: [
            [-85, -180],
            [85, 180]
        ],
        minZoom: 0,
        maxZoom: 16,
        attribution: 'WebGLEarth example',
        tms: true
    }).addTo(map);

    //Add TileJSON layer
    var json = {
        "profile": "mercator",
        "name": "Grand Canyon USGS",
        "format": "png",
        "bounds": [-112.26379395, 35.98245136, -112.10998535, 36.13343831],
        "minzoom": 10,
        "version": "1.0.0",
        "maxzoom": 16,
        "center": [-112.18688965, 36.057944835, 13],
        "type": "overlay",
        "description": "",
        "basename": "grandcanyon",
        "tilejson": "2.0.0",
        "sheme": "xyz",
        "tiles": ["http://tileserver.maptiler.com/grandcanyon/{z}/{x}/{y}.png"]
    };
    var grandcanyon = WE.tileLayerJSON(json);
    grandcanyon.addTo(map);

    grandcanyon.setOpacity(0.7);
    document.getElementById('opacity2').addEventListener('change', function (e) {
        grandcanyon.setOpacity(e.target.value);
    });

    var marker = WE.marker([51.5, -0.09]).addTo(map);
    marker.bindPopup("<img style='width:150px;' src='https://lh5.googleusercontent.com/p/AF1QipNFFKZ1LTkDZa3Sb-0dtuTskUmdoHu2Ctl_HDRJ=w408-h272-k-no'><b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {
        maxWidth: 150,
        closeButton: false
    }).closePopup()

    earth.setView([51.505, 0], 6);

}