angular.module('chatty', [
        'chatty.controllers',
        'chatty.services',
        'chatty.directives',

        'btford.socket-io',
        'ui.bootstrap',
        'ui.router',
        'ui-notification'
    ])
    .config(['$stateProvider', '$urlRouterProvider', 'NotificationProvider', function ($stateProvider, $urlRouterProvider, NotificationProvider){
        $urlRouterProvider.otherwise('/chat');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: '',
                controller: ''
            })
            .state('main.chat', {
                url: 'chat',
                templateUrl: 'templates/chat.html',
                controller: 'myCtrl'
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
