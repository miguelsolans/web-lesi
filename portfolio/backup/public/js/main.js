requirejs([
    'jquery',
    'instafeed',
    'facebook'
    // 'setlistfm'
], function($, Instafeed,) {

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
            // 331562370879407?fields=picture
            // 331562370879407?fields=photos{name,images}
            // As maiores imagens vêm sempre em images[0].source
            FB.api('331562370879407?fields=photos{name,images}', function(data) {
                //console.dir(data);
                var photos = data.photos.data;
                for(var i in photos) {
                    var img = "<div class='col-sm'><img class='fb-image' src=" + photos[i].images[0].source + "></div>";


                    document.getElementById('certificates-img').innerHTML += img;

                    // var url;
                    // var string = getLink(photos[i].name);
                    //
                    // if(string) {
                    //     url = "<br><a href='" + string[0] + "'>Link</a>";
                    //     document.getElementById('certificates-img').innerHTML += url;
                    // }
                }

            });

            /**
             * Get Projects album pictures
             */
            FB.api('332124090823235?fields=photos{picture,name}', function(data) {

                var photos = data.photos.data;

                for(var i in photos) {
                    var img = "<img src='" + photos[i].picture + "'>";

                    document.getElementById('projects-img').innerHTML += img;

                    var url;
                    var string = getLink(photos[i].name);

                    if(string) {
                        url = "<br><a href='" + string[0] + "'>Link</a>";
                        document.getElementById('projects-img').innerHTML += url;
                    }

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
            console.log("Not Authorized!");
        } else {
            // The user isn't logged in to Facebook. You can launch a
            // login dialog with a user gesture, but the user may have
            // to log in to Facebook before authorizing your application.
            console.log("%c Couldn't Login!",
                'font-weight: bold; font-size: 50px; color: red; text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black');
            console.log("Not logged in!");
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
        userId: '13531427925',
        accessToken: 'be5187e776a04a3585c325909a5d44b3',
        limit: 10,
        template: '<a href="{{link}}" target="_blank"><img class="col-md-10" src="{{image}}" /></a>',
        // template: '<a href="{{link}}" target="_blank"><img class="insta-pic" src="{{image}}" /></a>',
        resolution: 'standard_resolution'
    });
    userFeed.run();





    // Setlist fm config
    // $.ajax({
    //     url: "https://api.setlist.fm/rest/1.0/user/miguelsolans/attended?p=1",
    //     method: "GET",
    //     headers: {
    //         "Authorization": "4b54b070-8e29-416c-bf35-ff6b8f6e7eeb",
    //         'Content-Type': 'application/json'
    //     },
    // }).then(function(response) {
    //     console.log(response);
    // }).catch(function(err) {
    //     console.error(err);
    // });
    // $.ajax({
    //     method: "GET",
    //     url: "https://api.setlist.fm/rest/1.0/user/miguelsolans/attended?p=1",
    //     headers: {
    //         "x-api-key": "4b54b070-8e29-416c-bf35-ff6b8f6e7eeb",
    //         "Accept": 'application/json'
    //     },
    //     success: function(data) {
    //         console.log(data);
    //     },
    //     dataType: "json"
    // });


    /*
    method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': bearer,
            'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
            'Content-Type': 'application/json'
        }
        //Accept: application/json
     */

});