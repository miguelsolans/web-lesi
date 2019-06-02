//Main config file: http://requirejs.org/docs/api.html#config-baseUrl
require.config({
    //Define 3rd party plugins dependencies
    "*": {
        "utils":{}
    },
    paths: {
        jquery: 'lib/jquery',
        instafeed: 'lib/instafeed',
        facebook: 'lib/facebook',
        utils: 'utils'
    },
});

//Main module
require(["renderer", "utils"], function () {
    console.log("RequireJS Modules Loaded");
});