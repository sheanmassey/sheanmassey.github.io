angular
    .module('app', [
        'ui.router',
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/templates/home.html',
                controller: 'homeCtrl'
            })
    }]);
