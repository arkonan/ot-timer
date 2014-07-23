$(document).ready(function () {
    var interval = null,
        r, p, s;

    $('#pmax').on('change', function (ev) {
        if ($('#pmax').val() > 1) {
            $('.helper').removeClass('one-position');
        } else {
            $('.helper').addClass('one-position');
        }
    }).trigger('change');

    $('#pmax, #smax').on('click', function (ev) {
        $(this).select();
        this.setSelectionRange(0, 10);
    });

    $('.next, .status').on('click', function (ev) {
        if (!$('.status').hasClass('running')) {
            $('.status').addClass('running');

            if ($('#pmax').val() > 1) {
                if (r < 1) {
                    r = 1;
                }
                p++;
                if (p > $('#pmax').val()) {
                    r++;
                    p = 1;
                }
                $('.p').html(p);
            } else {
                r++;
            }
            s = 0;

            $('.r').html(r);
            $('.s').html(s);

            interval = setInterval(function () {
                s++;
                $('.s').html(s);
                if (s >= $('#smax').val()) {
                    clearInterval(interval);
                    interval = null;
                    $('.status').removeClass('running');
                }
            }, 1000);
        }
    });

    $('.reset').on('click', function (ev) {
        if (interval !== null) {
            clearInterval(interval);
            interval = null;
        }
        r = p = s = 0;

        $('.r, .p, .s').html('&ndash;');
        $('.status').removeClass('running');
    }).trigger('click');

    $('.next, .reset, .status').on('touchmove', function () {
        return false;
    });

    $('html').on('keydown', function (ev) {
        switch (ev.which) {
            case 78:
            case 32:
                $('.next').trigger('click');
                break;

            case 82:
            case 8:
            case 46:
                $('.reset').trigger('click');
                break;
        }
    });
});
