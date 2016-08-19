$(document).ready(function() {

console.log('document loaded');

// register new user (locally)
$("#submit-register").click(function () {
  // grab data from html form
  var email = $("#register-email").val()
  var password = $("#register-password").val()
  var confirmPassword = $("#confirm-password").val()

  if (password !== confirmPassword) {
    $("#errors").html("Passwords do not match")
    return false; // this will end the callback execution
  }

  // create a new user in database
  $.post("/register", {
    email: email,
    password: password
  }).then(function (data) {
    if (data.error) {
      $("#errors").html(`Error: ${data.error}`);
    }
    else {
      // show and hide related html
      $("#errors").html('');
      $("#results").html(data.msg)
      $("#oauth").show();
      $("#register").hide();
      $("#register-button").show();
      $("#login-button").show();
    }
  })
})

// login as existing user (locally)
$("#submit-login").click(function () {
  var email = $("#login-email").val()
  var password = $("#login-password").val()

  // attempt a post to login method in usercontroller
  $.post("/login", {
    email: email,
    password: password
  }).then(function (data) {
    if (data.error) {
      $("#errors").html(`Error: ${data.error}`);
    }
    else {
          // localStorage will persist the token until you explicitly
          // delete it. Closing the browser or tab will not delete
          // the token
      localStorage.token = data.token
      localStorage.id = data.id

      // need to retrieve user information to show appropriate nav-buttons on login
      $.get(`/users/${localStorage.id}`)
        .then(function(user) {
          // has shelter
          if (user.shelterId) {
            localStorage.shelter = user.shelterId;
            // show shelter buttons
            $(".edit-shelter-button").show();
            $("#pet-button").show();
            $("#show-pets-button").show();
          }
          else {
            // option to create a shelter
            if (user.shelter) {
              $("#shelter-button").show();
            }
          }
          $("#errors").html('');
          $("#results").html('');
          // $("#results").html(`JWT: ${data.token}`);
          $("#oauth").hide();
          $("#login").hide();
          $("#local-logout").show();
          $("#update-button").show();
        })
    }
  })
})

// update user information (works with local and oauth users)
$("#submit-update").click(function() {
  var name = $("#user-name").val();
  var address = $("#user-address").val();
  var city = $("#user-city").val();
  var state = $("#user-state").val();
  var zip = $("#user-zip").val();
  var animal = $("#preferred-animal").val();
  var shelter = $("#user-shelter").val();

  var oauthId = $("#oauth-id").html();
  if (!oauthId) oauthId = localStorage.id;

  // patch information
  $.ajax({
    url: `/users/${oauthId}`,
    type: "patch",
    dataType: "json",
    data: {
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      animal: animal,
      shelter: shelter
    }
  })
    .then(function(data) {
      if (data.error) {
        $("#errors").html(`Error: ${data.error}`);
      }
      else {
        // hide form and show update button
        $("#errors").html('');
        $("#additional-information").hide();
        $("#update-button").show();
        if (data.shelter) $("#shelter-button").show();
        else $("#shelter-button").hide();
      }
    })
})

// add a new shelter to database (addition won't appear on map until page refresh)
$("#submit-shelter").click(function() {
  // retrieve data from form
  var name = $("#shelter-name").val();
  var address = $("#shelter-address").val();
  var city = $("#shelter-city").val();
  var state = $("#shelter-state").val();
  var zip = $("#shelter-zip").val();
  var description = $("#shelter-description").val();
  var phone = $("#shelter-phone").val();
  var email = $("#shelter-email").val();
  var oauthId = $("#oauth-id").html();
  if (!oauthId) oauthId = localStorage.id;

  // send post to database
  $.post(`/users/${oauthId}/shelters`, {
    name: name,
    address: address,
    city: city,
    state: state,
    zip: zip,
    description: description,
    phone: phone,
    email: email,
    user_id: oauthId
  })
  .then(function (data) {
    if (data.error) {
      $("#errors").html(`Error: ${data.error}`);
    }
    else {
      // hide form and show edit shelter button
      $("#errors").html('');
      $("#results").html(data.msg, data.shelter);
      $(".edit-shelter-button").show();
      $("#shelter-information").hide();
      $("#shelter-button").hide();
    }
  })
})

$("#user-shelter").click(function() {
  var box = $("#user-shelter");
  if (box.val() == 'true') {
    box.val('false');
  }
  else {
    box.val('true');
  }
  console.log(box.val());
});

// this was used in testing
// $("#get-users").click(function () {
//   $.get("/users", { token: localStorage.token })
//   .then(function (users) {
//     $("#users").html(JSON.stringify(users))
//   })
// })


// the next few click events are nav-buttons that show and hide forms
$("#login-button").click(function() {
  $("#login").show();
  $("#login-button").hide();
  $("#register-button").hide();
})
$("#welcome-login").click(function() {
  $("#login").show();
  $("#welcome").hide();
  $("#login-button").hide();
  $("#register-button").hide();
})

$("#register-button").click(function() {
  $("#register").show();
  $("#login-button").hide();
  $("#register-button").hide();
})
$("#welcome-register").click(function() {
  $("#register").show();
  $("#welcome").hide();
  $("#login-button").hide();
  $("#register-button").hide();
})

$(".local-back").click(function() {
  $("#login").hide();
  $("#register").hide();
  $("#login-button").show();
  $("#register-button").show();
})

// updating users prefills the form with user data
$("#update-button").click(function() {
  var oauthId = $("#oauth-id").html();
  if (!oauthId) oauthId = localStorage.id;
  $.get(`/users/${oauthId}`)
    .then(function(user) {
      $("#user-name").val(user.name);
      $("#user-address").val(user.address);
      $("#user-city").val(user.city);
      $("#user-state").val(user.state);
      $("#user-zip").val(user.zip);
      $("#preferred-animal").val(user.preferred_animal);
      $("#user-shelter").val(user.shelter.toString());

      $("#additional-information").show();
      // $("#update-button").hide();
    })
})

$(".update-back").click(function() {
  $("#update-button").show();
  $("#additional-information").hide();
})

$("#shelter-button").click(function() {
  // $("#shelter-button").hide();
  $("#shelter-information").show();
})

// updating shelter prefills form with shelter data
$(".edit-shelter-button").click(function() {
  var oauthId = $("#oauth-id").html();
  if (!oauthId) oauthId = localStorage.id;
  $.get(`/users/${oauthId}`)
    .then(function(user) {
      localStorage.shelter = user.shelterId
      $.get(`/shelters/${user.shelterId}`)
        .then(function(shelter) {
          $("#shelter-u-name").val(shelter.name);
          $("#shelter-u-address").val(shelter.address);
          $("#shelter-u-city").val(shelter.city);
          $("#shelter-u-state").val(shelter.state);
          $("#shelter-u-zip").val(shelter.zip);
          $("#shelter-u-description").val(shelter.description);
          $("#shelter-u-phone").val(shelter.phone);
          $("#shelter-u-email").val(shelter.email);
          // $(".edit-shelter-button").hide();
          $("#shelter-update").show();
        })
    })
})

// update shelter in database
$("#update-shelter").click(function() {
  // retrieve information from forms
  var name = $("#shelter-u-name").val();
  var address = $("#shelter-u-address").val();
  var city = $("#shelter-u-city").val();
  var state = $("#shelter-u-state").val();
  var zip = $("#shelter-u-zip").val();
  var description = $("#shelter-u-description").val();
  var phone = $("#shelter-u-phone").val();
  var email = $("#shelter-u-email").val();

  // attempt patch
  $.ajax({
    url: `/shelters/${localStorage.shelter}`,
    type: "patch",
    dataType: "json",
    data: {
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      description: description,
      phone: phone,
      email: email
    }
  })
    .then(function(data) {
      if (data.error) {
        $("#errors").html(`Error: ${data.error}`);
      }
      else {
        $("#errors").html('');
        $(".edit-shelter-button").show();
        $("#shelter-update").hide();
      }
    })
})

// delete shelter from database
$("#delete-shelter").click(function() {
  $.ajax({
    url: `/shelters/${localStorage.shelter}`,
    type: "delete"
  })
    .then(function(data) {
      if (data.error) {
        $("#errors").html(`Error: ${data.error}`);
      }
      else {
        $("#errors").html('');
        $("#shelter-update").hide();
        $("#pet-button").hide();
        $("#shelter-button").show();
      }
    })
})

$(".shelter-back").click(function() {
  $("#shelter-information").hide();
  $("#shelter-button").show();
})

$(".shelter-u-back").click(function() {
  $("#shelter-update").hide();
  $(".edit-shelter-button").show();
})

$("#submit-shelter").click(function() {
  $("#shelter-information").hide();
  $("#shelter-button").show();
  $("#pet-button").show();
  $("#show-pets-button").show();
})

// show new pet form
$("#pet-button").click(function() {
  // $("#pet-button").hide();
  $("#pet-name").val('');
  $("#pet-animal").val(' ');
  $("#pet-breed").val('');
  $("#pet-size").val(' ');
  $("#pet-sex").val(' ');
  $("#pet-age").val('');
  $("#pet-image").val('');
  $("#test-image").html('');

  $("#pet-information").show();
})

$(".pet-back").click(function() {
  $("#pet-information").hide();
  $("#pet-button").show();
})

// saving new pet to database (image uploading to imgur occurs here)
$("#submit-pet").click(function() {
  var name = $("#pet-name").val();
  var animal = $("#pet-animal").val();
  var breed = $("#pet-breed").val();
  var size = $("#pet-size").val();
  var sex = $("#pet-sex").val();
  var age = $("#pet-age").val();
  var img = new Image();
  var imgur = $("#imgur-key").html();
  // retrieve image from form
  var uploadedImage = $("#pet-image")[0].files[0];
  // console.log(typeof uploadedImage);

  // show image 
  img.src = window.URL.createObjectURL(uploadedImage);
  img.height = 100;
  $("#test-image").html(img);
  $("#loading").show();
  console.log(img.src);

  // FAILED ATTEMPT TO CONVERT IMAGE TO BASE64 BEFORE UPLOADING TO IMGUR :(

  // var fileReader = new FileReader();
  // var data = fileReader.readAsDataURL(uploadedImage)
  // console.log(data);

  // convert blob to data url
  // var decoded = jwt_decode(img.src);
  // console.log(decoded);

  // convert blob to data url
  // var canvas = document.createElement('canvas');
  // var context = canvas.getContext("2d");
  // context.drawImage(img, 0, 0);
  // var dataurl = canvas.toDataURL('image/png', 1);
  // console.log(dataurl)
  
  // var array = dataurl.split(",");
  // console.log(array);
  // var byte = btoa(img);
  // console.log(byte);
  // console.log(array[1])

  var fd = new FormData();
  fd.append("image", uploadedImage);

  //post to imgur
  $.ajax({
    url: "https://api.imgur.com/3/image.json",
    type: "POST",
    headers: {
      Authorization: `Client-ID ${imgur}`
    },
    data: fd,
    processData: false,
    contentType: false
  })
    .then(function(result) {
      console.log(result.data.link);
      // send post to database (with returned imgur url)
      $.ajax({
        url: `/shelters/${localStorage.shelter}/pet`,
        type: "patch",
        dataType: 'json',
        data: {
          name: name,
          animal: animal,
          breed: breed,
          size: size,
          sex: sex,
          age: age,
          image: result.data.link
        }
      })
      .then(function(data) {
        if(data.error) {
          $("#errors").html(`Error: ${data.error}`);
        }
        else {
          $("#errors").html('');
          $("#pet-information").hide();
          $("#loading").hide();
          $("#pet-button").show();
        };
      }); //end of patch for pet
  
    });
  });

// local logout
$("#logout").click(function () {
  $("#login-button").show();
  $("#register-button").show();
  $("#oauth").show();
  $("#local-logout").hide();
  $("#update-button").hide();
  $("#shelter-button").hide();
  $(".edit-shelter-button").hide();
  $("#pet-button").hide();
  $("#show-pets-button").hide();
  // unsetting the token will logout the user
  localStorage.removeItem('token');
  localStorage.removeItem('id');
})

// for testing
// $("#get-user").click(function() {
//   var oauthId = $("#oauth-id").html();
//   if (!oauthId) oauthId = localStorage.id;
//   $.get(`/users/${oauthId}`, { token: localStorage.token })
//   .then(function (user) {
//     $("#users").html(JSON.stringify(user))
//   })
// })


// showing the pets that belong to the user's shelter
petTemplate = _.template($("#pet-template").html());

$("#show-pets-button").click(function() {
  // grab data from database
  $.get(`/shelters/${localStorage.shelter}/pets`)
    .then(function(data) {
      if (data.error) {
        $("#errors").html(`Error: ${data.error}`);
      }
      else {
        $("#pet-block").html('');
        data.forEach(function(pet) {
          // show html using template
          $("#pet-block").append(petTemplate(pet));

          // set form values with pet information
          $(`#${pet._id}-u-pet-name`).val(pet.name);
          $(`#${pet._id}-u-pet-animal`).val(pet.animal);
          $(`#${pet._id}-u-pet-breed`).val(pet.breed);
          $(`#${pet._id}-u-pet-size`).val(pet.size);
          $(`#${pet._id}-u-pet-sex`).val(pet.sex);
          $(`#${pet._id}-u-pet-age`).val(pet.age);

          // update pet information
          $(`#${pet._id}-submit`).click(function() {
            var name = $(`#${pet._id}-u-pet-name`).val();
            var animal = $(`#${pet._id}-u-pet-animal`).val();
            var breed = $(`#${pet._id}-u-pet-breed`).val();
            var size = $(`#${pet._id}-u-pet-size`).val();
            var sex = $(`#${pet._id}-u-pet-sex`).val();
            var age = $(`#${pet._id}-u-pet-age`).val();

            $.ajax({
              url: `/shelters/${localStorage.shelter}/pets/${pet._id}`,
              type: "patch",
              dataType: "json",
              data: {
                name: name,
                animal: animal,
                breed: breed,
                size: size,
                sex: sex,
                age: age
              }
            })
            .then(function(data) {
              if(data.error) {
                $("#errors").html(`Error: ${data.error}`);
              }
              else {
                //update pet list
                $.get(`/shelters/${localStorage.shelter}/pets/${pet._id}`)
                .then(function(newpet) {
                  if (newpet.error) {
                    $("#errors").html(`Error: ${newpet.error}`);
                  }
                  else {
                    //show updated data
                    $(`#${pet._id}-container`).html(`${newpet.name} ${newpet.breed} ${newpet.animal} ${newpet.size} ${newpet.sex} ${newpet.age}`)
                    $(`#${pet._id}-u-pet-name`).val(newpet.name);
                    $(`#${pet._id}-u-pet-animal`).val(newpet.animal);
                    $(`#${pet._id}-u-pet-breed`).val(newpet.breed);
                    $(`#${pet._id}-u-pet-size`).val(newpet.size);
                    $(`#${pet._id}-u-pet-sex`).val(newpet.sex);
                    $(`#${pet._id}-u-pet-age`).val(newpet.age);
                  };
                });
              };
            });
            $("#errors").html('');
            $(`#${pet._id}-edit`).show();
            $(`#${pet._id}-update`).hide();
            $(`#${pet._id}-back`).hide();
            $(`#${pet._id}-submit`).hide();
          }); //end of submit click event

          // delete pet
          $(`#${pet._id}-delete`).click(function() {
            $.ajax({
              url: `/shelters/${localStorage.shelter}/pets/${pet._id}`,
              type: "delete"
            })
            .then(function(data) {
              if(data.error) {
                $("#errors").html(`Error: ${data.error}`);
              }
              else {
                //update pet list
                $(`#${pet._id}-list`).hide();
              };
            });
            $("#errors").html('');
            $(`#${pet._id}-edit`).hide();
            $(`#${pet._id}-update`).hide();
            $(`#${pet._id}-back`).hide();
            $(`#${pet._id}-submit`).hide();
          }); //end of delete click event

          $(`#${pet._id}-edit`).click(function() {
            $(`#${pet._id}-update`).show();
            $(`#${pet._id}-back`).show();
            $(`#${pet._id}-submit`).show();
            $(`#${pet._id}-edit`).hide();
          })
          $(`#${pet._id}-back`).click(function() {
            $(`#${pet._id}-edit`).show();
            $(`#${pet._id}-update`).hide();
            $(`#${pet._id}-back`).hide();
            $(`#${pet._id}-submit`).hide();
          })
        }); //end of for each
        $("#errors").html('');
        // $("#show-pets-button").hide();
        $("#pet-div").show();
      }
    })
})

$(".show-pets-back").click(function() {
  $("#pet-div").hide();
  $("#show-pets-button").show();
})

$("#welcome-close").click(function() {
  $("#welcome").hide();
})

})
