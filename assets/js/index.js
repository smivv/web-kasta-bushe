var video = $('#video'),
    preloader = $('#preloader'),
    enter = $('#enter'),
    trailer = $('#trailer');

var api = {
    removePreloader: function() {
        preloader.css('opacity', 0);
        trailer.css('opacity', 1);
        enter.css('opacity', 1);
        setTimeout(function () {
            preloader.css('display', 'none');
        }, 300);
    },

    startCheckingLoading: function() {
        video.on('click', function () {
            video.play();
        }).on('play', function () {
            api.removePreloader();
        }).on('progress', function() {
            var p = Math.round(video[0].buffered.end(0)) /
                Math.round(video[0].seekable.end(0));
            console.log(p);
            if (p > 0.3) {
                api.removePreloader();
                video.off('progress');
            }
        });
    }
};

if(bowser.mobile){
    video.remove();
    setTimeout(api.removePreloader(), 3000);
    console.log('mobile');
}else{
    $('body').css('background-image', 'url()');
    $(document).ready(function () {
        api.startCheckingLoading();
    });
}


$(document).ready(function () {
    $(".watch_trailer").modalVideo();
});
