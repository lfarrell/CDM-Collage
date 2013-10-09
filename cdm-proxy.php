<?php
class CDMImages {
    public $query;
    private $cdm_path = "cdm_path";
    private $query_list = array();
    private $query_regx = '\"';

    public function __construct($query) {
        $this->query = strip_tags(trim($query));
    }

    /**
     * split out query into phrases and single items
     * @return array
     */
    private function get_phrase_list() {
        return preg_split('/' . $this->query_regx . '/', $this->query, null, PREG_SPLIT_DELIM_CAPTURE);
    }

    /**
     * Get phrase terms
     * @return array
     */
    protected function get_phrases() {
        $phrases = $this->get_phrase_list();

        foreach($phrases as $phrase) {
            $phrase = trim($phrase);

            if(str_word_count($phrase) > 1) {
                $term = preg_replace('/\s+/', '+', $phrase);
                $this->query_list[] = "subjec^" . $term . "^all^and";
            } elseif(str_word_count($phrase) == 0) {
                unset($phrase);
            } else {
                if(preg_match('/^(and|or)$/', $term)) {
                    unset($phrase);
                }
                $this->query_list[] = "subjec^" . $phrase . "^all^and";
            }
        }

        return $this->query_list;
    }

    /**
     * Query can take a max of 6 terms
     * @return string
     */
    private function get_query_string() {
        $term_limit = array_slice($this->query_list, 0, 6);
        return implode('!', $term_limit);
    }

    /**
     * Searches the CDM API
     * @return mixed
     */
    protected function get_curl() {
        $query_string = $this->get_query_string();
        $ch = curl_init("https://" . $this->cdm_path . ":82/dmwebservices/index.php?q=dmQuery/all/" . $query_string . "/title/title/1024/1/0/0/0/0/0/0/json");
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }

    /**
     * Decodes raw returned json data
     * @return mixed
     */
    private function get_raw_data() {
        return json_decode($this->get_curl());
    }

    /**
     * Creates thumbnail list
     * @return array
     */
    protected function set_thumbnails() {
        $curl_data = $this->get_raw_data();
        $thumbnails = array();

        $i = 0;
        foreach($curl_data->records as $c) {
            if(preg_match('/(jp2|png|jpg|jpeg)$/', $c->find)) {
                $thumbnails[$i]['url'] = "http://$this->cdm_path/utils/getthumbnail/collection" . $c->collection . "/id/" . $c->pointer;
                $thumbnails[$i]['title'] = $c->title;
                $thumbnails[$i]['collection'] = $c->collection;
                $thumbnails[$i]['pointer'] = $c->pointer;
                $i++;
            }
        }

        return $thumbnails;
    }

    /**
     * Returns the JSON response
     */
    protected function return_thumbnails() {
        echo json_encode($this->set_thumbnails());
    }

    /**
     * Runs the show
     */
    public function main() {
        $this->get_phrases();
        $this->get_curl();
        $this->set_thumbnails();
        $this->return_thumbnails();
    }
}

$data = new CDMImages($_GET['q']);
$data->main();