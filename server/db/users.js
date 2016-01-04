var sqlite3 = require('sqlite3'),
    bcrypt = require('bcrypt');

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

    authenticate: function (user){

        return new Promise(function (resolve, reject){

            var db = setup();

            var statement = ('SELECT * FROM users WHERE username = "$username"').replace('$username', user.username);

            db.get(statement, function (err, row){

                if(err){
                    app.log.debug('Error at "%s"', statement);
                    app.log.error(err);
                    reject(Error(err));
                } else if(row){
                    app.log.info('Found %s in users table', user.username);
                    app.log.info(row);

                    bcrypt.compare(user.password, row.password, function (err, match){

                        if(err){
                            app.log.debug('Error comparing passwords for %s', user.username);
                            app.log.error(err);
                            reject(Error(err));
                        } else if(match){
                            app.log.info('Matched password for %s', user.username);
                            resolve(row);
                        } else {
                            var msg = 'Passwords did not match';
                            app.log.info(msg);
                            reject(Error(msg));
                        }

                    });
                } else {
                    var msg = ('$username was not found').replace('$username', user.username);
                    app.log.info(msg);
                    reject(Error(msg));
                }

            }).close(closeDatabase());
        });
    },
    createUser: function (user){

        return new Promise(function (resolve, reject){

            var db = setup();

            bcrypt.genSalt(10, function (err, salt){
                if(err){

                    app.log.debug('Error generating bcrypt salt');
                    app.log.error(err);
                    reject(err);

                } else {

                    bcrypt.hash(user.password, salt, function (err, hash){
                        if(err){

                            app.log.debug('Error generating hash from salt');
                            app.log.error(err);
                            reject(err);

                        } else {

                            db.run('INSERT INTO users (username, password, created_on) VALUES ($username, $password, $created_on)', {
                                $username: user.username,
                                $password: hash,
                                $created_on: user.created_on
                            }, function (err){
                                if(err){

                                    app.log.debug('Error at "INSERT INTO users (username, password, created_on) VALUES (%s, %s %s)', user.username, user.password, user.created_on);
                                    app.log.error(err);
                                    reject(err);

                                } else {

                                    app.log.info('Successfully inserted %s into users table', user.username);
                                    resolve();

                                }
                            }).close(closeDatabase());
                        }
                    });
                }
            });
        });
    },
    getUserById: function (id){

        return new Promise(function (resolve, reject){

            var db = setup();

            var statement = ('SELECT * FROM users WHERE _id = "$id"').replace('$id', id);

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
    getUserByUsername: function (username){

        return new Promise(function (resolve, reject){

            var db = setup();

            var statement = ('SELECT * FROM users WHERE username = "$username"').replace('$username', username);

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
    getAllUsers: function (){

        return new Promise(function (resolve, reject){

            var db = setup();

            var statement = 'SELECT * FROM users';

            db.all(statement, function (err, row){
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
    deleteById: function (id){

        return new Promise(function (resolve, reject){

            var db = setup();

            var statement = ('DELETE FROM users WHERE _id = "$id"').replace('$id', id);

            db.run(statement, function (err){
                if(err){

                    app.log.debug('Error at "%s"', statement);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve();
                }
            }).close(closeDatabase());
        });
    },
    deleteByUsername: function (username){

        return new Promise(function (resolve, reject){

            var db = setup();

            var statement = ('DELETE FROM users WHERE username = "$username"').replace('$username', username);

            db.run(statement, function (err){
                if(err){

                    app.log.debug('Error at "%s"', statement);
                    app.log.error(err);
                    reject(err);

                } else {
                    app.log.info('Successfully deleted %s', username);
                    resolve()
                }
            }).close(closeDatabase());
        });
    }
};
