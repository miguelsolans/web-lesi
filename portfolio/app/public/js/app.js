requirejs.config({
    baseUrl: 'js',
    deps: ['main', 'settings'],
    paths: {
        jquery: 'lib/jquery',
        instafeed: 'lib/instafeed',
        facebook: 'lib/facebook',
        // slick: 'lib/slick/slick',
        setlistfm: 'lib/setlistfm'
    }
});