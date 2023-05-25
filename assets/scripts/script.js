// init template
const mindStone = { lat: -25.363, lng: 131.044 };
const realityStone = { lat: -25.363, lng: 131.044 };
const timeStone = { lat: -25.363, lng: 131.044 };
const spaceStone = { lat: -25.363, lng: 131.044 };
const soulStone = { lat: -25.363, lng: 131.044 };
const powerStone = { lat: -25.363, lng: 131.044 };
class StoneData {
  constructor(color, name, lat, lon) {
    this.color = color;
    this.name = name;
    this.cordinate = { lat: lat, lng: lon };
  }
}
const stones = [new StoneData("yellow", "mind", 25.363, 131.044),
new StoneData("red", "reality", -25.363, 131.044),
new StoneData("green", "soul", -21.363, 11.044),
new StoneData("blue", "space", -23.63, 211.044),
new StoneData("purple", "power", -12.363, 11.044),
new StoneData("orange", "time", -2.363, 131)]
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
});
var thanosMarker = L.circle([51.508, -0.11], {
  color: 'purple',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 5000
}).addTo(map);
var acceptNewPoseFlag = true;
// Move Thanos marker randomly and linearly
setInterval(() => {
  console.log("New Pose");
  const newPosition = getRandomCoordinate();
  const duration = 10000; // Duration of movement in milliseconds
  const startPosition = thanosMarker.getLatLng();
  const step = 0.001; // Step size for linear movement
  let t = 0;
  if (acceptNewPoseFlag) {
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
}, 5000); // Interval between movements in milliseconds// Helper function to generate a random coordinate
function getRandomCoordinate() {
  const lat = Math.random() * 180 - 90;
  const lng = Math.random() * 360 - 180;
  return new L.latLng(lat, lng);
}
