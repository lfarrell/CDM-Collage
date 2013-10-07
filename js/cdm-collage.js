$(function() {
    var target = $('#target');
    var CDM = new CDMImages();

    $('#search_form').submit(function(e) {
        var hide = $('#hide');
        var query = $('#search').val();

        target.empty();
        hide.removeClass('hide');

        data = $.parseJSON($.ajax({
            url: "cdm-proxy.php",
            dataType: "json",
            async: false,
            data: { q: query, type: 'json' }
        }).responseText);

        hide.addClass('hide');
        target.html(CDM.process(data));

        e.preventDefault();
    });

    $('#shuffle').click(function(e) {
        var shuffle_imgs = _.shuffle(data);
        var new_order = CDM.process(shuffle_imgs);

        target.animate({
            height: 0,
            opacity: 0
        }, 1500);

        setTimeout(function () {
            target.empty().html(new_order)
        }, 1800);

        setTimeout(function() {
            target.animate({
                height: "100%",
                opacity: 1
            }, 2800);
        });

        e.preventDefault();
    });
});

function CDMImages() {
    this.process = function(data, opacity) {
        var all_images = '';
        var image_list = [];
        var results_size = data.length;
        var base_url = 'http://cdm_path/cdm/singleitem/collection';

        if(results_size > 0) {
            for(var i=0; i<results_size; i++) {
                all_images += '<div class="align" id="' + i + '">';
                all_images += '<a target="_blank" href="' + base_url + data[i].collection + '/id/' + data[i].pointer +'">';
                all_images += '<img src="' + data[i].url + '" alt="' + data[i].title + '"/>';
                all_images += '<div class="description">' +data[i].title + '</div></a></div>';
            }
        } else {
            all_images += '<p id="no-results">No results to display</p>';
        }
        return all_images;
    };
};