requirejs([
    'jquery',
    'instafeed',
    'facebook'
], function($, Instafeed,) {

    function getCaption(txt) {
        var urlStr = txt.match(/(?:https?|ftp):\/\/[\n\S]+/g);
        return {
            url: (urlStr ? urlStr[0] : "#"), // txt.match(/\bhttps?:\/\/\S+/gi),
            caption: txt.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
        };
    }
    function getLink(txt) {
        var string = txt.match(/\bhttps?:\/\/\S+/gi);

        return string ? string : undefined;
    }

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
                var imgTag = "<img class='portrait' src='" + data.picture.data.url + "'>";
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

                    var info = getCaption(photos[i].name);

                    var tagContent = "<div class='carousel-item " + active + "'>" +
                                        "<img src='" + photos[i].images[0].source + "'>" +
                                        "<div class='slide-caption'>" +
                                            "<p>" + info.caption + "</p>" +
                                            "<a class='btn btn-primary' href='" + info.url + "'>Link</a>" +
                                        "</div>" +
                                     "</div>";
                    document.getElementById('certificates-img').innerHTML += tagContent;
                }
            });

            FB.api('332124090823235?fields=photos{name,images}', function(data) {
                //console.dir(data);
                var photos = data.photos.data;
                for(var i in photos) {

                    var active = (i === "0") ? "active" : "";

                    var info = getCaption(photos[i].name);

                    var tagContent = "<div class='carousel-item " + active + "'>" +
                                        "<img src='" + photos[i].images[0].source + "'>" +
                                            "<div class='slide-caption'>" +
                                                "<p>" + info.caption + "</p>" +
                                                "<a class='btn btn-primary' href='" + info.url + "'>Link</a>" +
                                            "</div>" +
                                     "</div>";
                    document.getElementById('projects-img').innerHTML += tagContent;
                }
            });

            /**
             * Get Projects album pictures
             */
            // FB.api('332124090823235?fields=photos{picture,name}', function(data) {
            //
            //     var photos = data.photos.data;
            //
            //     for(var i in photos) {
            //         var img = "<img src='" + photos[i].picture + "'>";
            //
            //         document.getElementById('projects-img').innerHTML += img;
            //
            //         var url;
            //         var string = getLink(photos[i].name);
            //
            //         if(string) {
            //             url = "<br><a href='" + string[0] + "'>Link</a>";
            //             document.getElementById('projects-img').innerHTML += url;
            //         }
            //
            //     }
            //
            // });


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


    // Get LastFM album artworks
    // Link: http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=miguelsolans&api_key=b9704a63e108fe1e52d55c0226ded89e&format=json
    $.getJSON('https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=miguelsolans&api_key=b9704a63e108fe1e52d55c0226ded89e&format=json', function(data) {
        console.log(data);

        for(let i = 0; i < 6; i++) {
            var imgTag = "<img src=" + data.topalbums.album[i].image[3]["#text"] + ">";
            var artistInfo = "<p>" + data.topalbums.album[i].artist.name +"</p>";
            var playCount = "<p>" + data.topalbums.album[i].playcount + "</p>";
            document.getElementById('music').innerHTML += imgTag;
            // document.getElementById('music').innerHTML += artistInfo;
        }
    });



    // Instagram feed
    var userFeed = new Instafeed({
        get: 'user',
        // miguelsolans: 356670749
        //              Token: 356670749.1677ed0.7401560dd16d424a9744967925c234db
        // metalstigma: 7516438355
        //              Token: 7516438355.1677ed0.6dc1f61c766f44ad8a85fac1abff991d
        // worldby_lenses: 13531427925
        //              Token: 13531427925.1677ed0.8079190ddfb4467789a1586f50c89e17
        userId: '13531427925',
        accessToken: '13531427925.1677ed0.8079190ddfb4467789a1586f50c89e17',
        	//filter: function(image) {
        	//	return image.tags.indexOf('metal') >= 0;
        	//},
        limit: 10,
        template: '<a href="{{link}}" target="_blank"><img class="col-md-10" src="{{image}}" /></a>',
        // template: '<a href="{{link}}" target="_blank"><img class="insta-pic" src="{{image}}" /></a>',
        resolution: 'standard_resolution'
    });
    userFeed.run();

});