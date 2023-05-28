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
var thanosMarker = L.circle([51.508, -0.11], {
  color: 'purple',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 5000
}).addTo(map);
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
