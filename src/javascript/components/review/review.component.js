(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('review', {
            templateUrl: 'javascript/components/review/review.template.html',
            bindings: {
                title: '<',
                rating: '<',
                size: '@?'
            }
        });
}());