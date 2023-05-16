<?php
    $file = fopen("./users.json", "r");
    $buffer = "";
    while (!feof($file)) {
        $buffer .= fgetc($file);
    }
    fclose($file);
    $file = fopen("./users.json", "w+");
    $users = new stdClass;
    $object = new stdClass;
    $in = false;
    $users = json_decode($buffer);
    $object = json_decode($_GET["object"]);
    foreach ($users as $user) {
        if ($object->username === $user->username) {
            $in = true;
            break;
        }
    }
    if (!$in) {
        $object->ref = array();
        array_push($users, $object);
        echo $object->username." added";
    }
    fwrite($file, json_encode($users, JSON_PRETTY_PRINT));
    fclose($file);
?>