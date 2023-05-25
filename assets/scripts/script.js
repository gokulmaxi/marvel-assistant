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
function initMap() {

  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(44, -110),
    mapTypeId: 'satellite'
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // Create Thanos marker
  const ThanosMarker = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'purple',
    fillOpacity: 0.8,
    strokeWeight: 0,
    scale: 8,
    anchor: new google.maps.Point(0, 0),
  };
  const thanosMarker = new google.maps.Marker({
    position: getRandomCoordinate(),
    icon: ThanosMarker,
    label: 'Thanos',
    map: map,
    title: 'Thanos',
  });

  // Move Thanos marker randomly and linearly
  setInterval(() => {
    const newPosition = getRandomCoordinate();
    const duration = 2000; // Duration of movement in milliseconds

    const startPosition = thanosMarker.getPosition();
    const step = 0.01; // Step size for linear movement

    let t = 0;
    const moveInterval = setInterval(() => {
      t += step;
      if (t >= 1) {
        clearInterval(moveInterval);
      }
      const lat = (1 - t) * startPosition.lat() + t * newPosition.lat();
      const lng = (1 - t) * startPosition.lng() + t * newPosition.lng();
      const newPositionLatLng = new google.maps.LatLng(lat, lng);
      thanosMarker.setPosition(newPositionLatLng);
    }, duration * step);
  }, 5000); // Interval between movements in milliseconds
  stones.forEach(item => {
    const StoneMarker = {
      path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: item.color,
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(0, 20),
    }
    new google.maps.Marker({
      position: item.cordinate,
      icon: StoneMarker,
      label: item.name,
      map,
      title: "Hello World!",
    });
  }
  );
  window.initMap = initMap;
}
// Helper function to generate a random coordinate
function getRandomCoordinate() {
  const lat = Math.random() * 180 - 90;
  const lng = Math.random() * 360 - 180;
  return new google.maps.LatLng(lat, lng);
}
