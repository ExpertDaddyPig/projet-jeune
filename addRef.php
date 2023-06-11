<?php
    $file = fopen("./users.json", "r");
    $buffer = "";
    while (!feof($file)) {
        $buffer .= fgetc($file);
    }
    fclose($file);
    $file = fopen("./users.json", "w+");
    $username = $_GET['username'];
    $users = new stdClass;
    $object = new stdClass;
    $in = false;
    $users = json_decode($buffer);
    $object = json_decode($_GET["object"]);
    $userPos = -1;
    foreach ($users as $user) {
        $userPos = $userPos + 1;
        if ($user->username === $username) {
            $in = true;
            break;
        }
    }
    if ($in) {
        array_push($users[$userPos]->refs, $object);
        echo "La référence \"".$users[$userPos]->refs[sizeof($users[$userPos]->refs) - 1]->engagement->title."\" a été ajoutée à votre liste de références.";
    }
    fwrite($file, json_encode($users, JSON_PRETTY_PRINT));
    fclose($file);
?>