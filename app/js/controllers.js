angular.module('chatty.controllers', [])
    .controller('ChatCtrl', ['$scope', 'socket', 'Notification', function ($scope, socket, Notification){

        $scope.messages = [];

        socket.on('message', function(data){
            $scope.messages.push(data);
            Notification.success(data);
            $scope.$apply();
        });

        $scope.sendMessage = function (){

            socket.emit('message', $scope.message);
            $scope.message = '';

        };

    }])
    .controller('SignInCtrl', ['$scope', '$http', function ($scope, $http){

        $scope.signIn = function(){
            return $http.post('/signin', {username: $scope.username, password: $scope.password}).then(function(success){
                console.log(success);
            }, function(err){
                console.log(err);
            });
        };

    }]);