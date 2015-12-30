angular.module('chatty.services', [])
    .factory('socket', ['socketFactory', function (socketFactory){
        var socket = socketFactory({
            ioSocket: io.connect('localhost:8888/')
        });
        socket.forward('broadcast');
        return socket;
    }]);
