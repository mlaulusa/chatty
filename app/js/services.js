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
                return $http.get(('/api/messages/user/$username').replace('$username', username)).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            getByID: function (id){
                return $http.get(('/api/message/$id').replace('$id', id)).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            getByRoom: function (room){
                return $http.get(('/api/$room/messages').replace('$room', room)).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            saveMessage: function (message){
                return $http.post('/api/message', message).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            }
        }
    }])

    .factory('UserFactory', ['$http', '$log', function ($http, $log){
        return {
            signIn: function (user){
                return $http.post('/signin', user).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            }
        }
    }])

    .factory('RoomFactory', ['$http', '$log', function ($http, $log){
        return {

            getAll: function (){
                return $http.get('/api/rooms').then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            getByRoom: function (room){
                return $http.get(('/api/room/$room').replace('$room', room)).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            getByID: function (id){
                return $http.get(('/api/room/id/$id').replace('$id', id)).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            createRoom: function (room){
                return $http.post('/api/room', room).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            updatePasswordByID: function (id, password){
                return $http.put(('/api/room/id/$id').replace('$id', id), password).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            updatePasswordByRoom: function (room, password){
                return $http.put(('/api/room/$room').replace('$room', room), password).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            deleteByID: function (id){
                return $http.delete(('/api/room/id/$id').replace('$id', id)).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            },

            deleteByRoom: function (room){
                return $http.delete(('/api/room/$room').replace('$room', room)).then(function (success){
                    return success.data;
                }, function (err){
                    return err;
                })
            }
        }
    }]);
