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