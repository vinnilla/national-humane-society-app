//Google_map//   US {lat: 37.09024, lng: -95.712891}


  var delay = 500;

  var infowindow = new google.maps.InfoWindow();
  var latlng = new google.maps.LatLng(37.09024, -95.712891);
  var mapOptions = {
    disableDefaultUI: false,
    zoom: 5,
    center: latlng,
    zoomControl: true,
    zoomControlOptions:{
        position: google.maps.ControlPosition.RIGTH_BOTTOM
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP

  }
  var geocoder = new google.maps.Geocoder();
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var bounds = new google.maps.LatLngBounds();


//get and set the element by id submited from input location and generate coordinate to mark the map
document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
    console.log('clicked');
  });


//set the marker and initiate a bigger zoom and display the location with details
  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({address:address}, function (results,status)
      {
         if (status == google.maps.GeocoderStatus.OK) {
          resultsMap.setCenter(results[0].geometry.location);
          resultsMap.setZoom(12);
          var p = results[0].geometry.location;
          var lat=p.lat();
          var lng=p.lng();
          // createMarker(address,lat,lng);

        }
        else {
           if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          } else {
                        }
        }
        // next();
      }
    );
  }
//
  function preLoadGeocodeAddress(address, next) {
    geocoder.geocode({address:address}, function (results,status)
      {
         if (status == google.maps.GeocoderStatus.OK) {
          var p = results[0].geometry.location;
          var lat=p.lat();
          var lng=p.lng();
          createMarker(address,lat,lng);

        }
        else {
           if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          } else {
                        }
        }
        next();
      }
    );
  }
  //create new marker and set the icon image
 function createMarker(add,lat,lng) {
   var contentString = add;
   var marker = new google.maps.Marker({
     position: new google.maps.LatLng(lat,lng),
     map: map,
     icon: '/images/dog-marker-sm.png',
           });
//create a window on click with the information about the shelter to display and link to profile
  google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(contentString);
     infowindow.open(map,marker);
   });

   bounds.extend(marker.position);

 }
 //Example array to populate the map
  var locations = [
           'temecula, US',
           'los angeles, US',
           'astoria NY, US',
           'las vegas, NV'
  ];
  //Will set the next marker based on the location array
  var nextAddress = 0;
  function theNext() {
    if (nextAddress < locations.length) {
      setTimeout('preLoadGeocodeAddress("'+locations[nextAddress]+'",theNext)', delay);
      nextAddress++;
    } else {
      map.fitBounds(bounds);
    }
  }
  theNext();













// <script async defer src="https://maps.googleapis.com/maps/api/js?key=<$= google_map_key $>&callback=initMap">
// </script>


//   // NOTE: This uses cross-domain XHR, and may not work on older browsers.
//   // map.data.loadGeoJson(
//   //     '/models/user.js');






