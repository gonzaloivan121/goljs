<?php
$servername = "db4free.net";
$username = "golifejs";
$password = "f@7ZCZW$9_\$C@wH";
$dbname = "golifejs";


function getSaves() {
    $servername = "db4free.net";
    $username = "golifejs";
    $password = "f@7ZCZW$9_\$C@wH";
    $dbname = "golifejs";

    try {
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $instance = $pdo->prepare("SELECT * FROM saves AS s INNER JOIN images AS i ON s.saves_image_id = i.image_id ORDER BY s.saves_id DESC");
        $instance->setFetchMode(PDO::FETCH_ASSOC);
        $instance->execute();

        return $instance->fetchAll();
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

function getJsonFromSave($id) {
    $servername = "db4free.net";
    $username = "golifejs";
    $password = "f@7ZCZW$9_\$C@wH";
    $dbname = "golifejs";

    try {
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $instance = $pdo->prepare("SELECT saves_json FROM saves WHERE saves_id=$id");
        $instance->setFetchMode(PDO::FETCH_ASSOC);
        $instance->execute();

        return $instance->fetch();
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}


if (isset($_GET["ope"])) {
    if ($_GET["ope"] == "save") {
        $saves_name = $_POST["saves_name"];
        $saves_json = $_POST["saves_json"];
        $saves_tileCount = $_POST["saves_tileCount"];
        $saves_ups = $_POST["saves_ups"];
        $saves_image_id = 0;

        $image_image = $_POST["image"];
        $image_uploaded = date("y-m-d h:m:s");
    
        try {
            $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $image_sql = "INSERT INTO images (image_image, image_uploaded) VALUES (?,?)";
            $pdo->prepare($image_sql)->execute([$image_image, $image_uploaded]);

            $saves_image_id = $pdo->lastInsertId();

            $saves_sql = "INSERT INTO saves (saves_name, saves_json, saves_tileCount, saves_ups, saves_image_id) VALUES (?,?,?,?,?)";
            $pdo->prepare($saves_sql)->execute([$saves_name, $saves_json, $saves_tileCount, $saves_ups, $saves_image_id]);
        } catch(PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    if ($_GET["ope"] == "get") {    
        try {
            $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $instance = $pdo->prepare("SELECT * FROM saves AS s INNER JOIN images AS i ON s.saves_image_id = i.image_id");
            $instance->setFetchMode(PDO::FETCH_ASSOC);
            $instance->execute();

            header('Content-type: application/json');
            echo json_encode($instance->fetchAll());
        } catch(PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }
}
?>