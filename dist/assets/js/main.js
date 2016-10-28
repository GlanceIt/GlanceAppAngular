(function() {
    'use strict';

    angular.module('Spinner', []);

    angular
        .module('Spinner')
        .config(function () {
            console.log("Spinner config fired.");
        })
        .run(function () {
            console.log("Spinner run fired.");
        });
}());
(function() {
    'use strict';

    angular.module('data', []);
}());
(function() {
    'use strict';

    angular
        .module('GlanceApp', ['data', 'ui.router', 'Spinner']);
}());
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

            .state('spotDetails', {
                url: '/spots/{spotId}',
                templateUrl: 'javascript/views/spot-details/spot-details.template.html',
                controller: 'SpotDetailController as spotDetail',
                resolve: {
                    spotDetails: ['$stateParams', 'GlanceDataService', function($stateParams, GlanceDataService) {
                        return GlanceDataService.getSpotDetails($stateParams.spotId);
                    }]
                }
            });
    }
}());
(function() {
    'use strict';

    angular
        .module('data')
        .service('GlanceDataService', GlanceDataService)
        .constant('ApiBasePath', 'http://ec2-52-41-215-9.us-west-2.compute.amazonaws.com:5000');

    GlanceDataService.$inject = ['$http', 'ApiBasePath'];
    function GlanceDataService($http, ApiBasePath) {
        var service = this,
            spotTypes = {
                'Coffee': {
                    weights: {
                        'coffee': 100
                    }
                },
                'Study': {
                    weights: {
                        'wifi': 10,
                        'seating': 100,
                        'parkig': 2
                    }
                },
                'Hangout': {
                    weights: {
                        'seating': 100,
                        'parking': 10
                    }
                },
                'Dating': {
                    weights: {
                        'staff': 10,
                        'seating': 100
                    }
                },
                'Work': {
                    weights: {
                        'seating': 100,
                        'parking': 10
                    }
                },
            },
            categoryBillboards = [{
                type: 'Coffee',
                image: 'images/coffee.jpeg',
                description: 'Good coffee, good seating!'
            }, {
                type: 'Dating',
                image: 'images/dating.jpeg',
                description: 'Good ambience, good service!'
            }, {
                type: 'Hangout',
                image: 'images/hangout.jpeg',
                description: 'Good seating, good ambience!'
            }, {
                type: 'Study',
                image: 'images/study.jpeg',
                description: 'Good seating, good wifi!'
            }, {
                type: 'Work',
                image: 'images/work.jpeg',
                description: 'Good seating, good ambience!'
            }],
            aroundYouBillboards = [{
                type: 'Irvine',
                image: 'images/coffee.jpeg',
                description: 'Good coffee, good seating!'
            }, {
                type: 'Tustin',
                image: 'images/dating.jpeg',
                description: 'Good ambience, good service!'
            }, {
                type: 'Orange',
                image: 'images/hangout.jpeg',
                description: 'Good seating, good ambience!'
            }, {
                type: 'Newport',
                image: 'images/study.jpeg',
                description: 'Good seating, good wifi!'
            }, {
                type: 'Anaheim',
                image: 'images/work.jpeg',
                description: 'Good seating, good ambience!'
            }],
            spotsAround = [{
                'index': 'Peets-Irvine-1',
                'name': 'Peets',
                'overall': {
                    'rating': 4.5,
                    'count': 2
                },
                'aspects': {
                    'wifi': {
                        'rating': 3.5,
                        'count': 2
                    },
                    'staff': {
                        'rating': 3.5,
                        'count': 2
                    },
                    'coffee': {
                        'rating': 3.5,
                        'count': 2
                    },
                    'seating': {
                        'rating': 3,
                        'count': 2
                    },
                    'parking': {
                        'rating': 3.5,
                        'count': 2
                    }
                }
            },{
                'name': 'Starbucks',
                'index': 'Starbucks-Irvine-2',
                'overall': {
                    'rating': 2.5,
                    'count': 149
                },
                'aspects': {
                    'wifi': {
                        'rating': 1,
                        'count': 80
                    },
                    'staff': {
                        'rating': 4,
                        'count': 96
                    },
                    'coffee': {
                        'rating': 3,
                        'count': 102
                    },
                    'seating': {
                        'rating': 3.5,
                        'count': 136
                    },
                    'parking': {
                        'rating': 3.5,
                        'count': 109
                    }
                }
            },{
                'name': 'Starbucks',
                'index': 'Starbucks-Irvine-1',
                'overall': {
                    'rating': 3,
                    'count': 206
                },
                'aspects': {
                    'wifi': {
                        'rating': 3,
                        'count': 150
                    },
                    'staff': {
                        'rating': 3,
                        'count': 155
                    },
                    'coffee': {
                        'rating': 3,
                        'count': 140
                    },
                    'seating': {
                        'rating': 2.5,
                        'count': 180
                    },
                    'parking': {
                        'rating': 3,
                        'count': 105
                    }
                }
            }];

        service.search = function(spotType) {
            var response = $http({
                method: 'POST',
                url: ApiBasePath + '/search',
                params: {
                    weights: spotTypes[spotType].weights,
                    numOfResults: 5
                }
            });

            return response;
        };

        service.getSpotDetails = function(spotId) {
            var response = $http({
                method: 'GET',
                url: ApiBasePath + '/spots/' + spotId
            });

            return response;
        };

        // service.getSpots = function() {
        //     var response = $http({
        //         method: 'POST',
        //         url: ApiBasePath + '/spots',
        //         params: {
        //             weights: weighObj,
        //             location: '',
        //             numOfResults: 5
        //         }
        //     });

        //     return response;
        // };
    }

}());
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
(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('navbar', {
            templateUrl: 'javascript/components/navbar/navbar.template.html'
        });
}());
(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('review', {
            templateUrl: 'javascript/components/review/review.template.html',
            bindings: {
                title: '<',
                rating: '<',
                size: '@?'
            }
        });
}());
(function() {
    'use strict';

    angular
        .module('Spinner')
        .component('loadingSpinner', {
            templateUrl: 'javascript/components/spinner/spinner.template.html',
            controller: SpinnerController
        });

    SpinnerController.$inject = ['$rootScope'];
    function SpinnerController($rootScope) {
        var $ctrl = this,
            cancellers = [];

        $ctrl.$onInit = function() {
            var cancel = $rootScope.$on('$stateChangeStart',
                            function(event, toState, toParams, fromState, fromParams, options) {
                                $ctrl.showSpinner = true;
                        });

            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess',
                        function(event, toState, toParams, fromState, fromParams) {
                            $ctrl.showSpinner = false;
                    });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeError',
                        function(event, toState, toParams, fromState, fromParams, error) {
                            $ctrl.showSpinner = false;
                    });
            cancellers.push(cancel);

            cancel = $rootScope.$on('glance:loading', function(event, data) {
                $ctrl.showSpinner = data.on;
            });
            cancellers.push(cancel);
        };

        $ctrl.$onDestroy = function() {
            cancellers.forEach(function(canceller) {
                canceller();
            });
        };
    }

}());
(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('starRating', {
            templateUrl: 'javascript/components/star-rating/star-rating.template.html',
            bindings: {
                rating: '<',
                onRatingSelect: '&?',
                readonly: '=?',
                size: '@?'
            },
            controller: StarRatingController
        });

    StarRatingController.$inject = [];
    function StarRatingController() {
        var self = this;

        self.readonly || (self.readonly = true);
        self.max = 5;
        self.rating = parseFloat(parseFloat(self.rating).toFixed(1));

        self.fullStarCount = _calculateFullStarCount(self.rating);
        self.hasHalfStar = _hasHalfStar(self.rating);

        self.toggle = function(index) {
            if (!self.readonly) {
                self.ratingValue = index + 1;
                self.onRatingSelect({
                    rating: self.rating
                })
            }
        };

        self._populateStars = function() {
            var i,
                stars = [],
                hasHalfStar = self.hasHalfStar,
                filled = false,
                isHalf = false;

            for (i = 0; i < self.max; i++) {

                if (i < self.fullStarCount) {
                    filled = true;
                    isHalf = false;
                } else if (hasHalfStar) {
                    filled = false;
                    isHalf = true;
                    hasHalfStar = false;
                } else {
                    filled = false;
                    isHalf = false;
                }

                stars.push({
                    filled: filled,
                    isHalfStar: isHalf
                });
            }

            self.stars = stars;

        }

        self._populateStars();

        function _calculateFullStarCount(rating) {
            return Math.floor(Math.round(parseFloat(rating) * 2) / 2);
        }

        function _hasHalfStar(rating) {
            var hasHalfStar = false,
                decimalPoint = rating % 1;

            if (decimalPoint >= 0.3 && decimalPoint <= 0.7) {
                hasHalfStar = true;
            }

            return hasHalfStar;
        }
    }
}());
(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('swiper', {
            templateUrl: 'javascript/components/swiper/swiper.template.html',
            bindings: {
                title: '@?'
            },
            controller: SwiperController,
            transclude: true
        });

    SwiperController.$inject = ['$rootScope', '$element', '$timeout'];
    function SwiperController($rootScope, $element, $timeout) {
        var $ctrl = this,
            isPeek = $element.hasClass('swiper-peek'),
            pagination = '.swiper-pagination',
            swiperOptions = {};

        $ctrl.uuid = generateUUID();
        $element.addClass($ctrl.uuid);

        pagination = '.' + $ctrl.uuid + ' .swiper-pagination';

        swiperOptions = {
            slidesPerView: 1.3, //1.2
            centeredSlides: isPeek,
            spaceBetween: 10,
            loop: isPeek
        };

        if (isPeek) {
            swiperOptions.pagination = pagination;
            swiperOptions.paginationClickable = true;
        }

        $timeout(function() {
            $ctrl.swiperInstance = new Swiper('.' + $ctrl.uuid + ' .swiper-container', swiperOptions);
        });

        function generateUUID() {
            var d = new Date().getTime(),
                uuid = 'axxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            return uuid;
        }
    }
}());
(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .component('textNav', {
            templateUrl: 'javascript/components/text-nav/text-nav.template.html',
            bindings: {
                text: '@',
                destination: '@'
            }
        });
}());
(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['GlanceDataService'];
    function HomeController(GlanceDataService) {
        var self = this,
            // categoryBillboards = [{
            //     type: 'Coffee',
            //     image: 'images/coffee.jpeg',
            //     description: 'Good coffee, good seating!'
            // }, {
            //     type: 'Dating',
            //     image: 'images/dating.jpeg',
            //     description: 'Good ambience, good service!'
            // }, {
            //     type: 'Hangout',
            //     image: 'images/hangout.jpeg',
            //     description: 'Good seating, good ambience!'
            // }, {
            //     type: 'Study',
            //     image: 'images/study.jpeg',
            //     description: 'Good seating, good wifi!'
            // }, {
            //     type: 'Work',
            //     image: 'images/work.jpeg',
            //     description: 'Good seating, good ambience!'
            // }],
            // aroundYouBillboards = [{
            //     type: 'Irvine',
            //     image: 'images/coffee.jpeg',
            //     description: 'Good coffee, good seating!'
            // }, {
            //     type: 'Tustin',
            //     image: 'images/dating.jpeg',
            //     description: 'Good ambience, good service!'
            // }, {
            //     type: 'Orange',
            //     image: 'images/hangout.jpeg',
            //     description: 'Good seating, good ambience!'
            // }, {
            //     type: 'Newport',
            //     image: 'images/study.jpeg',
            //     description: 'Good seating, good wifi!'
            // }, {
            //     type: 'Anaheim',
            //     image: 'images/work.jpeg',
            //     description: 'Good seating, good ambience!'
            // }],
            // spotsAround = [{
            //     'index': 'Peets-Irvine-1',
            //     'name': 'Peets',
            //     'overall': {
            //         'rating': 4.5,
            //         'count': 2
            //     },
            //     'aspects': {
            //         'wifi': {
            //             'rating': 3.5,
            //             'count': 2
            //         },
            //         'staff': {
            //             'rating': 3.5,
            //             'count': 2
            //         },
            //         'coffee': {
            //             'rating': 3.5,
            //             'count': 2
            //         },
            //         'seating': {
            //             'rating': 3,
            //             'count': 2
            //         },
            //         'parking': {
            //             'rating': 3.5,
            //             'count': 2
            //         }
            //     }
            // },{
            //     'name': 'Starbucks',
            //     'index': 'Starbucks-Irvine-2',
            //     'overall': {
            //         'rating': 2.5,
            //         'count': 149
            //     },
            //     'aspects': {
            //         'wifi': {
            //             'rating': 1,
            //             'count': 80
            //         },
            //         'staff': {
            //             'rating': 4,
            //             'count': 96
            //         },
            //         'coffee': {
            //             'rating': 3,
            //             'count': 102
            //         },
            //         'seating': {
            //             'rating': 3.5,
            //             'count': 136
            //         },
            //         'parking': {
            //             'rating': 3.5,
            //             'count': 109
            //         }
            //     }
            // },{
            //     'name': 'Starbucks',
            //     'index': 'Starbucks-Irvine-1',
            //     'overall': {
            //         'rating': 3,
            //         'count': 206
            //     },
            //     'aspects': {
            //         'wifi': {
            //             'rating': 3,
            //             'count': 150
            //         },
            //         'staff': {
            //             'rating': 3,
            //             'count': 155
            //         },
            //         'coffee': {
            //             'rating': 3,
            //             'count': 140
            //         },
            //         'seating': {
            //             'rating': 2.5,
            //             'count': 180
            //         },
            //         'parking': {
            //             'rating': 3,
            //             'count': 105
            //         }
            //     }
            // }];

        self.categoryTitle = 'Find your style';
        self.categoryBillboards = categoryBillboards;

        self.aroundYouTitle = 'Cities Around You';
        self.aroundYouBillboards = aroundYouBillboards;

        self.spotsAroundTitle = 'Spots Around You';
        self.spotsAround = spotsAround;
    }

}());
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
(function() {
    'use strict';

    angular
        .module('GlanceApp')
        .controller('SpotDetailController', SpotDetailController);

    SpotDetailController.$inject = ['spotDetails'];
    function SpotDetailController(spotDetails) {
        var self = this;
        self.spot = spotDetails.data.result;

        self.backgroundImage = 'images/hangout.jpeg';
    }

}());