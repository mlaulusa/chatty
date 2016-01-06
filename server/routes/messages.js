var messages = require('../db/messages');

app.post('/api/message', function (req, res){

    app.log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

    messages.storeMessage(req.body.message).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.get('/api/messages', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    messages.getAllMessages().then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.get('/api/message/:id', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    messages.getMessageById(req.params.id).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        if(err.status){
            res.status(404);
            res.json(err.msg);
        } else {
            res.status(401);
            res.json(err);
        }

    });
});

app.get('/api/:room/messages', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    messages.getAllMessagesByRoom(req.params.room).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(200);
        res.json(err);

    });
});

app.get('/api/messages/user/:username', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    messages.getAllMessagesByUser(req.params.username).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});
