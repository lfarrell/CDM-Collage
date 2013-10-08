<?php
$data = strip_tags(trim($_GET['q']));
$terms = preg_split('\s+/', $data);
$type = strip_tags(trim($_GET['type']));
$cdm_path = 'cdm_path';
//$ch = curl_init("https://cdm_path/dmwebservices/index.php?q=dmQuery/all/subjec^" . $data . "^all^and/title/title/1024/1/0/0/0/0/0/0/" . $type);
//curl_setopt($ch, CURLOPT_HEADER, 0);
//$t = curl_exec($ch);
//curl_close($ch);
$t = file_get_contents("https://$cdm_path:82/dmwebservices/index.php?q=dmQuery/all/subjec^" . $data . "^all^and/title/title/1024/1/0/0/0/0/0/0/" . $type);

$e = json_decode($t);
$thumbnails = array();

$i = 0;
foreach($e->records as $c) {
    if(preg_match('/(jp2|png|jpg|jpeg)$/', $c->find)) {
        $thumbnails[$i]['url'] = "http://$cdm_path/utils/getthumbnail/collection" . $c->collection . "/id/" . $c->pointer;
        $thumbnails[$i]['title'] = $c->title;
        $thumbnails[$i]['collection'] = $c->collection;
        $thumbnails[$i]['pointer'] = $c->pointer;
        $i++;
    }
}
echo json_encode($thumbnails);
