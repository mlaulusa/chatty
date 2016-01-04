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

    storeMessage: function (message){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = ('INSERT INTO messages (message, username, room, date) VALUES ($data)').replace('$data', ('"$values"').replace('$values', Object.keys(message).map(function(key) { return message[key]; }).join('", "')));

            db.run(statement, function (err){

                if(err){
                    app.log.debug('Error at %s', statement);
                    app.log.error(err);
                    reject(err);
                } else {
                    var msg = ('Inserted "$msg" into database').replace('$msg', message.message);
                    app.log.info(msg);
                    resolve(msg);
                }

            }).close(closeDatabase());

        });

    },
    getMessageById: function (id){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = ('SELECT * FROM messages WHERE _id = "$data"').replace('$data', id);

            db.get(statement, function (err, data){
                if(err){

                    app.log.debug('Error at %s', statement);
                    app.log.error(Error(err));
                    reject(err);

                } else if(data){

                    app.log.info(('Found message of _id $id').replace('$id', id));
                    resolve(data);

                } else {

                    var msg = ('Message _id of $id not found').replace('$id', id);
                    app.log.info(msg);
                    reject({status: 404, msg: msg});

                }
            }).close(closeDatabase());
        });
    },
    getAllMessages: function (){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = 'SELECT * FROM messages';

            db.all(statement, function (err, row){

                if(err){

                    app.log.debug('Error at "$statement"', statement);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve(row);
                }

            }).close(closeDatabase());
        });
    },
    getAllMessagesByRoom: function (room){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = ('SELECT * FROM messages WHERE room = "$room"').replace('$room', room);

            db.get(statement, function (err, row){
                if(err){

                    app.log.debug('Error at "%s"', statement);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve(row);
                }
            }).close(closeDatabase());
        });
    },
    getAllMessagesByUser: function (username){

        return new Promise(function (resolve, reject){
            var db = setup();

            var statement = ('SELECT * FROM messages WHERE username = "$username"').replace('$username', username);

            db.get(statement, function (err, row){

                if(err){

                    app.log.debug('Error at "%s"', statement);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve(row);
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
