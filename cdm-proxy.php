<?php
$data = strip_tags(trim($_GET['q']));
$terms = preg_split('/\s+/', $data);

$query_list= array();
foreach($terms as $term) {
    if(preg_match('/^(and|or)$/', $term)) {
        unset($term);
    }
    $query_list[] = "subjec^" . $term . "^all^and";
}

$term_limit = array_slice($query_list, 0, 6); // query can take a max of 6 terms
$query_string = implode('!', $term_limit);
$cdm_path = 'cdm_path';

$ch = curl_init("https://$cdm_path:82/dmwebservices/index.php?q=dmQuery/all/" . $query_string . "/title/title/1024/1/0/0/0/0/0/0/json");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$t = curl_exec($ch);
curl_close($ch);

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
