angular.module('chatty.controllers', [])
    .controller('ChatCtrl', ['$scope', '$http', '$log', '$localStorage', 'socket', 'Notification', 'MessageFactory', function ($scope, $http, $log, $localStorage, socket, Notification, MessageFactory){

        $scope.$storage = $localStorage;

        $scope.messages = [];

        //TODO: Fix factory then calls
        MessageFactory.getAll().then(function (success){
            angular.forEach(success, function (value){
                if(value){
                    $log.info(value);
                    this.push(value.message);
                }
            }, $scope.messages)
        }, function (err){
            $log.error(err);
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

            //TODO: Fix factory then calls
            MessageFactory.saveMessage({
                message: {
                    message: $scope.message,
                    username: $scope.$storage.username,
                    room: 'default',
                    date: new Date()
                }
            }).then(function (data){
                if(data.status != '401'){
                    $log.info(data);
                    socket.emit('message', $scope.message);
                    $scope.message = '';
                } else {
                    Notification.error('No room was selected');
                }
            });

        };

    }])
    .controller('SignInCtrl', ['$scope', '$http', '$log', '$localStorage', 'UserFactory', function ($scope, $http, $log, $localStorage, UserFactory){

        $scope.$storage = $localStorage;

        $scope.signIn = function (){
            UserFactory.signIn({user: $scope.user}).then(function (success){

                //TODO: There is no error/success function call.  The factory service must pass a successful/error message to be parsed here and figure out what to do at that point, as the success call is called every time whether or not an error occurred.  This should be done in all of the factory calls in the controller

                $log.info(success);
                $log.info(new Date(success.created_on).toString());
                $scope.$storage.username = success.username;
            }, function (err){
                $log.info('An error');
                $log.error(err);
            });
        };

    }])
    .controller('SignUpCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){

        //TODO: Fix factory then calls
        $scope.signUp = function (){
            return $http.post('/api/user', {user: $scope.user}).then(function (success){
                $log.info(success);
            }, function (err){
                $log.info(err);
            });
        }
    }])
    .controller('RoomCtrl', ['$scope', '$log', 'RoomFactory', function ($scope, $log, RoomFactory){

        $scope.addRoom = function (){
            RoomFactory.createRoom({
                room: $scope.room,
                created_on: new Date(),
                password: $scope.password ? $scope.password : null
            }).then(function (data){
                $log.info(data);
            });
        };
    }]);
