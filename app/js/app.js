angular.module('chatty', [
        'chatty.controllers',
        'chatty.services',
        'chatty.directives',

        'btford.socket-io',
        'ui.bootstrap',
        'ui.router',
        'ui-notification',
        'ngStorage'
    ])
    .config(['$stateProvider', '$urlRouterProvider', 'NotificationProvider', function ($stateProvider, $urlRouterProvider, NotificationProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('signin', {
                url: '/',
                templateUrl: 'templates/signin.html',
                controller: 'SignInCtrl'
            })
            .state('room', {
                url: '/room',
                templateUrl: 'templates/room.html',
                controller: 'RoomCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'SignUpCtrl'
            })
            .state('chat', {
                url: '/chat',
                templateUrl: 'templates/chat.html',
                controller: 'ChatCtrl'
            });

        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        });
    }])
    .run(function (){
        // run only once as app starts
        console.log('App is running');
    });
