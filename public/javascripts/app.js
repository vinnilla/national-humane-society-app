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
    $("#results").html(data.msg)
  })
  $("#login").show();
  $("#oauth").show();
  $("#register").hide();
})

$("#submit-login").click(function () {
  var email = $("#login-email").val()
  var password = $("#login-password").val()

  $.post("/login", {
    email: email, 
    password: password
  }).then(function (data) {
    console.log(data)
    $("#results").html(`JWT: ${data.token}`);
    $("#oauth").hide();
    $("#login").hide();
    $("#local-logout").show();
        // localStorage will persist the token until you explicitly
        // delete it. Closing the browser or tab will not delete
        // the token
    localStorage.token = data.token
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

$("#logout").click(function () {
  console.log("clicked")
  $("#login-button").show();
  $("#register-button").show();
  $("#oauth").show();
  $("#local-logout").hide();
  // unsetting the token will logout the user
  localStorage.removeItem('token');
})

$("#get-user").click(function() {
  $.get(`/users/${localStorage.id}`, { token: localStorage.token })
  .then(function (user) {
    $("#users").html(JSON.stringify(user))
  })
})