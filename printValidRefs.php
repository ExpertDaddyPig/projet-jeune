<?php
$refs = json_decode($_GET['refs']);
$valid = false;
foreach ($refs as $ref) {
    if ($ref->valid === true) {
        $valid = true;
    }
}
if ($valid) {
    echo '<div id="refs"><table>';
    foreach ($refs as $ref) {
        if ($ref->valid === true) {
            echo '<tr><td id="validRef"><label class="validRefLabel" for="' . $ref->id . '"><div id="validRefTitle">' . $ref->engagement->title . '</div><br><div id="validRefDesc">' . $ref->engagement->desc . '</div></label><input type="checkbox" class="validRefs" id="' . $ref->id . '"></td>';
            echo '</tr>';
        }
    }
    echo '</table><div id="consMailInput"><label class="labellogin labeltext" for="consEmail">Email du consultant</label><input class="inputlogin usernameinput" type="text" id="consEmail" name="consEmail"><input id="sendToCons" type="button" value="Envoyer les références au consultant" onclick="sendCons()"></div></div>';
} else {
    echo '<div id="empty">Aucune Référence n\'a été soumise.</div>';
}
?>