var canScroll = true;
var isGameActive = false;
var navbar = $('.navbar');

$(function () {
    $(window).on('scroll', () => {
        ($(window).scrollTop() > 1000) ? navbar.addClass('active') : navbar.removeClass('active');
    });

    $(window).on('keydown', (e) => {
        if (!canScroll && isGameActive) {
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }
    });

    $(document).click((e) => {
        ($(e.target).is("#snakeCanvas")) ? (canScroll = false, isGameActive = true) : (canScroll = true, isGameActive = false);
    });
});