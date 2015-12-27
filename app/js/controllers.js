angular.module('chatty.controllers', [])
    .controller('myCtrl', ['$scope', 'socket', '$http', function ($scope, socket, $http){
        $scope.sendMessage = function (){
            socket.emit('message', $scope.message);

            $http.post('/message', {message: $scope.message}).then(function (success){
                console.log(success);
            }, function (err){
                console.log(err);
            });

        };
    }]);