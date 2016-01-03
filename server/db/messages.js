var sqlite3 = require('sqlite3');

var setup = function (){

    var db = new sqlite3.Database('server/db/chat-' + app.get('env') + '.db');
    db.run('PRAGMA foreign_keys = true');
    return db;

};

var closeDatabase = function (err){

    if(err){
        app.log.debug('Error closing database');
        app.log.error(err);
    } else {
        app.log.info('Closing database');
    }

};

module.exports = {

    storeMessage: function (data){

        return new Promise(function (resolve, reject){
            var db = setup();

            db.run('INSERT INTO messages (username, message, room, date) VALUES ($username, $message, $room, $date)', {
                $username: data.username,
                $message: data.message,
                $room: data.room,
                $date: data.date
            }, function (err){

                if(err){
                    app.log.debug('Error at "INSERT INTO messages (username, message, room, date) VALUES (%s, %s, %s, %s)"', data.username, data.message, data.room, data.date);
                    app.log.error(err);
                    reject(err);
                } else {
                    app.log.info('Inserted "%s" into database', data.message);
                    resolve({confirmation: true});
                }

            }).close(closeDatabase());

        });

    },
    getMessageById: function (id){

        return new Promise(function (resolve, reject){
            var db = setup();

            db.get('SELECT * FROM messages WHERE _id = $id', {
                $id: id
            }, function (err, data){
                if(err){

                    app.log.debug('Error at "SELECT * FROM messages WHERE _id = %d"', id);
                    app.log.error(err);
                    reject(err);

                } else if(data){

                    app.log.info('Found message of _id %d', id);
                    resolve({confirmation: true, data: data});

                } else {

                    app.log.warn('Something else happened when getting message by _id');
                    reject('Something went wrong getting message by _id');

                }
            }).close(closeDatabase());
        });
    },
    getAllMessages: function (){

        return new Promise(function (resolve, reject){
            var db = setup();

            db.all('SELECT * FROM messages', function (err, row){

                if(err){

                    app.log.debug('Error at "SELECT * FROM messages"');
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve({confirmation: true, data: row});
                }

            }).close(closeDatabase());
        });
    },
    getAllMessagesByRoom: function (room){

        return new Promise(function (resolve, reject){
            var db = setup();

            db.get('SELECT * FROM messages WHERE room = $room', {
                $room: room
            }, function (err, row){
                if(err){

                    app.log.debug('Error at "SELECT * FROM messages WHERE room = %s"', room);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve({confirmation: true, data: row});
                }
            }).close(closeDatabase());
        });
    },
    getAllMessagesByUser: function (username){

        return new Promise(function (resolve, reject){
            var db = setup();

            db.get('SELECT * FROM messages WHERE username = $username', {
                $username: username
            }, function (err, row){

                if(err){

                    app.log.debug('Error at "SELECT * FROM messages WHERE room = %s"', username);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve({confirmation: true, data: row});
                }
            }.close(closeDatabase()));

        });
    },
    test: function (req, res){
        var db = setup();
        db.all('SELECT * FROM messages', function (err, row){
            if(err){
                app.log.debug('Error at "SELECT * FROM messages"');
                app.log.error(err);
                res.status(401);
                res.json(err);
            } else {
                app.log.info('Successful');
                res.status(200);
                res.json(row);
            }
        }).close(closeDatabase());
    }

};
