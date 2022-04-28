<?php
function sum_array($no1, $no2)
{
    $array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    if ($no1 >= 0 && $no2 >= 0) { //Vérification si les deux paramétre sont positif
        if ($no1 < $no2) { //Vérification si le premier paramétre est inferieure au deuxiéme
            $sum = 0;
            foreach ($array as $value) {
                //Vérification pour chaque valeur du tableau 
                //si elle est entre les valuers des deux paramétre
                if ($value >= $no1 && $value <= $no2)
                    $sum += $value;
            }
            return $sum;
        } else return 0;
    } else return -1;
}

print(sum_array(0, 30));
