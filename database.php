<?php
$servername = "db4free.net";
$username = "golifejs";
$password = "f@7ZCZW$9_\$C@wH";
$dbname = "golifejs";

if ($_GET["ope"] == "save") {
    $saves_name = $_POST["saves_name"];
    $saves_json = $_POST["saves_json"];
    $saves_tileCount = $_POST["saves_tileCount"];
    $saves_ups = $_POST["saves_ups"];
    $saves_image = $_POST["saves_image"];

    try {
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "INSERT INTO saves (saves_name, saves_json, saves_tileCount, saves_ups, saves_image) VALUES (?,?,?,?,?)";
        $pdo->prepare($sql)->execute([$saves_name, $saves_json, $saves_tileCount, $saves_ups, $saves_image]);
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

    

?>