'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('IndexCtrl', function ($scope, $http) {
      $http({
        method: 'GET',
        url: '/api/posts'
      }).
      success(function (data, status, headers, config) {
        $scope.posts = data.posts;
      }).
      error(function (data, status, headers, config) {
        $scope.posts = 'Error!';
      });
  }).
  controller('AddPostCtrl', function ($scope, $http, $location) {
      $scope.form = {};
      $scope.submitPost = function () {
        $http({
          method: 'POST',
          url: '/api/post',
          data: $scope.form
        }).
        success(function (data, status, headers, config) {
          $location.path('/');
        }).
        error(function (data, status, headers, config) {
          $scope.posts = 'Error!';
          $location.path('/');
        });
      };
  }).controller('ReadPostCtrl', function ($scope, $http, $location, $routeParams) {
      $http({
        method: 'GET',
        url: '/api/post/' + $routeParams.id
      }).
      success(function (data, status, headers, config) {
        $scope.post = data.post;
      }).
      error(function (data, status, headers, config) {
        $scope.posts = 'Error!';
        $location.path('/');
      });

    }).controller('EditPostCtrl', function ($scope, $http, $location, $routeParams) {
      $scope.form = {};
      $http({
        method: 'GET',
        url: '/api/post/' + $routeParams.id
      }).
      success(function (data, status, headers, config) {
        $scope.form = data.post;
      }).
      error(function (data, status, headers, config) {
        $scope.form = 'Error!';
      });

      $scope.editPost = function () {
        $http({
          method: 'PUT',
          url: '/api/post/' + $routeParams.id,
          data: $scope.form
        }).
        success(function (data, status, headers, config) {
          $location.url('/readPost/' + $routeParams.id);
        }).
        error(function (data, status, headers, config) {
          $scope.form = 'Error!';
        });
      };
    }).controller('DeletePostCtrl', function ($scope, $http, $location, $routeParams) {
      $scope.form = {};
      $http({
        method: 'GET',
        url: '/api/post/' + $routeParams.id
      }).
      success(function (data, status, headers, config) {
        $scope.post = data.post;
      }).
      error(function (data, status, headers, config) {
        $scope.post = 'Error!';
      });
      $scope.deletePost = function () {
        $http({
          method: 'DELETE',
          url: '/api/post/' + $routeParams.id
        }).
        success(function (data, status, headers, config) {
          $location.url('/');
        }).
        error(function (data, status, headers, config) {
          $scope.post = 'Error!';
        });
      };

      $scope.home = function() {
        $location.url('/');
      };
    });
