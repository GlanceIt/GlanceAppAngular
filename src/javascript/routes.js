(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // Set up UI states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'javascript/views/home/home.template.html',
                controller: 'HomeController as home'
                // resolve: {
                //     categoryBillboards: ['GlanceDataService', function(GlanceDataService) {
                //         return GlanceDataService.getCategoryBillboards();
                //     }]
                // }
            })

            .state('search', {
                url: '/search/{spotType}',
                templateUrl: 'javascript/views/search/search.template.html',
                controller: 'SearchController as search',
                resolve: {
                    spotSearch: ['$stateParams', 'GlanceDataService', function($stateParams, GlanceDataService) {
                        return GlanceDataService.search($stateParams.spotType);
                    }]
                }
            })

            .state('detail', {
                // abstract: true,
                url: '/spots/{spotId}',
                templateUrl: 'javascript/views/detail/detail.template.html',
                controller: 'DetailController as spotDetail',
                resolve: {
                    spotDetails: ['$stateParams', 'GlanceDataService', function($stateParams, GlanceDataService) {
                        return GlanceDataService.getSpotDetails($stateParams.spotId);
                    }]
                }
            });

            // .state('detail.reviews', {
            //     // url: '/spots/{spotId}/reviews',
            //     templateUrl: 'javascript/views/detail/reviews/reviews.template.html',
            // })

            // .state('detail.details', {
            //     // url: '',
            //     templateUrl: 'javascript/views/detail/details/details.template.html',
            // })

            // .state('detail.photos', {
            //     // url: '',
            //     templateUrl: 'javascript/views/detail/photos/photos.template.html',
            // });
    }
}());