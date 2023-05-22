<?php
$refs = json_decode($_GET['refs']);
$col = 0;
if (sizeof($refs) !== 0) {
    echo '<div id="refs"><table>';
    foreach ($refs as $ref) {
        if ($col === 0) {
            echo '<tr>';
            $col = $col + 1;
        }
        if ($col <= 2) {
            if ($ref->valid === true) {
                echo '<td><input type="checkbox" class="validRefs" id="'.$ref->id.'"><label for="'.$ref->id.'">'.$ref->engagement->title.'<br>'.$ref->engagement->desc.'</label></td>';
                $col = $col + 1;
            }
        }
        if ($col === 2) {
            echo '</tr>';
            $col = 0;
        }
    }
    echo '</table>Mail du consultant<br><input type="text" id="consEmail" name="consEmail"><br><input type="button" id="sendToCons" onclick="sendConsMail()" value="Envoyer les références au consultant"></div>';
} else {
    echo '<div id="empty">Aucune Référence n\'a été soumise.</div>';
}
?>