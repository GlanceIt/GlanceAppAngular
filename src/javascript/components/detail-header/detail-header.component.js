(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('detailHeader', {
            templateUrl: 'javascript/components/detail-header/detail-header.template.html',
            bindings: {
                backgroundImage: '<',
                spot: '<'
            },
            transclude: true
        });
}());