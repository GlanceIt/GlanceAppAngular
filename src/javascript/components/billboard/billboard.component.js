(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('billboard', {
            templateUrl: 'javascript/components/billboard/billboard.template.html',
            bindings: {
                billboard: '<'
            }
        });
}());