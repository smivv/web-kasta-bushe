window.addEventListener('load', function() {
    var Preloader = function (element) {
        var video =  document.getElementById(element),
            preloader = document.getElementById('preloader'),
            enter = document.getElementById('enter'),
            trailer = document.getElementById('trailer');

        var api = {};

        api.removePreloader = function() {
            preloader.style.opacity = 0;
            trailer.style.opacity = 1;
            enter.style.opacity = 1;
        };

        api.startCheckingLoading = function() {

            video.addEventListener('click', function(){
                video.play();
            }, false);

            video.addEventListener('play',
                api.removePreloader()
            );
        };

        var checker = function() {
            var p = Math.round(video.buffered.end(0)) / Math.round(video.seekable.end(0));
            console.log(p);
            if (p > 0.3) {
                api.removePreloader();
                video.removeEventListener("progress", checker, false);
            }
        };

        video.addEventListener("progress", checker, false);

        if(bowser.android || bowser.ios){
            video.setAttribute('controls', 'controls');
        }

        return api;
    };

    Preloader('video').startCheckingLoading();

    $("#youtube").modalVideo();
});

