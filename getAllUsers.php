<?php
    $file = fopen("./users.json", "r");
    $buffer = "";
    while (!feof($file)) {
        $buffer .= fgetc($file);
    }
    fclose($file);
    $users = new stdClass;
    $list = array();
    $users = json_decode($buffer);
    foreach ($users as $user) {
        array_push($list, $user);
    }
    echo json_encode($list);
?>