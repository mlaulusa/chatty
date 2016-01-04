angular.module('chatty.services', [])
    .factory('socket', ['socketFactory', function (socketFactory){
        var socket = socketFactory();
        socket.forward('broadcast');
        return socket;
    }])
    .factory('MessageFactory', ['$http', function ($http){

        return {

            getAll: function (){
                return $http.get('/api/messages').then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            getByUsername: function (username){
                return $http.get('/api/messages/user/%s', username).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            getByID: function (id){
                return $http.get('/api/message/%s', id).then(function(success){
                    return success.data;
                }, function(err){
                    return err;
                })
            },

            getByRoom: function (room){
                return $http.get('/api/%s/messages', room).then(function(success){
                    return success.data;
                }, function(err){
                    return err;
                })
            },

            saveMessage: function(message){
                return $http.post('/api/message', message).then(function(success){
                    return success.data;
                }, function(err){
                    return err;
                })
            }
        }
    }])

    .factory('UserFactory', ['$http', '$log', function($http, $log){
        return {
            signIn: function(user){
                return $http.post('/signin', user).then(function(success){
                    return success.data;
                }, function(err){
                    return err;
                })
            }
        }
    }]);
