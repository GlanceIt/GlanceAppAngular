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

        service.getCategoryBillboards = function() {
            return categoryBillboards;
        };

        service.getAroundYouBillboards = function() {
            return aroundYouBillboards;
        };

        service.getSpotsAround = function() {
            return spotsAround;
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