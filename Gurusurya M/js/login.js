$(document).ready(function() {
  $("#email").blur(function() {
    var email = $(this).val();
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression pattern for email format with "@" and domain name
    if (pattern.test(email)) {
        $("#e").text(" ");
    } else {
        $("#e").text("Invalid email");
    }
  });

    $("#login_btn").click(function() {
      var email = $("#email").val();
      var pwd = $("#password").val();
      var userData = JSON.parse(localStorage.getItem("userData"));
  
      if (userData) {
        for (var i = 0; i < userData.length; i++) {
          if (email === userData[i].email && pwd === userData[i].pwd) {
      
            window.location.href='./profile.html';
            alert("Logged in successfully!");
            return;
          }
        }
        alert("Invalid username or password.");
      } else {
        alert("No user data found.");
      }
    });
  });
  