module.exports = function (io){

    io.on('connection', function (socket){
        console.log('A user joined');

        socket.on('disconnect', function (){
            console.log('User disconnected');
            socket.emit('event', 'User disconnected');
        });

        socket.on('message', function (message){
            io.sockets.emit('broadcast', message);
        });
    });

};
