(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('glanceBlock', {
            templateUrl: 'javascript/components/glance-block/glance-block.template.html',
            bindings: {
                spot: '<'
            }
        });
}());