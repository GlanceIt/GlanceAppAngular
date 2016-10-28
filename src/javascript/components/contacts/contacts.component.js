(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('contacts', {
            templateUrl: 'javascript/components/contacts/contacts.template.html',
            bindings: {
                contacts: '<'
            }
        });
}());