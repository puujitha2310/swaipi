var energy = angular.module('starWars', ['xyz.angular.swapi']);
energy.controller('starwarsController', ['$scope', 'swapiService', '$http', function ($scope, swapiService, $http) {
        $scope.films = {};
        $scope.getInitList = function () {
            swapiService.people().then(function (lukeData) {
                if (lukeData && lukeData.results) {
                    $scope.peoples = lukeData.results;
                }
                console.log($scope.peoples);
            });
            swapiService.films().then(function (lukeData) {
                if (lukeData && lukeData.results) {
                    $scope.films = lukeData.results;
                }
            });
        };
        $scope.getFilmList = function () {
            $scope.films = [];
            $scope.eFilm = "";
            $scope.showLoader = true;
            angular.forEach($scope.peoples[$scope.ePeople].films, function (value, key) {
                $http.get(value).then(function (flm) {
                    $scope.films.push(flm.data);
                });
                $scope.showLoader = false;
            });
        };
        $scope.getFilmDetail = function () {
            $scope.showLoader = true;
            $http.get($scope.eFilm).then(function (flm) {
                console.log(flm);
                $scope.singleFilm=flm.data;
                $scope.showLoader = false;
            });
            

        };


        angular.element(document).ready(function () {


        });
    }]);