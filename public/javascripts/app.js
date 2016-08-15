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
      $("#errors").html('');
      $("#results").html(`JWT: ${data.token}`);
      $("#oauth").hide();
      $("#login").hide();
      $("#local-logout").show();
      $("#update-button").show();
      if (data.shelter) $("#shelter-button").show();
      else $("#shelter-button").hide();
          // localStorage will persist the token until you explicitly
          // delete it. Closing the browser or tab will not delete
          // the token
      localStorage.token = data.token
      localStorage.id = data.id
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

$(".shelter-back").click(function() {
  $("#shelter-information").hide();
  $("#shelter-button").show();
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