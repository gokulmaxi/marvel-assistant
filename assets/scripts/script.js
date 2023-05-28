// init template
const mindstone = document.getElementById("mind-stone");
const realitystone = document.getElementById("reality-stone");
const soulstone = document.getElementById("soul-stone");
const spacestone = document.getElementById("space-stone");
const powerstone = document.getElementById("power-stone");
const timestone = document.getElementById("time-stone")
class StoneData {
  constructor(color, name, lat, lon, element) {
    this.color = color;
    this.name = name;
    this.cordinate = { lat: lat, lng: lon };
    this.element = element
  }
}
const stones = [new StoneData("yellow", "mind", 25.363, 131.044, mindstone),
new StoneData("red", "reality", -25.363, 131.044, realitystone),
new StoneData("orange", "soul", -21.363, 11.044, soulstone),
new StoneData("blue", "space", -23.63, 211.044, spacestone),
new StoneData("purple", "power", -12.363, 11.044, powerstone),
new StoneData("green", "time", -2.363, 131, timestone)]
var acceptNewPoseFlag = true;
var recievedSpyMsgFlag = false;
var spyMsg;
var stoneIndex = 0;
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 8,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
stones.forEach(item => {
  L.circle([item.cordinate.lat, item.cordinate.lng], {
    color: item.color,
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 1000
  }).addTo(map);
  item.element.addEventListener("click", function () {
    map.flyTo([item.cordinate.lat, item.cordinate.lng], 8);

  })
});
var greenIcon = L.icon({
  iconUrl: 'assets/img/thanos.png',

  iconSize: [40, 40], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var thanosMarker = L.marker([51.5, -0.11], { icon: greenIcon }).addTo(map);
var thanosPredictMarker = L.circle([51.508, -0.11], {
  color: 'black',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 5000
}).addTo(map);
// Move Thanos marker randomly and linearly
setInterval(() => {
  const duration = 10000; // Duration of movement in milliseconds
  const startPosition = thanosMarker.getLatLng();
  const step = 0.001; // Step size for linear movement
  let t = 0;
  if (acceptNewPoseFlag) {
    const newPosition = getRandomCoordinate();
    stones.forEach(item => {
      var distance = calculateDistance(item.cordinate.lat, item.cordinate.lng, newPosition.lat, newPosition.lng);
      if (distance < 150) {
        alert(`Thanos is going for ${item.name} stone`)
      }
    }
    );
    console.log("New Pose");
    thanosPredictMarker.setLatLng(newPosition);
    acceptNewPoseFlag = false;
    const moveInterval = setInterval(() => {
      t += step;
      if (t >= 1) {
        clearInterval(moveInterval);
        acceptNewPoseFlag = true;
      }
      const lat = (1 - t) * startPosition.lat + t * newPosition.lat;
      const lng = (1 - t) * startPosition.lng + t * newPosition.lng;
      const newPositionLatLng = new L.latLng(lat, lng);
      thanosMarker.setLatLng(newPositionLatLng);
    }, duration * step);
  }
}, 5000); // Interval between movements in milliseconds
// Helper function to generate a random coordinate
function getRandomCoordinate() {
  if (recievedSpyMsgFlag) {
    console.log("Spy msg sent");
    recievedSpyMsgFlag = false;
    return spyMsg;
  }
  const lat = Math.random() * 180 - 90;
  const lng = Math.random() * 360 - 180;
  return new L.latLng(lat, lng);
}

map.on('click', function (e) {
  console.log(e.latlng);
  spyMsg = e.latlng
  recievedSpyMsgFlag = true;
});
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // Distance in kilometers
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
