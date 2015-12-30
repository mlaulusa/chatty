angular.module('chatty.controllers', [])
    .controller('ChatCtrl', ['$scope', '$http', 'socket', 'Notification', function ($scope, $http, socket, Notification){

        $scope.messages = [];

        $http.get('/api/messages').then(function (success){
            angular.forEach(success.data.data, function (value){
                this.push(value.message);
            }, $scope.messages)
        }, function (err){
            Notification.error(err);
        });

        $scope.$on('socket:broadcast', function (event, data){
            console.log('Received a %s', event.name);
            if(!data){
                console.log('Error, nothing to display');
            } else {
                Notification.info(data);

                // TODO: re-render ng-repeat instead of hacky version

                $scope.messages = [];
                $http.get('/api/messages').then(function (success){
                    angular.forEach(success.data.data, function (value){
                        this.push(value.message);
                    }, $scope.messages)
                }, function (err){
                    Notification.error(err);
                });

            }

        });

        $scope.sendMessage = function (){

            socket.emit('message', $scope.message);
            $scope.messages.push($scope.message);
            $scope.message = '';

        };

    }])
    .controller('SignInCtrl', ['$scope', '$http', function ($scope, $http){

        $scope.signIn = function (){
            return $http.post('/signin', {
                username: $scope.username,
                password: $scope.password
            }).then(function (success){
                console.log(success);
            }, function (err){
                console.log(err);
            });
        };

    }]);