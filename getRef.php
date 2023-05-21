<?php
    $file = fopen("./users.json", "r");
    $buffer = "";
    while (!feof($file)) {
        $buffer .= fgetc($file);
    }
    fclose($file);
    $found = false;
    $userPos = -1;
    $refPos = -1;
    $query = new stdClass;
    $query = json_decode($_GET['query']);
    $users = new stdClass;
    $users = json_decode($buffer);
    foreach ($users as $user) {
        $userPos = $userPos + 1;
        if ($query->username === $user->username) {
            $found = true;
            break;
        }
    }
    if ($found === false) {
        $userPos = -1;
    }
    $found = false;
    if ($userPos !== -1) {
        $refPos = $refPos + 1;
        foreach ($users[$userPos]->refs as $ref) {
            if ($query->id === $ref->id) {
                $found = true;
                break;
            }
        }
    }
    if ($found === false) {
        $refPos = -1;
    }
    if ($refPos !== -1) {
        echo json_encode($users[$userPos]->refs[$refPos]);
    }
?>