import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect'
import 'popper.js';
import 'bootstrap';
import 'jquery-mousewheel';
import 'malihu-custom-scrollbar-plugin';
import 'select2';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');
});

$(function () {
    // Custom scrollbar
    $('.custom-scroll').mCustomScrollbar();

    // Select2
    if ($('.select-list').length) {
        $('.select-list').select2({
            placeholder: 'Select Country',
            minimumResultsForSearch: Infinity,
        });

        $('.select-list').on('select2:open', function (event) {
            $('.select2-results ul.select2-results__options').unbind('mousewheel');
            $('.select2-results').mCustomScrollbar();
        });
    }

    function readUrl(input) {
        let preview = $('#trademark_img_preview img');
        if (input.files[0].type.match(`image.*`)) {
            let reader = new FileReader();

            reader.onload = function (e) {
                preview.attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
        else {
            preview.attr('src', preview.data('error'));
        }
    }

    if ($('#trademark_form').length) {
        $('#trademark_submit').on('click', function (e) {
            $('#trademark_form').slideUp(300);
        });

        $('#trademark_input_preview').change(function () {
            readUrl(this);
        });

        $('.truncate-wrap').on('click', function () {
            $(this).toggleClass('active');
        });
    }

    if ($('#contact_form').length) {
        $('#contact_form input, #contact_form textarea').on('change', function (e) {
            $('#contact_form input[type="submit"]').attr('value', 'Send');
        });
    }

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});