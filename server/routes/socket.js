var messages = require('../db/messages');

module.exports = function (io){

    io.on('connection', function (socket){
        console.log('A user joined');

        socket.on('disconnect', function (){
            console.log('User disconnected');
        });

        socket.on('message', function (message){
            var data = {
                message: message,
                date: new Date()
            };
            messages.storeMessage(data);
            socket.emit('message', data.message);
        });
    });

};

