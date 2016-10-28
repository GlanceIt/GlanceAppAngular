(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['spotSearch'];
    function SearchController(spotSearch) {
        var self = this;
        self.results = spotSearch.data.spots;
    }

}());