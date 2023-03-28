$(document).ready(function() {
    // Initialize user data array
    var userData = [];
    
    // Check if user data is stored in local storage and load it into userData array if present
    if (localStorage.getItem("userData")) {
        userData = JSON.parse(localStorage.getItem("userData"));
    }
  
     
    $("#username").blur(function() {
      // Get entered username
      var count=0;
      var uname = $(this).val();
      for (var i = 0; i < userData.length; i++) {
        if (userData[i].uname.toLowerCase() === uname.toLowerCase()) {
          count=count+1;
        }}
  
      // Log result to console
      if (count>0) {
        $("#u").text("User Name Already Exists!");
        console.log("Username already exists");
      
      } else {
        $("#u").text(" ");
        console.log("Username does not exist");
      }
    });
    $("#email").blur(function() {
      // Get entered username
      var email = $(this).val();
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression pattern for email format with "@" and domain name
      if (pattern.test(email)) {
          $("#e").text(" ");
      } else {
          $("#e").text("Invalid email");
      }
      var count1=0;
      for (var i = 0; i < userData.length; i++) {
        if (userData[i].email.toLowerCase() === email.toLowerCase()) {
          count1=count1+1;
        }}
  
      // Log result to console
      if (count1>0) {
      //  $("span").text("User Name Already Exists!");
        console.log("email already exists");
      } else {
        console.log("email does not exist");
      }
    });

    $("#password").on("input",function(){
      var password=$("#password").val();
      if(password.length<8)
      {
        $("#p").text("should be min 8 characters");
      }
      else{
        $("#p").text(" ");
      }
    });

    $("#cnfpassword").on("blur",function(){
      var password=$("#password").val();
      var cnfpassword=$("#cnfpassword").val();
      if(password===cnfpassword)
      {
        $("#cp").text("Passwords match");
        $("#cp").css("color", "green");
      }
      else{
        $("#cp").text("Passwords do not match");
      }
    });

    $("#btn").click(function() {
        // Get form data
        var uname = $("#username").val();
        var email = $("#email").val();
        var pwd = $("#password").val();
        var confirmpwd = $("#cnfPassword").val();
  
        // Validate input fields
        if (uname == "" || email == "" || pwd == "" || confirmpwd == "") {
            alert("All fields are required!");
            return false;
        } 
  
       // var hashedPwd = sha256(pwd);
   
  
        // Add user data to userData array
        userData.push({
            "uname": uname,
            "email": email,
            "pwd": pwd
        });
  
       // Save userData array to local storage
        localStorage.setItem("userData", JSON.stringify(userData));
        $.ajax({
          url: './php/register.php',
          type: 'post',
          data: {
              uname: uname,
              email: email,
              pwd: pwd
          },
          success: function(response) {
              if (response.includes('success')) {
                  //alert('Data inserted successfully!');
                  window.location.href="./login.html";
                  alert('Data inserted successfully!');
              } else {
                  alert('Data not inserted!');
              }
          }
      });
        /*// Create a new XMLHttpRequest object
        var xhttp = new XMLHttpRequest();
  
        // Define the function to be called when the response is received
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Display success message
                alert(this.responseText);
            } /*else if (this.readyState == 4) {
                // Display error message
                alert("Error sending data!");
            }
        };
  
        // Open a POST request to the server
        xhttp.open("POST","register.php",true);
  
        // Set the content type of the request
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
        // Send the form data to the server
        xhttp.send("uname=" + uname + "&email=" + email + "&pwd=" + pwd + "&confirmpwd=" + confirmpwd);*/
    });
  });