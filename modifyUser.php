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
    $pos = -1;
    $users = json_decode($buffer);
    $object = json_decode($_GET["query"]);
    foreach ($users as $user) {
        $pos = $pos + 1;
        if ($object->username === $user->username) {
            $in = true;
            break;
        } else if ($object->email === $user->email) {
            $in = true;
            break;
        }
    }
    if ($in) {
        if ($users[$pos]->username !== $object->username) {
            $users[$pos]->username = $object->username;
        }
        if ($users[$pos]->password !== $object->password) {
            $users[$pos]->password = $object->password;
        }
        if ($users[$pos]->email !== $object->email) {
            $users[$pos]->email = $object->email;
        }
        echo json_encode($users[$pos]);
    }
    fwrite($file, json_encode($users, JSON_PRETTY_PRINT));
    fclose($file);
?>