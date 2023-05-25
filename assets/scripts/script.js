// init template
function initMap() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(44, -110),
    mapTypeId: 'satellite'
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
