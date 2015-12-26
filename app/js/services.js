angular.module('chatty.services', [])
    .factory('socket', ['socketFactory', function (socketFactory){
        return socketFactory();
    }]);
