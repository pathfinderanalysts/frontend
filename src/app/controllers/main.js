'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
    .controller('MainCtrl', function ($scope, $uibModal) {
        $scope.date = new Date();
        $scope.contactUsModal = function () {
            $uibModal.open({
                templateUrl: 'views/main/modals/contactUsModal.html',
                controller: 'ModalInstanceCtrl'
            });
        };
        $scope.signUpModal = function () {
            $uibModal.open({
                templateUrl: 'views/main/modals/signUpModal.html',
                controller: 'ModalInstanceCtrl'
            });
        };
        $scope.notifiedSubmit = function () {
            console.log($scope.notifiedForm);
        };
    }).controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
        $scope.close = function () {
            $uibModalInstance.close();
        };
        $scope.contactUsSubmit = function () {
            console.log($scope.contactForm);
        };
        $scope.signUpSubmit = function () {
            console.log($scope.signUpForm);
        };
    });
