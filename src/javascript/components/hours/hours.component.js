(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('hours', {
            templateUrl: 'javascript/components/hours/hours.template.html',
            bindings: {
                hours: '<'
            }
        });
}());