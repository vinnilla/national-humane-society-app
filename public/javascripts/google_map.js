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
  function preLoadGeocodeAddress(id, name, address, next) {
    geocoder.geocode({address:address}, function (results,status)
      {
         if (status == google.maps.GeocoderStatus.OK) {
          var p = results[0].geometry.location;
          var lat=p.lat();
          var lng=p.lng();
          createMarker(id, name,lat,lng);

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
 function createMarker(id, add,lat,lng) {
   var contentString = add;
   var marker = new google.maps.Marker({
     position: new google.maps.LatLng(lat,lng),
     map: map,
     icon: '/images/dog-marker-sm.png',
           });
//create a window on click with the information about the shelter to display and link to profile
  google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(`<button class="show_shelter" data-target="modal1" id='${id}''> ${contentString} </button>`);
     infowindow.open(map,marker);
     $(".show_shelter").click(function() {
      $('#modal1').openModal();
      var shelter_id = $(".show_shelter").attr('id');
      console.log(shelter_id)
      $.get(`/shelters/${shelter_id}`)
      .then(function(shelter){
        $('#show_shelter_name').html(shelter.name);
        $('#show_shelter_location').html(`<h1>${shelter.address}</h1><h2>${shelter.city}, ${shelter.state} - ${shelter.zip}</h2>`);
        $('#show_shelter_contact').html(`Phone: ${shelter.phone} Email: ${shelter.email}`);
       var showPetTemplate = _.template($('#show-pets-template').html());
        $(`.show-shelter-all-pets`).html('');
        shelter.pets.forEach(function(pet) {
          $(".show-shelter-all-pets").append(showPetTemplate(pet));
          $(`#${pet._id}-show-pet-name`).val(pet.name);
          $(`#${pet._id}-show-pet-animal`).val(pet.animal);
          $(`#${pet._id}-show-pet-breed`).val(pet.breed);
          $(`#${pet._id}-show-pet-size`).val(pet.size);
          $(`#${pet._id}-show-pet-sex`).val(pet.sex);
          $(`#${pet._id}_show-pet-age`).val(pet.age);
        })

        $(".show-shelter-container" ).show();


        })
      })

    });

   bounds.extend(marker.position);

 };



var locations = [];
var names = [];
var ids = [];
$.get('/shelters')
  .then(function(shelters){
    shelters.forEach(function(shelter) {
      names.push(shelter.name);
      locations.push(`${shelter.address} ${shelter.city} ${shelter.state} ${shelter.zip}`);
      ids.push(shelter._id);
      console.log(locations);
    })
  })
  .then(function(data) {
    theNext();
  })

 //Example array to populate the map
  // var locations = [
  //          'temecula, US',
  //          'los angeles, US',
  //          'astoria NY, US',
  //          'las vegas, NV'
  // ];

  //Will set the next marker based on the location array
  var nextAddress = 0;
  function theNext() {
    if (nextAddress < locations.length) {
      setTimeout('preLoadGeocodeAddress("'+ids[nextAddress]+'", "'+names[nextAddress]+'", "'+locations[nextAddress]+'",theNext)', delay);
      nextAddress++;
    } else {
      map.fitBounds(bounds);
    }
  }


// $('.modal-trigger').leanModal({
//       dismissible: true, // Modal can be dismissed by clicking outside of the modal
//       opacity: .5, // Opacity of modal background
//       in_duration: 300, // Transition in duration
//       out_duration: 200, // Transition out duration
//       starting_top: '4%', // Starting top style attribute
//       ending_top: '10%', // Ending top style attribute
//       ready: function() { alert('Ready'); }, // Callback for Modal open
//       complete: function() { alert('Closed'); } // Callback for Modal close
//     }
//   );


//$('#modal1').openModal();








// <script async defer src="https://maps.googleapis.com/maps/api/js?key=<$= google_map_key $>&callback=initMap">
// </script>


//   // NOTE: This uses cross-domain XHR, and may not work on older browsers.
//   // map.data.loadGeoJson(
//   //     '/models/user.js');






