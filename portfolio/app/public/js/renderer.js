define([
    'jquery',
    'instafeed',
    'utils',
    //'fetchApi',
    'facebook',
], function($, Instafeed, utils) {

    // Facebook API
    /**
     *
     */
    FB.init({
        appId      : '1895870987181544',
        version    : 'v3.3'
    });
    /**
     * Token: EAAa8SNy7HegBANbZBKn5ehDihxvlIXRZAPdkOEt5JNYgd0Ngqi9HMbTBSyBdvp7faH1VsKfnaKPk95Gf24gS81cBjMRKbxSB7ke8ZARsDjDPkLhplin1SPlYlFbjgWiCzs6E9sfOdSGvbFFaFunsHREZBv7zs4eNvKIrAKIxZBwV4peRx7W7aEZCkODPRJhkRUMy2ACBa4ngZDZD
     */
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {

            console.log("%c Logged in!",
                'font-weight: bold; font-size: 50px; color: green; text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black');
            /**
             * Get Page profile Picture
             */
            FB.api('/325105178191793?fields=picture.height(900)', function(data) {
                // var imgTag = utils.getImgTag(data.picture.data.url);
                var imgTag = utils.getImgTag(data.picture.data.url, 'portrait');
                // var imgTag = "<img class='portrait' src='" + data.picture.data.url + "'>";
                document.getElementById('profile-picture').innerHTML += imgTag;
            });


            /**
             * Get Information about Page
             */
            FB.api('/325105178191793?fields=about', function(data) {
                //console.log(data);
                document.getElementById('description').innerHTML = data.about;
            });

            /**
             * Get Certificates album images
             */
            FB.api('331562370879407?fields=photos{name,images}', function(data) {
                //console.dir(data);
                var photos = data.photos.data;
                for(var i in photos) {

                    var active = (i === "0") ? "active" : "";

                    var info = utils.getCaption(photos[i].name);

                    var tagContent = utils.getCarouselItem(photos[i].images[0].source, info.caption, info.url, active);

                    document.getElementById('certificates-img').innerHTML += tagContent;
                }
            });

            FB.api('332124090823235?fields=photos{name,images}', function(data) {
                //console.dir(data);
                var photos = data.photos.data;
                for(var i in photos) {

                    var active = (i === "0") ? "active" : "";

                    var info = utils.getCaption(photos[i].name);

                    var tagContent = utils.getCarouselItem(photos[i].images[0].source, info.caption, info.url, active);

                    document.getElementById('projects-img').innerHTML += tagContent;
                }
            });
            /**
             * Get page name
             */
            FB.api("/325105178191793?fields=name", function(data) {
                document.getElementById('name').innerText = data.name;
            });


        } else if (response.status === 'not_authorized') {
            // The user hasn't authorized your application.  They
            // must click the Login button, or you must call FB.login
            // in response to a user gesture, to launch a login dialog.
            console.log("%c Not Authorized!",
                'font-weight: bold; font-size: 50px; color: red; text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black');
        } else {
            // The user isn't logged in to Facebook. You can launch a
            // login dialog with a user gesture, but the user may have
            // to log in to Facebook before authorizing your application.
            console.log("%c Couldn't Login!",
                'font-weight: bold; font-size: 50px; color: red; text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black');
        }
    });

        // Instagram feed
    var userFeed = new Instafeed({
        get: 'user',
        userId: '13531427925',
        accessToken: '13531427925.1677ed0.8079190ddfb4467789a1586f50c89e17',
        limit: 10,
        template: '<a href="{{link}}" target="_blank"><img class="col-md-10" src="{{image}}" /></a>',
        resolution: 'standard_resolution'
    });
    userFeed.run();


    $(document).ready(function() {

        var keywords = document.getElementById('keywords').getAttribute("content");


        //var tags = ['landrover-offroad', 'programming', 'music-rock'];
        var tags = keywords.split(",");

        console.log(tags);

        var unsplashQuery = "https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=";
        var cnt = 0;

        for(var i = 0; i < tags.length; i++) {
            var apiKey = "&client_id=e3e934996a072887e6f72b2b9eff19e8e7f49eb1126684514b9b8bbcf91c29e7";
            var apiStr = unsplashQuery + tags[i] + apiKey;


            $.getJSON(apiStr, function(data) {
                var active = (cnt === 0) ? "active" : "";
                cnt++;
                // document.getElementById('header-img').innerHTML += utils.getImgTag(data.results[0].urls.regular);
                var tagContent = utils.getCarouselHeader(data.results[0].urls.regular, active);
                    //utils.getCarouselItem(data.results[0].urls.regular, undefined, undefined, active);
                document.getElementById('header-img').innerHTML += tagContent

            });
        }

        $.getJSON('https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=miguelsolans&api_key=b9704a63e108fe1e52d55c0226ded89e&format=json', function(data) {
            console.log(data);
            var albums = data.topalbums.album;

            for(let i = 0; i < 12; i++) {
                var active = i === 0 ? "active" : "";
                var artistName = albums[i].artist.name,
                    artistUrl  = albums[i].artist.url;

                var tagContent = utils.getCarouselItem(albums[i].image[3]["#text"], artistName, artistUrl, active);

                document.getElementById('music').innerHTML += tagContent;
                // document.getElementById('music').innerHTML += utils.getImgTag(data.topalbums.album[i].image[3]["#text"]);

                // var imgTag = "<img src=" + data.topalbums.album[i].image[3]["#text"] + ">";
                // var artistInfo = "<p>" + data.topalbums.album[i].artist.name +"</p>";
                // var playCount = "<p>" + data.topalbums.album[i].playcount + "</p>";
            }
        });


    });
});