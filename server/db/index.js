var sqlite3 = require('sqlite3'),
    fs = require('fs'),
    database = 'server/db/chat-' + app.get('env') + '.db',
    foreignKey = 'PRAGMA foreign_keys = true';

module.exports = {
    setup: function(){
//        app.database = 'server/db/chat-' + app.get('env') + '.db';
//        app.foreignKey = 'PRAGMA foreign_keys = true';

        try {

            fs.accessSync(process.cwd() + '/' + database, fs.F_OK);
            app.log.info('SQLite3 database already created');

        } catch (err){

            app.log.warn(err);
            app.log.info('Creating SQLite3 database file');

            fs.writeFileSync(database, '');

            var db = new sqlite3.Database(database);

            db.serialize(function (){

                app.log.info('Creating SQLite3 tables');

                db.run('CREATE TABLE messages (id INTEGER PRIMARY KEY, message TEXT NOT NULL, date BLOB NOT NULL UNIQUE)');

            }).close(function(err){

                if(err){
                    app.log.debug('Error closing database');
                    app.log.error(err);
                }

            });

        }
    },
    storeMessage: function(data){

        return new Promise(function(resolve, reject){

            var db = new sqlite3.Database(database);

            db.run(foreignKey);

            db.serialize(function(){

                db.run('INSERT INTO messages (message, date) VALUES ($message, $date)', {
                    $message: data.message,
                    $date: data.date
                }, function(err){

                    if(err){
                        app.log.debug('Error at "INSERT INTO messages (message, date) VALUES (%s, %s)"', data.message, data.date);
                        app.log.error(err);
                        reject(err);
                    } else {
                        resolve({confirmation: true});
                    }

                });

            }).close(function(err){

                if(err){
                    app.log.debug('Error closing database');
                    app.log.error(err);
                } else {
                    app.log.info('Closing database');
                }

            });

        });

    },
    getMessageById: function(id){
        return new Promise(function(resolve, reject){

            var db = new sqlite3.Database(database);

            db.run(foreignKey);

            db.serialize(function(){

                db.get('SELECT * FROM messages WHERE id = $id', {
                    $id: id
                }, function(err, data){
                    if(err){

                        app.log.debug('Error at "SELECT * FROM messages WHERE id = %d"', id);
                        app.log.error(err);
                        reject(err);

                    } else if(data){

                        app.log.info('Found message of id %d', id);
                        resolve(data);

                    } else {

                        app.log.warn('Something else happened when getting message by id');
                        reject('Something went wrong getting message by id');

                    }
                });
            }).close(function(err){
                if(err){

                    app.log.debug('Error closing database');
                    app.log.error(err);
                    reject(err);

                }
            });
        });
    }

};