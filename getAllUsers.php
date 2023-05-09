<?php
    $file = fopen("./users.json", "r");
    $buffer = "";
    while (!feof($file)) {
        $buffer .= fgetc($file);
    }
    fclose($file);
    $users = new stdClass;
    $listString = "";
    $users = json_decode($buffer);
    foreach ($users as $user) {
        $listString .= $user->username."<br>";
    }
    echo $listString;
?>