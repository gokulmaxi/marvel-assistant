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
// Helper function to generate a random coordinate
function getRandomCoordinate() {
  const lat = Math.random() * 180 - 90;
  const lng = Math.random() * 360 - 180;
  return new google.maps.LatLng(lat, lng);
}
