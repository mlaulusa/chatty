angular.module('chatty.controllers', [])
    .controller('ChatCtrl', ['$scope', '$http', '$log', 'socket', 'Notification', function ($scope, $http, $log, socket, Notification){

        $scope.messages = [];

        $http.get('/api/messages').then(function (success){
            angular.forEach(success.data.data, function (value){
                this.push(value.message);
            }, $scope.messages)
        }, function (err){
            Notification.error(err);
        });

        $scope.$on('socket:broadcast', function (event, data){
            $log.info('Received a %s', event.name);
            if(!data){
                $log.info('Error, nothing to display');
            } else {
                Notification.info(data);
                $scope.messages.push(data);
            }

        });

        $scope.sendMessage = function (){

            socket.emit('message', $scope.message);
            $scope.message = '';

        };

    }])
    .controller('SignInCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){

        $scope.signIn = function (){
            return $http.post('/signin', {
                username: $scope.username,
                password: $scope.password
            }).then(function (success){
                $log.info(success);
            }, function (err){
                $log.info(err);
            });
        };

    }]);
