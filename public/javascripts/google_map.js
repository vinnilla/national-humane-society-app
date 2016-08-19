//Google_map//   US {lat: 37.09024, lng: -95.712891}


  var delay = 500;
// set the map options (zoom, roadmap,typewith and center in the USA)
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
//for the search of user location
document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
    // console.log('clicked');
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
        //using the delay to sapce timing for set markers
        else {
           if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          } else {
                        }
        }
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
     //initialize on click of shelter name a view of individual shelter and pets related to the shelter
     $(".show_shelter").click(function() {
      //initialize the modal css effect
      $('#modal1').openModal();
      var shelter_id = $(".show_shelter").attr('id');
      // console.log(shelter_id)
      $.get(`/shelters/${shelter_id}`)
      .then(function(shelter){
        // console.log(shelter.name);
        //create a class for each property to show the values by individual shelter
        $('#show-shelter-name').html(`${shelter.name}`);
        $('#show-shelter-location').html(`<h2 class="show-font-location">${shelter.address}</h2><br><h2 class="show-font-location">${shelter.city}, ${shelter.state} - ${shelter.zip}</h2>`);
        $('#show-shelter-contact').html(`<h3 class="show-font-contact"> Phone: ${shelter.phone}</h3> <h3 class="show-font-contact">Email: ${shelter.email}</h3>`);
       var showPetTemplate = _.template($('#show-pet-template').html());
        //create a class to generate the pet template in html
        $('.show-shelter-all-pets').html('');
        //create a class for properties of each pet related to the shelter
        shelter.pets.forEach(function(pet) {
          $(".show-shelter-all-pets").append(showPetTemplate(pet));

        })
          //initilize class from materialize css to zoom the pet picture
         $('.materialboxed').materialbox();


         //initialie the pet template view by pet_id on the modal of related shelter
        $(".show-shelter-pet" ).show();

        })
      })

    });

   bounds.extend(marker.position);

 };


//Use get to select the shelters and run a forEach loop to add a shelter id, name and location the map
var locations = [];
var names = [];
var ids = [];
$.get('/shelters')
  .then(function(shelters){
    shelters.forEach(function(shelter) {
      names.push(shelter.name);
      locations.push(`${shelter.address} ${shelter.city} ${shelter.state} ${shelter.zip}`);
      ids.push(shelter._id);
      // console.log(locations);
    })
  })
  .then(function(data) {
    theNext();
  })

 //Example array used to populate the map test
  // var locations = [
  //          'temecula, US',
  //          'los angeles, US',
  //          'astoria NY, US',
  //          'las vegas, NV'
  // ];

  //Will set the next marker based on the location array passing the name and id.
  var nextAddress = 0;
  function theNext() {
    if (nextAddress < locations.length) {
      setTimeout('preLoadGeocodeAddress("'+ids[nextAddress]+'", "'+names[nextAddress]+'", "'+locations[nextAddress]+'",theNext)', delay);
      nextAddress++;
    } else {
      map.fitBounds(bounds);
    }
  };




















