//localStorage.clear();
function logToConsole(people) {
    console.log(people); // works fine
    console.log(people[0]); // returns undefined
};
let people = [];
let likes = [];
let dislikes = [];
let ll;
let i = 0;

if (localStorage.getItem("likes") !== null) {
    likes = JSON.parse(localStorage.getItem("likes"));
}
if (localStorage.getItem("dislikes") !== null) {
    dislikes = JSON.parse(localStorage.getItem("dislikes"));
}
if (localStorage.getItem("people") === null) {
    fetch('https://randomuser.me/api/?results=10')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < 10; i++) {
                let person = data.results[i];
                if (dislikes.includes(person.login.uuid) || likes.includes(person.login.uuid)) {
                    continue;
                } else {
                    let x = {
                        name: person.name.first + " " + person.name.last,
                        picture: person.picture.large,
                        age: person.dob.age,
                        place: person.location.street + "<br>" + person.location.city,
                        id: person.login.uuid,
                        lat: person.location.coordinates.latitude,
                        long: person.location.coordinates.longitude
                    }
                    people.push(x);
                }
            }
            lengte = people.length;
            logToConsole(people);
            judge();
        }).catch(function (error) {
            console.log('Data is not shown ' + error.message);
        });
} else {
    people = JSON.parse(localStorage.getItem("people"));
    judge();
}
function judge() {
    localStorage.setItem("people", JSON.stringify(people));
    function showPeople() {
        document.getElementById("image").src = people[0].picture;
        document.getElementById("name").innerHTML = people[0].name;
        document.getElementById("age").innerHTML = people[0].age;
        document.getElementById("location").innerHTML = people[0].place;
        
        let output = document.getElementById("out");
        function succes(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let lat1 = people[0].lat;
            let lon1 = people[0].long;
            let lat2 = latitude;
            let lon2 = longitude;
            let p = 0.017453292519943295; // Math.PI / 180
            let c = Math.cos;
            let a = 0.5 - c((lat2 - lat1) * p) / 2 +
                c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;
            let x = Math.round(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
            console.log(x);
            document.getElementById("output").innerHTML = "the distance to this person is " + x + " km";
        }

        function error() {
            output.innerHTML = "Unable to retrieve your location";
        }
        navigator.geolocation.getCurrentPosition(succes, error);
        
        map.flyTo({
            center: [
            people[0].long, people[0].lat]
        });
        let radius=40; //radius of the circle
        map.addSource("makecircle"+i, { //making a source for the radius
            "type": "geojson",
            "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                "type": "Point",
                "coordinates": [people[0].long, people[0].lat] 
                }
            }]
            }
        });
        map.addLayer({ //displaying the radius of the circle
            "id": "makecircle"+i,
            "type": "circle",
            "source": "makecircle"+i,
            "paint": {
            "circle-radius": radius, //radius with the variable radius
            "circle-color": "#ff0000", //color
            "circle-opacity": 0.5, //opacity
            }
        });
        let x = i-1;
        map.removeLayer({ //displaying the radius of the circle
            "id": "makecircle"+x
            
        });
        i++;
    }
    showPeople();
    document.getElementById("heartclick").addEventListener("click", function () {
        if (people.length <= 1) {
            likes.push(people[0]);
            console.log(likes);
            people.shift();
            localStorage.removeItem("people");
            location.reload();
            console.log("er zijn er nie veel meer");
        } else {
            if (localStorage.getItem("likes") !== null) {
                likes = JSON.parse(localStorage.getItem("likes"));
                likes.push(people[0]);
                console.log(likes);
                people.shift();
                showPeople();
                localStorage.setItem("people", JSON.stringify(people));
                localStorage.setItem("likes", JSON.stringify(likes));
            } else {
                likes.push(people[0]);
                console.log(likes);
                people.shift();
                showPeople();
                localStorage.setItem("people", JSON.stringify(people));
                localStorage.setItem("likes", JSON.stringify(likes));
            }
        }
    })
    document.getElementById("skipclick").addEventListener("click", function () {
        if (people.length <= 1) {
            dislikes.push(people[0]);
            console.log(dislikes);
            people.shift();
            localStorage.removeItem("people");
            location.reload();
            console.log("er zijn er nie veel meer");
        } else {
            if (localStorage.getItem("dislikes") !== null) {
                dislikes = JSON.parse(localStorage.getItem("dislikes"));
                dislikes.push(people[0]);
                console.log(dislikes);
                people.shift();
                showPeople();
                localStorage.setItem("people", JSON.stringify(people));
                localStorage.setItem("dislikes", JSON.stringify(dislikes));
            } else {
                dislikes.push(people[0]);
                console.log(dislikes);
                people.shift();
                showPeople();
                localStorage.setItem("people", JSON.stringify(people));
                localStorage.setItem("dislikes", JSON.stringify(dislikes));
            }
        }
    })
}
document.getElementById("clickforlikes").addEventListener('click', function () {
    document.getElementById("yourdislikes").innerHTML = "";
    document.getElementById("yourlikes").innerHTML = "";
    document.querySelectorAll('.yourlikes')[0].style.left = "0";
    for (x = 0; x < dislikes.length; x++) {
        if (dislikes.length > 0) {
            let changeThis = dislikes[x];
            document.getElementById("yourdislikes").innerHTML += dislikes[x].name + "<p class='ch'>change list</p><br><br>";
            let ch = document.querySelectorAll('.ch');
            for (i = 0; i < ch.length; i++) {
                let z = i;
                ch[i].addEventListener('click', function () {
                    likes.push(dislikes[z]);
                    localStorage.setItem("likes", JSON.stringify(likes));
                    dislikes.splice(z, 1);
                    localStorage.setItem("dislikes", JSON.stringify(dislikes));
                    document.querySelectorAll('.yourlikes')[0].style.left = "100%";
                })
            }
        }
    }
    for (v = 0; v < likes.length; v++) {
        if (likes.length > 0) {
            let ChangeThat = likes[v];
            document.getElementById("yourlikes").innerHTML += likes[v].name + "<p class='co'>change list</p><br><br>";
            let co = document.querySelectorAll('.co');
            for (o = 0; o < co.length; o++) {
                let q = o;
                co[q].addEventListener('click', function () {
                    console.log(dislikes)
                    dislikes.push(likes[q]);
                    localStorage.setItem("dislikes", JSON.stringify(dislikes));
                    likes.splice(q, 1);
                    localStorage.setItem("likes", JSON.stringify(likes));
                    document.querySelectorAll('.yourlikes')[0].style.left = "100%";
                })
            }
        }
    }
})
document.getElementById("goAwayclick").addEventListener('click', function () {
    document.querySelectorAll('.yourlikes')[0].style.left = "100%";
})

console.log(1+"1"-"1");



mapboxgl.accessToken = 'pk.eyJ1IjoiYnJlYWtpbmcyNjIiLCJhIjoiY2puOWF4d2huMDRtMTNycDg5eTBkaWw2aSJ9.L5hwBhfK_8aFPp6nTCruwQ';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));






        
