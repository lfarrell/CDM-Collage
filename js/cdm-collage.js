$(function() {
    var target = $('#target');
    var CDM = new CDMImages();

    $('#search_form').submit(function(e) {
        var hide = $('#hide');
        var query = $('#search').val();

        target.empty();
        hide.removeClass('hide');

        // Purposely blowing this out into the global space
        cdm_peek_data = $.parseJSON($.ajax({
            url: "cdm-proxy.php",
            dataType: "json",
            async: false,
            data: { q: query, type: 'json' }
        }).responseText);

        hide.addClass('hide');
        target.html(CDM.process(cdm_peek_data));

        e.preventDefault();
    });

    $('#shuffle').click(function() {
        var shuffle_imgs = _.shuffle(cdm_peek_data);
        var new_order = CDM.process(shuffle_imgs);

        CDM.animate_view(target, new_order);
    });

    $('#lucky').click(function() {
        var pluck_img = _.sample(cdm_peek_data);
        var container = [];
        container.push(pluck_img)
        var img = CDM.process(container);

        CDM.animate_view(target, img);
        setTimeout(function() {
            target.animate({
               "margin-left": "45%"

            }, 1800);
        });
    });
});


function CDMImages() {
    /**
     * Get the CDM path
     * @param data
     * @returns {*}
     * @private
     */
    this._get_cdm_path = function(data) {
        return data[0].cdm_path;
    }

    /**
     * Reset margin to those specified in the css.
     * @param target
     * @private
     */
    this._reset = function(target) {
        setTimeout(function() {
            target.css('margin-left', '10%');
        }, 1600);
    }

    /**
     * Processes the returned images into HTML
     * @param data
     * @returns {string}
     */
    this.process = function(data) {
        var all_images = '';
        var results_size = data.length;
        var cdm_path = this._get_cdm_path(data);

        // CDM path is the first result so skip it
        if(results_size > 0) {
            for(var i=0; i<results_size; i++) {
                if(!data[i].cdm_path) {
                    all_images += '<div class="align" id="' + i + '">';
                    all_images += '<a target="_blank" href="http://' + cdm_path + data[i].collection + '/id/' + data[i].pointer +'">';
                    all_images += '<img src="' + data[i].url + '" alt="' + data[i].title + '"/>';
                    all_images += '<div class="description">' +data[i].title + '</div></a></div>';
                }
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

        this._reset(target);

        setTimeout(function() {
            target.empty().html(order)
        }, 1800);

        setTimeout(function() {
            target.animate({
                height: "100%",
                opacity: 1
            }, 1900);
        });
    }
};