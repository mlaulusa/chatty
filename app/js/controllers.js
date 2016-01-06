angular.module('chatty.controllers', [])
    .controller('ChatCtrl', ['$scope', '$http', '$log', '$localStorage', 'socket', 'Notification', 'MessageFactory', 'RoomFactory', function ($scope, $http, $log, $localStorage, socket, Notification, MessageFactory, RoomFactory){

        $scope.$storage = $localStorage.$default({room: 'default'});

        $scope.messages = [];
        $scope.rooms = [];

        //RoomFactory.getAll().then(data => angular.forEach(data, room => this.push(room), $scope.rooms));
        RoomFactory.getAll().then(function(data){
          angular.forEach(data, function(room){
            this.push(room);
          }, $scope.rooms);
        });

        //MessageFactory.getAll().then((data) => angular.forEach(data, (message) => this.push(message), $scope.messages));
        MessageFactory.getAll().then(function(messages){
          angular.forEach(messages, function(message){
            this.push(message.message);
          }, $scope.messages);
        });

        $scope.selectRoom = room => {
          $scope.$storage.room = room;
        };

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
            MessageFactory.saveMessage({

                message: {
                    message: $scope.message,
                    username: $scope.$storage.username || null,
                    room: $scope.$storage.room || null,
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
            UserFactory.signIn({user: $scope.user}).then(function (data){

                $log.info(data);
                $log.info(new Date(data.created_on).toString());
                $scope.$storage.username = data.username;

            });
        };
    }])

    .controller('SignUpCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){

        $scope.signUp = function (){
            return $http.post('/api/user', {user: $scope.user}).then(function (data){
                $log.info(data);
            });
        }
    }])

    .controller('RoomCtrl', ['$scope', '$log', '$localStorage', 'RoomFactory', function ($scope, $log, $localStorage, RoomFactory){

        $scope.$storage = $localStorage;

        $scope.addRoom = function (){
            RoomFactory.createRoom({

                room: {
                    room: $scope.room,
                    created_on: new Date(),
                    password: $scope.password || null,
                    created_by: $scope.$storage.username
                }

            }).then(function (data){
                $log.info(data);
            });
        };
    }]);
