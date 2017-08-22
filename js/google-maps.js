(function() {
    'use strict';

    angular.module('googleMapsApp')
        .constant('googleMapsConst', {
            apiKey: 'AIzaSyAMDb4WXBKPP8LOKgEtn4ckhV6m9IuLOlM',
            defaultZoom: 12
        })
        .service('googleMapsSrvc', googleMapsSrvc)
        .directive('googleMaps', googleMaps);

    googleMapsSrvc.$inject = ['$window', '$q', 'googleMapsConst'];

    function googleMapsSrvc($window, $q, googleMapsConst) {
        var loadExecuted = false;
        var deferred = $q.defer();

        function load() {
            if (loadExecuted) {
                return deferred.promise;
            }

            loadExecuted = true;

            /* script loaded callback, send resolve */
            $window.initMap = initMap;

            /* load Google maps API */
            loadScript();

            function initMap() {
                deferred.resolve();
            }

            function loadScript() {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = '//maps.googleapis.com/maps/api/js' +
                    '?key=' + googleMapsConst.apiKey +
                    '&callback=' + 'initMap';
                script.setAttribute("async", "");
                script.setAttribute("defer", "");

                document.body.appendChild(script);
            }

            return deferred.promise;
        }

        return {
            load: load
        };
    }

    googleMaps.$inject = ['googleMapsSrvc'];

    function googleMaps(googleMapsSrvc) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                zoom: '=?',
                center: '=',
                markers: '=?'
            },
            templateUrl: 'html/google-maps.html',
            link: function(scope, elem, attrs) {
                scope.zoom = scope.zoom || googleMapsConst.defaultZoom;

                googleMapsSrvc.load().then(function() {
                    activate();
                });

                function activate() {
                    var centerPostion = new google.maps.LatLng(
                        scope.center.lat, scope.center.lng);

                    var map = new google.maps.Map(elem[0], {
                        zoom: scope.zoom,
                        center: centerPostion
                    });

                    new google.maps.Marker({
                        map: map,
                        position: centerPostion,
                        title: scope.center.title
                    });

                    if (scope.markers) {
                        activateMarkers(map);
                    }
                }

                function activateMarkers(map) {
                    for (var i = 0; i < scope.markers.length; ++i) {
                        new google.maps.Marker({
                            map: map,
                            position: new google.maps.LatLng(
                                scope.markers[i].lat, scope.markers[i].lng),
                            title: scope.markers[i].title
                        });
                    }
                }
            }
        };
    }
})();
