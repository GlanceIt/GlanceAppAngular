(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('swiper', {
            templateUrl: 'javascript/components/swiper/swiper.template.html',
            bindings: {
                title: '@?'
            },
            controller: SwiperController,
            transclude: true
        });

    SwiperController.$inject = ['$rootScope', '$element', '$timeout'];
    function SwiperController($rootScope, $element, $timeout) {
        var $ctrl = this,
            isPeek = $element.hasClass('swiper-peek'),
            pagination = '.swiper-pagination',
            swiperOptions = {};

        $ctrl.uuid = generateUUID();
        $element.addClass($ctrl.uuid);

        pagination = '.' + $ctrl.uuid + ' .swiper-pagination';

        swiperOptions = {
            slidesPerView: 1.3, //1.2
            centeredSlides: isPeek,
            spaceBetween: 10,
            loop: isPeek
        };

        if (isPeek) {
            swiperOptions.pagination = pagination;
            swiperOptions.paginationClickable = true;
        }

        $timeout(function() {
            $ctrl.swiperInstance = new Swiper('.' + $ctrl.uuid + ' .swiper-container', swiperOptions);
        });

        function generateUUID() {
            var d = new Date().getTime(),
                uuid = 'axxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            return uuid;
        }
    }
}());