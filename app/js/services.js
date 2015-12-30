angular.module('chatty.services', [])
    .factory('socket', ['socketFactory', function (socketFactory){
        var socket = socketFactory();
        socket.forward('broadcast');
        return socket;
    }]);
