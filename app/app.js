angular
    .module('app', [
        'ui.router',
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/app/templates/home.html',
                controller: 'homeCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/app/templates/about.html',
                controller: ['$scope', function($scope){
                    $scope.title = 'THIS IS THE ABOUT PAGE';
                }]
            })
            .state('article', {
                url: '/article',
                templateUrl: '/app/templates/article.html',
            })
    }]);

