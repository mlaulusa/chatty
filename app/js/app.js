angular.module('chatty', [
        'chatty.controllers',
        'chatty.services',
        'chatty.directives',

        'btford.socket-io',
        'ui.router',
        'ui-notification'
    ])
    .config(['$stateProvider', '$urlRouterProvider', 'NotificationProvider', function ($stateProvider, $urlRouterProvider, NotificationProvider){
        //$urlRouterProvider.otherwise();
        //$stateProvider
        //    .state();

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
