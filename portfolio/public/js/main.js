requirejs([
    'jquery',
    'instafeed',
    'facebook',
    'setlistfm'
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
     *
     */
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {

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
             * Get certificates images
             */
            // 331562370879407?fields=picture
            // 331562370879407?fields=photos{name,images}
            // As maiores imagens vêm sempre em images[0].source
            FB.api('331562370879407?fields=photos{picture,name}', function(data) {
                //console.dir(data);
                var photos = data.photos.data;
                for(var i in photos) {
                    var img = "<img src=" + photos[i].picture + ">";


                    document.getElementById('certificates-img').innerHTML += img;

                    var url;
                    var string = getLink(photos[i].name);

                    if(string) {
                        url = "<br><a href='" + string[0] + "'>Link</a>";
                        document.getElementById('certificates-img').innerHTML += url;
                    }
                }

                //var photo = "<img src=" + data.picture.data.url + ">";
                //document.getElementById('certificates-img').innerHTML += photo;

            });

            FB.api('332124090823235?fields=photos{picture,name}', function(data) {
                // console.log(data);

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

            // FB.api('332124090823235?fields=picture', function (data) {
            //     var photo = "<img src=" + data.picture.data.url + ">";
            //
            //     document.getElementById('projects-img').innerHTML += photo;
            // });
            /**
             * Get page name
             */
            FB.api("/325105178191793?fields=name", function(data) {
                document.getElementById('name').innerText = data.name;
            });

            // FB.ui({
            //     method: 'share',
            //     href: 'https://developers.facebook.com/docs/',
            //     quote: 'Hello World!'
            // }, function(response){
            //     console.log("Share Response:" + response);
            // });


            // FB.api(`/325105178191793/photos`, 'post', params, (response) => {
            //     if (response && response.error) {
            //         //upload failed
            //     } else {
            //         //upload successful
            //     }
            // });


        } else if (response.status === 'not_authorized') {
            // The user hasn't authorized your application.  They
            // must click the Login button, or you must call FB.login
            // in response to a user gesture, to launch a login dialog.
            console.log("Not Authorized!");
        } else {
            // The user isn't logged in to Facebook. You can launch a
            // login dialog with a user gesture, but the user may have
            // to log in to Facebook before authorizing your application.
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

    // $.getJSON('https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=miguelsolans&api_key=b9704a63e108fe1e52d55c0226ded89e&format=json', function(data) {
    //     console.log(data);
    //
    //     for(let i = 0; i < 4; i++) {
    //         var imgTag = "<img src=" + data.weeklyalbumchart.album[i].image[3]["#text"] + ">";
    //         var artistInfo = "<p>" + data.weeklyalbumchart.album[i].artist.name +"</p>";
    //         var playCount = "<p>" + data.weeklyalbumchart.album[i].playcount + "</p>";
    //         document.getElementById('music').innerHTML += imgTag;
    //         document.getElementById('music').innerHTML += artistInfo;
    //     }
    // });

    // $.getJSON('https://ws.audioscrobbler.com/2.0/?method=user.gettoptags&user=miguelsolans&api_key=b9704a63e108fe1e52d55c0226ded89e&format=json', function(data) {
    //     console.log("Musical Interests");
    //     console.log(data);
    // });


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