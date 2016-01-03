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

            db.get('SELECT * FROM users WHERE username = $username', {
                $username: user.username
            }, function (err, row){

                if(err){
                    app.log.debug('Error at "SELECT * FROM users WHERE username = %s"', user.username);
                    app.log.error(err);
                    //TODO: Fix error messages with Error(err)
                    reject(err);
                } else if(row){
                    app.log.info('Found %s in users table', user.username);
                    app.log.info(row);

                    bcrypt.compare(user.password, row.password, function (err, match){

                        if(err){
                            app.log.debug('Error comparing passwords for %s', user.username);
                            app.log.error(err);
                            //TODO: Fix error messages with Error(err)
                            reject(err);
                        } else if(match){
                            app.log.info('Matched password for %s', user.username);
                            //TODO: Fix resolved objects to not include confirmation as the confirmation is implicit to the resolve promise
                            resolve({confirmation: true, data: row});
                        } else {
                            app.log.info('Passwords did not match');
                            //TODO: Fix error messages with Error(err)
                            //reject({error: 'Passwords did not match'});
                            reject(Error('Passwords did not match'));
                        }

                    });
                } else {
                    app.log.info('%s not found in users table', user.username);
                    //TODO: Fix error messages with Error(err)
                    reject('user was not found');
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
                    //TODO: Fix error messages with Error(err)
                    reject(err);

                } else {

                    bcrypt.hash(user.password, salt, function (err, hash){
                        if(err){

                            app.log.debug('Error generating hash from salt');
                            app.log.error(err);
                            //TODO: Fix error messages with Error(err)
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
                                    //TODO: Fix error messages with Error(err)
                                    reject(err);

                                } else {

                                    app.log.info('Successfully inserted %s into users table', user.username);
                                    //TODO: Fix resolved objects to not include confirmation as the confirmation is implicit to the resolve promise
                                    resolve({confirmation: true});

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

            db.get('SELECT * FROM users WHERE _id = $id', {
                $id: id
            }, function (err, row){
                if(err){

                    app.log.debug('Error at "SELECT * FROM users WHERE _id= %s"', id);
                    app.log.error(err);
                    //TODO: Fix error messages with Error(err)
                    reject(err);

                } else {
                    //TODO: Fix resolved objects to not include confirmation as the confirmation is implicit to the resolve promise
                    resolve({confirmation: true, data: row});
                }
            }).close(closeDatabase());
        });
    },
    getUserByUsername: function (username){

        return new Promise(function (resolve, reject){

            var db = setup();

            db.get('SELECT * FROM users WHERE username = $username', {
                $username: username
            }, function (err, row){
                if(err){

                    app.log.debug('Error at "SELECT * FROM users WHERE = %s"', username);
                    app.log.error(err);
                    //TODO: Fix error messages with Error(err)
                    reject(err);

                } else {
                    //TODO: Fix resolved objects to not include confirmation as the confirmation is implicit to the resolve promise
                    resolve({confirmation: true, data: row});
                }

            }).close(closeDatabase());
        });
    },
    getAllUsers: function (){

        return new Promise(function (resolve, reject){

            var db = setup();

            db.all('SELECT * FROM users', function (err, row){
                if(err){

                    app.log.debug('Error at "SELECT * FROM users"');
                    app.log.error(err);
                    //TODO: Fix error messages with Error(err)
                    reject(err);

                } else {
                    //TODO: Fix resolved objects to not include confirmation as the confirmation is implicit to the resolve promise
                    resolve({confirmation: true, data: row});
                }

            }).close(closeDatabase());
        });
    },
    deleteById: function (id){

        return new Promise(function (resolve, reject){

            var db = setup();

            db.run('DELETE FROM users WHERE _id = $id', {
                $id: id
            }, function (err){
                if(err){

                    app.log.debug('Error at "DELETE FROM users WHERE _id = %s"', id);
                    app.log.error(err);
                    //TODO: Fix error messages with Error(err)
                    reject(err);

                } else {
                    //TODO: Fix resolved objects to not include confirmation as the confirmation is implicit to the resolve promise
                    resolve({confirmation: true});
                }
            }).close(closeDatabase());
        });
    },
    deleteByUsername: function (username){

        return new Promise(function (resolve, reject){

            var db = setup();

            db.run('DELETE FROM users WHERE username = $username', {
                $username: username
            }, function (err){
                if(err){

                    app.log.debug('Error at "DELETE FROM users WHERE username = %s"', username);
                    app.log.error(err);
                    //TODO: Fix error messages with Error(err)
                    reject(err);

                } else {
                    app.log.info('Successfully deleted %s', username);
                    //TODO: Fix resolved objects to not include confirmation as the confirmation is implicit to the resolve promise
                    resolve({confirmation: true})
                }
            }).close(closeDatabase());
        });
    }
};
