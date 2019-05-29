define([
    'jquery',
    'facebook'
], function () {
    "use strict";
    
    var fetchedData = {
        facebook: {}
    };

    function getFacebookData() {
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
    }


});