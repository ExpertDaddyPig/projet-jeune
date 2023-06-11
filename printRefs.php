<?php
$refs = json_decode($_GET['refs']);
$col = 0;
if (sizeof($refs) !== 0) {
    echo '<div id="refs"><table>';
    foreach ($refs as $ref) {
        if ($col === 0) {
            echo '<tr>';
        }
        if ($col <= 2) {
            echo '<td id="foundRef"><div id="foundRefTitle">'.$ref->engagement->title.'</div><br><div id="foundRefDesc">'.$ref->engagement->desc.'</div>';
            if ($ref->valid === true) {
                echo '<br><div id="foundRefStatus">Référence validée. <span class="emotes">✅</span></div>';
            } else if ($ref->valid === false) {
                echo '<br><div id="foundRefStatus">Référence non validée. <span class="emotes">⛔</span></div>';
            } else {
                echo '<br><div id="foundRefStatus">Référence en cours de validation.<span class="emotes">🔄</span></div>';
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