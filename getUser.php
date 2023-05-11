<?php
    $file = fopen("./users.json", "r");
    $buffer = "";
    while (!feof($file)) {
        $buffer .= fgetc($file);
    }
    fclose($file);
    $found = false;
    $pos = -1;
    $query = new stdClass;
    $query = json_decode($_GET['query']);
    $users = new stdClass;
    $users = json_decode($buffer);
    foreach ($users as $user) {
        $pos = $pos + 1;
        if ($query->username === $user->username) {
            $found = true;
            break;
        } else if ($query->email === $user->email) {
            $found = true;
            break;
        }
    }
    if ($found === false) {
        $pos = -1;
    }
    if ($pos !== -1) {
        echo json_encode($users[$pos]);
    }
?>