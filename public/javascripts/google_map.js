//Google_map//   US {lat: 37.09024, lng: -95.712891}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 37.09024, lng: -95.712891}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


  // NOTE: This uses cross-domain XHR, and may not work on older browsers.
//   map.data.loadGeoJson(
//       'https://storage.googleapis.com/mapsdevsite/json/google.json');
// }

// map.data.setStyle({
//  icon: '/public/images/map-marker.png',

// });

