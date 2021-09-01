<?php
    if (0 < $_FILES['file']['error']) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    } else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'assets/save/' . date('h-m-s_d-m-y') . '_' . $_FILES['file']['name']);
    }

    return print_r(date('h-m-s_d-m-y') . '_' . $_FILES['file']['name']);
?>