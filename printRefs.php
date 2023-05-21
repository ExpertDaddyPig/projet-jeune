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
            echo '<td>'.$ref->engagement->title.'<br>'.$ref->engagement->desc;
            if ($ref->valid === true) {
                echo '<br>Référence validée.';
            } else if ($ref->valid === false) {
                echo '<br>Référence non validée.';
            } else {
                echo '<br>Référence en cours de validation.';
            }
            echo '</td>';
            $col = $col + 1;
        }
        if ($col === 2) {
            echo '</tr>';
            $col = 0;
        }
    }
    echo '</table></div>';
} else {
    echo '<div id="empty">Aucune Référence n\'a été soumise.</div>';
}
?>