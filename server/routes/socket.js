module.exports = function (io){

    io.on('connection', function (socket){
        console.log('A user joined');

        socket.on('disconnect', function (){
            console.log('User disconnected');
        });

        socket.on('message', function (data){
            console.log(data);
        });
    });

};