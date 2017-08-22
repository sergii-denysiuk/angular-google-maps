(function() {
    'use strict';

    angular.module('googleMapsApp', [])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {
        $scope.zoom = 20;
        $scope.center = {
            lat: 53.817680,
            lng: -1.537657,
            title: "Center"
        };
        $scope.markers = [{
            lat: 53.790123,
            lng: -1.53243,
            title: "First"
        }, {
            lat: 53.756745,
            lng: -1.5309087,
            title: "Second"
        }, {
            lat: 53.6474675,
            lng: -1.49564554,
            title: "Third"
        }, {
            lat: 53.69123456,
            lng: -1.6545466,
            title: "Fourth"
        }];
    }
})();
