var cheerio = require( "cheerio" )

function addlabel(html, label, labelPrev) {
    if (label.length > 0){
        var $ = cheerio.load(html);

        // nested Block sections
        $('#labelPrev').each(function(){
            var img = $(this).prev().find('img');

            var correctLabel = $(this).attr('label');
            var figure = $('<figure></figure>');
            figure.attr('border', '5');
            var caption = $('<figcaption>Figure is ('+correctLabel+')</figcaption>');

            img.wrap(figure);
            figure.append(caption);
            $(this).prev().attr("label",correctLabel);
            img.attr("label",correctLabel);
            img.attr('align','center');
            img.attr('style',"margin-left: auto;margin-right: auto;display: block;")

            $(this).remove();
        });

        // Update Paragraphs
        $('p').each(function(){
            if ($(this).attr('label')){
                return $(this);
            }
            var p = $(this);
            if (p.text().length > 0 ){
                p.prepend( '('+label+')' )
            }
            p.attr('label',label)
        });

        $('img').each(function(){
            if ($(this).attr('label')){
                return $(this);
            }
            var img = $(this);

            img.attr('border', '5');
            var figure = $('<figure></figure>');
            figure.attr('border', '5');
            var caption = $('<figcaption>Figure is ('+label+')</figcaption>');

            img.wrap(figure);
            figure.append(caption);
            img.attr('label',label);
            img.attr('align','center');
            img.attr('style',"margin-left: auto;margin-right: auto;display: block;")

        });

        $('table').each(function(){
            if ($(this).attr('label')){
                return $(this);
            }
            var table = $(this);

            table.attr('border', '5');
            var figure = $('<figure></figure>');
            var caption = $('<figcaption>Table is ('+label+')</figcaption>');

            table.wrap(figure);
            figure.append(caption);
            table.attr('label',label)

        });

        if (labelPrev){
            var div = $('<div id="labelPrev"></div>');
            div.attr('label',label);
            $('body').append(div);

        }
        return $.html();
    }
    else {return html;}
}

module.exports = {

    hooks: {
    	'page': function(page){
            var pluginConfig = this.config.get('pluginsConfig.blockLabels');
            var defaultLabel = pluginConfig['defaultLabel'];
            page.content = addlabel(page.content,defaultLabel);
    		return page;
    	}
    },

    blocks: {
        label: {
            process: function (block) {
                var label = block.kwargs.label || '';
                var labelPrev = block.kwargs.labelPrev || undefined;
                return this
                    .renderBlock('markdown', block.body)
                    .then(function(renderedBody) {
                        return addlabel(renderedBody,label,labelPrev);
                    });
            }
        }
    }
};
