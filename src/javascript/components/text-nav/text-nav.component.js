(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('textNav', {
            templateUrl: 'javascript/components/text-nav/text-nav.template.html',
            bindings: {
                text: '@',
                destination: '@'
            }
        });
}());