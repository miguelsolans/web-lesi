define([
    // Nothing
],function(){
    'use strict';

    /**
     * Get Caption and URL from String
     * @param txt
     * @returns {{caption: void | string | never, url: string}}
     */
    function getCaption(txt) {
        var urlStr = txt.match(/(?:https?|ftp):\/\/[\n\S]+/g);
        return {
            url: (urlStr ? urlStr[0] : "#"), // txt.match(/\bhttps?:\/\/\S+/gi),
            caption: txt.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
        };
    }

    /**
     * Get Link from String
     * @param txt
     * @returns {undefined}
     */
    function getLink(txt) {
        var string = txt.match(/\bhttps?:\/\/\S+/gi);

        return string ? string : undefined;
    }

    function getImgTag(url) {
        return "<img src='" + url + "'>";
    }

    function getCarouselHeader(imgUrl, active) {
    //<div class="carousel-item active" style="background-image: url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')">
        //return "<div class='carousel-item " + active + "' style=background-image: url(" + imgUrl + ")></div>";
        return "<div class='carousel-item " + active + "' style='background-image: url(" + imgUrl + ")'></div>";
    }
    function getCarouselItem(imgUrl, caption, url, active) {
        if(caption !== undefined && url !== undefined) {
            return "<div class='carousel-item " + active + "'>" +
                "<img src='" + imgUrl + "'>" +
                "<div class='slide-caption'>" +
                "<p>" + caption + "</p>" +
                "<a class='btn btn-primary' href='" + url + "'>Link</a>" +
                "</div>" +
                "</div>";
        }
        else {
            return "<div class='carousel-item " + active + "'><img src='" + imgUrl + "'></div>";
        }
    }


    return {
        getCaption: function(txt) {
            var urlStr = txt.match(/(?:https?|ftp):\/\/[\n\S]+/g);
            return {
                url: (urlStr ? urlStr[0] : "#"), // txt.match(/\bhttps?:\/\/\S+/gi),
                caption: txt.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
            };
        },

        getLink: function(txt) {
            var string = txt.match(/\bhttps?:\/\/\S+/gi);

            return string ? string : undefined;
        },

        getImgTag: function(url) {
            return "<img src='" + url + "'>";
        },
        getCarouselHeader: function(imgUrl, active) {
            //<div class="carousel-item active" style="background-image: url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')">
            //return "<div class='carousel-item " + active + "' style=background-image: url(" + imgUrl + ")></div>";
            return "<div class='carousel-item " + active + "' style='background-image: url(" + imgUrl + ")'></div>";
        },

        getCarouselItem: function(imgUrl, caption, url, active) {
            if(caption !== undefined && url !== undefined) {
                return "<div class='carousel-item " + active + "'>" +
                            "<img src='" + imgUrl + "'>" +
                            "<div class='slide-caption'>" +
                                "<p>" + caption + "</p>" +
                                "<a class='btn btn-primary' href='" + url + "'>Link</a>" +
                            "</div>" +
                        "</div>";
            } else {
                return "<div class='carousel-item " + active + "'><img src='" + imgUrl + "'></div>";
            }
        }
    }
});

// getCaption: getCaption,
// getLink: getLink,
// getImgTag: getImgTag,
// getCarouselHeader: getCarouselHeader,
// getCarouselItem: getCarouselItem