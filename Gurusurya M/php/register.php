<?php
$username = $_POST['uname'];
$email  = $_POST['email'];
$password = $_POST['pwd'];

if (!empty($username) || !empty($email) || !empty($password) )
{

$host = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "g_db";
// Create connection
$conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);

if (mysqli_connect_error()){
  die('Connect Error ('. mysqli_connect_errno() .') '
    . mysqli_connect_error());
}
else{
  $SELECT = "SELECT email From register Where email = ? Limit 1";
  $INSERT = "INSERT Into register (uname , email , pwd )values(?,?,?)";

//Prepare statement
     $stmt = $conn->prepare($SELECT);
     $stmt->bind_param("s", $email);
     $stmt->execute();
     $stmt->bind_result($email);
     $stmt->store_result();
     $rnum = $stmt->num_rows;

     //checking username
      if ($rnum==0) {
      $stmt->close();
      $stmt = $conn->prepare($INSERT);
      $stmt->bind_param("sss", $username,$email,$password);
     // $stmt->execute();
    // echo "<script> alert('New record inserted sucessfully')</script>";
     }
     if ($stmt->execute()) {
      echo "success";
  } else {
      echo "error";
  }
  
     
     
     $stmt->close();
     $conn->close();
    }
} else {
 echo "All field are required";
 die();
}


?>