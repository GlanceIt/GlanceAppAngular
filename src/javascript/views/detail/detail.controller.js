(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['spotDetails'];
    function DetailController(spotDetails) {
        var self = this;
        self.spot = spotDetails.data.result;

        self.backgroundImage = 'images/hangout.jpeg';
    }

}());