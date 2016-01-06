var sqlite3 = require('sqlite3'),
    fs = require('fs'),
    database = 'server/db/chat-' + app.get('env') + '.db';

module.exports = {
    setup: function (){

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

                db.run('CREATE TABLE messages (_id INTEGER PRIMARY KEY, username TEXT NOT NULL, message TEXT NOT NULL, room TEXT NOT NULL, date BLOB NOT NULL, FOREIGN KEY (username) REFERENCES users (username), FOREIGN KEY (room) REFERENCES rooms (room))');
                db.run('CREATE TABLE users (_id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, password BLOB NOT NULL, created_on BLOB NOT NULL)');
                db.run('CREATE TABLE rooms (_id INTEGER PRIMARY KEY, room TEXT NOT NULL UNIQUE, created_on BLOB NOT NULL, created_by TEXT, password BLOB, FOREIGN KEY (created_on) REFERENCES users (username))');

            }).close(function (err){

                if(err){
                    app.log.debug('Error closing database');
                    app.log.error(err);
                } else {
                    app.log.info('Closing database');
                }

            });

        }
    }
};