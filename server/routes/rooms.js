var rooms = require('../db/rooms');

app.get('/api/rooms', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    rooms.getAll().then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.get('/api/room/:room', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    rooms.getRoomByRoom(req.params.room).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.get('/api/room/id/:id', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    rooms.getRoomByID(req.params.id).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.post('/api/room', function (req, res){

    app.log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

    rooms.createRoom(req.body.room).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.delete('/api/room/id/:id', function (req, res){

    app.log.info('[%s] %s DELETE %s', req.ip, req.protocol, req.path);

    rooms.deleteByID(req.params.id).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.delete('/api/room/:room', function (req, res){

    app.log.info('[%s] %s DELETE %s', req.ip, req.protocol, req.path);

    rooms.deleteByRoom(req.params.room).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.put('/api/room/id/:id', function (req, res){

    app.log.info('[%s] %s PUT %s', req.ip, req.protocol, req.path);

    rooms.updatePasswordByID(req.params.id, req.body.password).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.put('/api/room/:room', function (req, res){

    app.log.info('[%s] %s PUT %s', req.ip, req.protocol, req.path);

    rooms.updatePasswordByRoom(req.params.room, req.body.password).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});
