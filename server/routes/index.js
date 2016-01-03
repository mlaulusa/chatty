var users = require('../db/users'),
    messages = require('../db/messages');

app.get('/test', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    var date = new Date().toUTCString();
    app.log.debug();

    messages.test(req, res);
});

app.post('/signin', function (req, res){

    app.log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

    users.authenticate(req.body.user).then(function (success){

        res.status(200);
        res.json({
            _id: success.data._id,
            username: success.data.username,
            created_on: success.data.created_on
        });

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.post('/api/user', function (req, res){

    app.log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

    req.body.user.created_on = new Date();

    users.createUser(req.body.user).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });

});

app.post('/api/message', function(req, res){

    app.log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

    messages.storeMessage(req.body.data).then(function(success){

        res.status(200);
        res.json(success);

    }, function(err){

        res.status(401);
        res.json(err);

    });
});

app.get('/api/user/:id', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    users.getUserById(req.params.id).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });

});

app.get('/api/user', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    users.getUserByUsername(req.body.username).then(function (success){

        res.status(200);
        res.json(success);

    }, function (err){

        res.status(401);
        res.json(err);

    });
});

app.get('/api/users', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    users.getAllUsers().then(function (success){

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

        res.status(401);
        res.json(err);

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

        res.status(200);
        res.json(err);

    });
});
