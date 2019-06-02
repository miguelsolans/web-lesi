define([
    // Nothing
],function(){
    'use strict';

    return {
        /**
         * Get Caption and URL
         * @param txt
         * @returns Object containing url and caption
         */
        getCaption: function(txt) {
            var urlStr = txt.match(/(?:https?|ftp):\/\/[\n\S]+/g);
            return {
                url: (urlStr ? urlStr[0] : "#"), // txt.match(/\bhttps?:\/\/\S+/gi),
                caption: txt.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
            };
        },
        /**
         * Get Link from text
         * @param txt
         * @returns string containing url or empty
         */
        getLink: function(txt) {
            var string = txt.match(/\bhttps?:\/\/\S+/gi);

            return string ? string : undefined;
        },
        /**
         * Get image tag from image url
         * @param url - image url
         * @param cls - image tag class
         * @returns image tag
         */
        getImgTag: function(url, cls) {
            if(cls === undefined || cls === "")
                return "<img src='" + url + "'>";
            else
                return "<img class='" + cls + "' src='" + url + "'>";
            // return cls ? (undefined || "") ? "<img src='" + url + "'>" : "<img class='" + cls + "' src='" + url + "'>";
        },
        /**
         * Get a carousel for header
         * @param imgUrl
         * @param active
         * @returns {string}
         */
        getCarouselHeader: function(imgUrl, active) {
            //<div class="carousel-item active" style="background-image: url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')">
            //return "<div class='carousel-item " + active + "' style=background-image: url(" + imgUrl + ")></div>";
            return "<div class='carousel-item " + active + "' style='background-image: url(" + imgUrl + ")'></div>";
        },

        getCarouselItem: function(imgUrl, caption, url, active) {
            if((caption !== undefined && url !== undefined) || (caption !== "" && url !== "")) {
                return "<div class='carousel-item " + active + "'>" +
                            "<img class='center-img' src='" + imgUrl + "'>" +
                            "<div class='slide-caption'>" +
                                "<p>" + caption + "</p>" +
                                "<a class='btn btn-primary' target='_blank\' href='" + url + "'>Link</a>" +
                            "</div>" +
                        "</div>";
            } else {
                return "<div class='carousel-item " + active + "'><img class='center-img' src='" + imgUrl + "'></div>";
            }
        }
    }
});