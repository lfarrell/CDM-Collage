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

    $('#shuffle').click(function() {
        var shuffle_imgs = _.shuffle(data);
        var new_order = CDM.process(shuffle_imgs);

        CDM.animate_view(target, new_order);
    });

    $('#lucky').click(function() {
        var pluck_img = _.sample(data);
        var container = [];
        container.push(pluck_img)
        var img = CDM.process(container);

        CDM.animate_view(target, img);
    });
});

function CDMImages() {
    /**
     * Processes the returned images into HTML
     * @param data
     * @returns {string}
     */
    this.process = function(data) {
        var all_images = '';
        var results_size = data.length;
        var cdm_path = 'cdm_path';

        if(results_size > 0) {
            for(var i=0; i<results_size; i++) {
                all_images += '<div class="align" id="' + i + '">';
                all_images += '<a target="_blank" href="' + cdm_path + data[i].collection + '/id/' + data[i].pointer +'">';
                all_images += '<img src="' + data[i].url + '" alt="' + data[i].title + '"/>';
                all_images += '<div class="description">' +data[i].title + '</div></a></div>';
            }
        } else {
            all_images += '<p id="no-results">No results to display</p>';
        }
        return all_images;
    };

    /**
     * Hides and displays the returned images when shuffled or lucky is clicked
     * @param target
     * @param order
     */
    this.animate_view = function(target, order) {
        target.animate({
            height: 0,
            opacity: 0
        }, 1500);

        setTimeout(function() {
            target.empty().html(order)
        }, 1800);

        setTimeout(function() {
            target.animate({
                height: "100%",
                opacity: 1
            }, 2800);
        });
    }
};