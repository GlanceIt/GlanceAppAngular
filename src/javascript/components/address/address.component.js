(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('addressBlock', {
            templateUrl: 'javascript/components/address/address.template.html',
            bindings: {
                address: '<',
                location: '<'
            }
            // Attach a controller to load background map based on location coordinates
        });
}());