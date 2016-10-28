(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .controller('HomeController', HomeController);

    // HomeController.$inject = ['categoryBillboards', 'GlanceDataService'];
    // function HomeController(categoryBillboards, GlanceDataService) {
    HomeController.$inject = ['GlanceDataService'];
    function HomeController(GlanceDataService) {
        var self = this;

        self.categoryTitle = 'Find your style';
        self.categoryBillboards = GlanceDataService.getCategoryBillboards();
        // self.categoryBillboards = categoryBillboards;

        self.aroundYouTitle = 'Cities Around You';
        self.aroundYouBillboards = GlanceDataService.getAroundYouBillboards();

        self.spotsAroundTitle = 'Spots Around You';
        self.spotsAround = GlanceDataService.getSpotsAround();
    }

}());