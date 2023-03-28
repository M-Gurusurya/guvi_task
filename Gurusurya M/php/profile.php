<?php
require 'vendor/autoload.php';
// connect to MongoDB
$mongoClient = new MongoDB\Client("mongodb://localhost:27017");

// select the database
$database = $mongoClient->Details;

// get the form data
$dob = $_POST['dob'];
$age = $_POST['age'];
$contact = $_POST['contact'];
$address=$_POST['address'];
// create a new document
$document = [
    'dob' => $dob,
    'age' => $age,
    'contact' => $contact,
    'address'=>$address
];

// insert the document into the collection
$collection = $database->details;
$result = $collection->insertOne($document);

// check if the insertion was successful
if ($result->getInsertedCount() > 0) {
    echo "success";
} else {
    echo "error";
}

?>