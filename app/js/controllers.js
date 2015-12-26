angular.module('chatty.controllers', [])
    .controller('myCtrl', ['$scope', 'socket', function ($scope, socket){
        $scope.sendMessage = function (){
            socket.emit('message', $scope.message);
        }
    }]);