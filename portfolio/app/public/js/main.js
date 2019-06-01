//Main config file: http://requirejs.org/docs/api.html#config-baseUrl
require.config({
    //Define 3rd party plugins dependencies
    "*": {
        "utils":{},
        "fetch-data": {}
    },
    paths: {
        jquery: 'lib/jquery',
        instafeed: 'lib/instafeed',
        facebook: 'lib/facebook',
        utils: 'utils',
        fetchApi: 'fetch-data'
    },
});

//Main module
require(["renderer", "utils"], function () {
    console.log("RequireJS Modules Loaded");
});