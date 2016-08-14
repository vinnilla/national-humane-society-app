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

  $.ajax({
    url: `/users/${localStorage.id}`,
    type: "patch",
    dataType: "json",
    data: {
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      animal: animal
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
      }
    })
})

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


$("#logout").click(function () {
  $("#login-button").show();
  $("#register-button").show();
  $("#oauth").show();
  $("#local-logout").hide();
  $("#update-button").hide();
  // unsetting the token will logout the user
  localStorage.removeItem('token');
  localStorage.removeItem('id');
})

$("#get-user").click(function() {
  $.get(`/users/${localStorage.id}`, { token: localStorage.token })
  .then(function (user) {
    $("#users").html(JSON.stringify(user))
  })
})