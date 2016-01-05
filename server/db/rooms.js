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

    createRoom: function (room){
        return new Promise(function (resolve, reject){

            var db = setup(),
                statement = ('INSERT INTO rooms (room, created_on, password) VALUES ($data)').replace('$data', ('"$value"').replace('$value', Object.keys(room).map(function (key){ return room[key]; }).join('", "')));

            db.run(statement, function (err){
                if(err){

                    app.log.debug('Error at %s', statement);
                    app.log.error(err);
                    reject(err);

                } else {

                    var msg = ('Inserted $msg into database').replace('$msg', room.room);
                    app.log.info(msg);
                    resolve(msg);

                }
            }).close(closeDatabase());
        });
    },

    getAllRooms: function (){
        return new Promise(function (resolve, reject){

            var db = setup(),
                statement = 'SELECT * FROM rooms';

            db.all(statement, function (err, row){
                if(err){

                    app.log.debug('Error at %s', statement);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve(row);
                }
            }).close(closeDatabase());
        });
    },

    getRoomByID: function (id){
        return new Promise(function (resolve, reject){

            var db = setup(),
                statement = ('SELECT * FROM rooms WHERE _id = "$id"').replace('$id', id);

            db.get(statement, function (err, row){
                if(err){

                    app.log.debug('Error at %s', statement);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve(row);
                }
            }).close(closeDatabase());
        });
    },

    getRoomByRoom: function (room){
       return new Promise(function (resolve, reject){

            var db = setup(),
                statement = ('SELECT * FROM rooms WHERE room = "$room"').replace('$room', room);

            db.get(statement, function (err, row){
                if(err){

                    app.log.debug('Error at %s', statement);
                    app.log.error(err);
                    reject(err);

                } else {
                    resolve(row);
                }
            }).close(closeDatabase());
        });
    },

    deleteByRoom: function(room){
      return new Promise(function(resolve, reject){

        var db = setup(),
            statement = ('DELETE FROM rooms WHERE room = "$room"').replace('$room', room);

        db.run(statement, function(err){
          if(err){

            app.log.debug('Error at %s', statement);
            app.log.error(err);
            reject(err);

          } else {

            var msg = ('$room was deleted').replace('$room', room);
            app.log.info(msg);
            resolve(msg);

          }
        }).close(closeDatabase());
      });
    },

    deleteByID: function(id){
      return new Promise(function(resolve, reject){

        var db = setup(),
            statement = ('DELETE FROM rooms WHERE _id = "$id"').replace('$id', id);

        db.run(statement, function(err){
          if(err){

            app.log.debug('Error at %s', statement);
            app.log.error(err);
            reject(err);

          } else {

            var msg = ('$id was deleted').replace('$id', id);
            app.log.info(msg);
            resolve(msg);

          }
        }).close(closeDatabase());
      });
    },

    updatePasswordByID: function(id, password){
      return new Promise(function(resolve, reject){

        var db = setup(),
            statement = ('UPDATE rooms SET password = "$password" WHERE _id = "$id"').replace('$password', password).replace('$id', id);

        db.run(statement, function(err){
          if(err){

            app.log.debug('Error at %s', statement);
            app.log.error(err);
            reject(err);

          } else {

            var msg = ('$id was updated').replace('$id', id);
            app.log.info(msg);
            resolve(msg);

          }
        }).close(closeDatabase());
      });
    },

    updatePasswordByRoom: function(room, password){
      return new Promise(function(resolve, reject){

        var db = setup(),
            statement = ('UPDATE rooms SET password = "$password" WHERE _id = "$id"').replace('$password', password).replace('$id', id);

        db.run(statement, function(err){
          if(err){

            app.log.debug('Error at %s', statement);
            app.log.error(err);
            reject(err);

          } else {

            var msg = ('$room was updated').replace('$room', room);
            app.log.info(msg);
            resolve(msg);

          }
        }).close(closeDatabase());
      });
    }
};
