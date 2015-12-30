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

            db.run('INSERT INTO messages (message, date) VALUES ($message, $date)', {
                $message: data.message,
                $date: data.date
            }, function (err){

                if(err){
                    app.log.debug('Error at "INSERT INTO messages (message, date) VALUES (%s, %s)"', data.message, data.date);
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

            db.get('SELECT * FROM messages WHERE id = $id', {
                $id: id
            }, function (err, data){
                if(err){

                    app.log.debug('Error at "SELECT * FROM messages WHERE id = %d"', id);
                    app.log.error(err);
                    reject(err);

                } else if(data){

                    app.log.info('Found message of id %d', id);
                    resolve({confirmation: true, data: data});

                } else {

                    app.log.warn('Something else happened when getting message by id');
                    reject('Something went wrong getting message by id');

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
                    resolve({confirmation: false, data: row});
                }

            }).close(closeDatabase());
        });
    },
    getAllRoomMessages: function (room){

        return new Promise(function (resolve, reject){

            var db = setup();

            db.get('SELECT * FROM messages WHERE room = $room', {
                $room: room
            }, function (err, row){
                if(err){

                    app.log.debug('Error at "SELECT * FROM messages WHERE room = %s', room);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve({confirmation: true, data: row});
                }
            }).close(closeDatabase());
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
