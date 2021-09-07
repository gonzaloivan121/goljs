Number.prototype.map = function (min1, max1, min2, max2) { return min2 + (max2 - min2) * ((this - min1) / (max1 - min1)) }

var isMouseDown = false;

const canvas = document.querySelector('canvas');

canvas.addEventListener('mousedown', function(e) {
    isMouseDown = true;
    getCursorPosition(canvas, e);
});

canvas.addEventListener('mousemove', function(e) {
    if (!isMouseDown) return;
    getCursorPosition(canvas, e);
});

canvas.addEventListener('mouseup', function(e) {
    isMouseDown = false;
});

canvas.addEventListener('touchdown', function(e) {
    isMouseDown = true;
    getCursorPosition(canvas, e);
});

canvas.addEventListener('touchmove', function(e) {
    if (!isMouseDown) return;
    getCursorPosition(canvas, e);
});

canvas.addEventListener('touchup', function(e) {
    isMouseDown = false;
});



var s = getComputedStyle(canvas);
var w = s.width;
var h = s.height;

canvas.width = w.split('px')[0];
canvas.height = h.split('px')[0];

var designs = [];

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
    canvas.css("height", "80%");
}

function showGameEndedAlert() {
    showAlert(
        'The Game has ended after ' + generation + ' generations!',
        'Feel free to modify the grid at free will or reset it.'
    );
}

var timeout = 5;
var isAlertShowing = false;
/**
 * Show a custom alert toast
 * @param  {String} title  The title of the alert
 * @param  {String} text   The text of the alert
 * @param  {String} style  The style of the alert. Default: warning
 * @param  {Number} time   The ammount of time in seconds the alert will last
 */
function showAlert(title, text = null, style = 'warning', time = 5) {
    isAlertShowing = true;
    $('#alert').addClass('alert-'+style);
    $('#alert-title').text(title);
    $('#alert-message').text((text != null) ? ' '+text : '');
    $('#alert').css('display', 'block');
    $('#alert').css('opacity', '1');

    setTimeout(() => {
        closeAlert();
    }, time * 1000);
}

function closeAlert() {
    if (isAlertShowing) {
        $('#alert').css('opacity', '0');
        setTimeout(() => {
            $('#alert').css('display', 'none');
            var classes = $('#alert').attr("class").split(' ');
            $('#alert').removeClass(classes[classes.length-1]);
            isAlertShowing = false;
        }, 500);
    }
}

function searchSaves(string) {
    $('.card').each(function() {
        if ($(this).filter('[data-search-string *= ' + string + ']').length > 0 || string.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    $('#designModal').modal('handleUpdate');
}

var isLoadingSaves = false;

function getSavesList() {
    if (!isLoadingSaves) {
        isLoadingSaves = true;
        $.ajax({
            url: "database.php?ope=get",
            success: (data) => {
                updateSavesList(data);
                isLoadingSaves = false;
            }
        });
    }
}

function updateSavesList(data) {+
    $("#designModal .modal-dialog .modal-content .modal-body .card").remove();
    $("#designModal .modal-dialog .modal-content .modal-body br").remove();
    $('#designModal').modal('handleUpdate');

    for (var i = data.length-1; i >= 0; i--) {
        const save = data[i];
        var tmp = btoa(save.saves_json);
        var div  = '<div class="card" id="card-'+save.saves_id+'" data-id="'+save.saves_id+'">';
            div +=   '<img class="card-img-top" src="'+save.image_image+'" alt="'+save.saves_name+'" style="height: 50vh; object-fit: cover;" />';
            div +=   '<div class="card-body">';
            div +=     '<h5 class="card-title">'+save.saves_name+'</h5>';
            div +=     '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>';
            div +=     '<button type="button" class="btn btn-dark" onclick="loadGameState(\''+tmp+'\')">Load</a>';
            div +=   '</div>';
            div += '</div>';
        $("#designModal .modal-dialog .modal-content .modal-body").append(div);
    }
    $('#designModal').modal('handleUpdate');

}

function loadGameState(state) {
    resetGame(JSON.parse(atob(state)))
    $("#designModal .close").click();
}

function saveGameState() {
    $("#spinnerModal").modal('show');

    var formData = new FormData();
    formData.append("saves_name", "Test");
    formData.append("saves_json", JSON.stringify(iterationCellArray));
    formData.append("saves_tileCount", tileCount);
    formData.append("saves_ups", UPS);
    var img = canvas.toDataURL("image/png");
    formData.append("image", img);

    $.ajax({
        url: "database.php?ope=save",
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        type: 'post',
        success: (response) => {
            getSavesList();
            $("#spinnerModal").modal('hide');
            showAlert("State has been saved to Database!", null, "success");
        }
    });
}
