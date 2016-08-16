$("#submit-register").click(function () {
  var email = $("#register-email").val()
  var password = $("#register-password").val()
  var confirmPassword = $("#confirm-password").val()

  if (password !== confirmPassword) {
    $("#errors").html("Passwords do not match")
    return false; // this will end the callback execution
  }
  $.post("/register", {
    email: email,
    password: password
  }).then(function (data) {
    if (data.error) {
      $("#errors").html(`Error: ${data.error}`);
    }
    else {
      $("#errors").html('');
      $("#results").html(data.msg)
      $("#login").show();
      $("#oauth").show();
      $("#register").hide();
    }
  })
})

$("#submit-login").click(function () {
  var email = $("#login-email").val()
  var password = $("#login-password").val()

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
      $.get(`/users/${localStorage.id}`)
        .then(function(user) {
          if (user.shelterId) {
            localStorage.shelter = user.shelterId;
            $(".edit-shelter-button").show();
            $("#pet-button").show();
          }
          else {
            $("#shelter-button").show();
          }
          $("#errors").html('');
          $("#results").html(`JWT: ${data.token}`);
          $("#oauth").hide();
          $("#login").hide();
          $("#local-logout").show();
          $("#update-button").show();
        })
    }
  })
})

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
        $("#errors").html('');
        $("#additional-information").hide();
        $("#update-button").show();
        if (data.shelter) $("#shelter-button").show();
        else $("#shelter-button").hide();
      }
    })
})

$("#submit-shelter").click(function() {
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

$("#get-users").click(function () {
  $.get("/users", { token: localStorage.token })
  .then(function (users) {
    $("#users").html(JSON.stringify(users))
  })
})

$("#login-button").click(function() {
  $("#login").show();
  $("#login-button").hide();
  $("#register-button").hide();
})

$("#register-button").click(function() {
  $("#register").show();
  $("#login-button").hide();
  $("#register-button").hide();
})

$(".local-back").click(function() {
  $("#login").hide();
  $("#register").hide();
  $("#login-button").show();
  $("#register-button").show();
})

$("#update-button").click(function() {
  $("#additional-information").show();
  $("#update-button").hide();
})

$(".update-back").click(function() {
  $("#update-button").show();
  $("#additional-information").hide();
})

$("#shelter-button").click(function() {
  $("#shelter-button").hide();
  $("#shelter-information").show();
})

$(".edit-shelter-button").click(function() {
  var oauthId = $("#oauth-id").html();
  if (!oauthId) oauthId = localStorage.id;
  $.get(`/users/${oauthId}`)
    .then(function(user) {
      localStorage.shelter = user.shelterId
      $.get(`/shelters/${user.shelterId}`)
        .then(function(shelter) {
          $(".edit-shelter-button").hide();
          $("#shelter-update").show();
        })
    })
})

$("#update-shelter").click(function() {
  var name = $("#shelter-u-name").val();
  var address = $("#shelter-u-address").val();
  var city = $("#shelter-u-city").val();
  var state = $("#shelter-u-state").val();
  var zip = $("#shelter-u-zip").val();
  var description = $("#shelter-u-description").val();
  var phone = $("#shelter-u-phone").val();
  var email = $("#shelter-u-email").val();

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
})

$("#pet-button").click(function() {
  $("#pet-button").hide();
  $("#pet-information").show();
})

$(".pet-back").click(function() {
  $("#pet-information").hide();
  $("#pet-button").show();
})

$("#submit-pet").click(function() {
  $("#pet-information").hide();
  $("#pet-button").show();
})


$("#logout").click(function () {
  $("#login-button").show();
  $("#register-button").show();
  $("#oauth").show();
  $("#local-logout").hide();
  $("#update-button").hide();
  $("#shelter-button").hide();
  // unsetting the token will logout the user
  localStorage.removeItem('token');
  localStorage.removeItem('id');
})

$("#get-user").click(function() {
  var oauthId = $("#oauth-id").html();
  if (!oauthId) oauthId = localStorage.id;
  $.get(`/users/${oauthId}`, { token: localStorage.token })
  .then(function (user) {
    $("#users").html(JSON.stringify(user))
  })
})