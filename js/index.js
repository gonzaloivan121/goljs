Number.prototype.map = function (min1, max1, min2, max2) { return min2 + (max2 - min2) * ((this - min1) / (max1 - min1)) }

const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(canvas, e);
});

var s = getComputedStyle(canvas);
var w = s.width;
var h = s.height;

canvas.width = w.split('px')[0];
canvas.height = h.split('px')[0];

$(() => {
    resizeCanvas();

    var options = {
        container: 'body',
        placement: 'left',
        offset: '0, 30rem'
    };
    $('[data-toggle="tooltip"]').tooltip(options);
});

$(window).on('resize', () => {
    resizeCanvas();
});

function resizeCanvas() {
    var canvas = $('#golCanvas');
    canvas.css("height", "75%");
}

function openDesigns() {
    console.log("Opening Designs Modal")
}

function showGameEndedAlert() {
    showAlert(
        'The Game has ended after ' + generation + ' generations!',
        'Feel free to modify the grid at free will or reset it.'
    );
}

var timeout = 5;
/**
 * Show a custom alert toast
 * @param  {String} title  The title of the alert
 * @param  {String} text   The text of the alert
 * @param  {String} style  The style of the alert. Default: warning
 * @param  {Number} time   The ammount of time in seconds the alert will last
 */
function showAlert(title = null, text, style = 'warning', time = 5) {
    $('#alert').addClass('alert-'+style);
    $('#alert-title').text(title);
    $('#alert-message').text(' '+text);
    $('#alert').css('opacity', '1');
    $('#alert').css('display', 'block');

    setTimeout(() => {
        closeAlert();
    }, time * 1000);
    
}

function closeAlert() {
    $('#alert').css('opacity', '0');
    setTimeout(() => {
        $('#alert').css('display', 'none');
        $('#alert').removeClass($('#alert').css()[$('#alert').css().length - 1]);
    }, 500);
}
