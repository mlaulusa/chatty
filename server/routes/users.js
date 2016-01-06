var users = require('../db/users');

app.post('/signin', function (req, res){

    app.log.info('[%s] %s POST %s', req.ip, req.protocol, req.path);

    users.authenticate(req.body.user).then(function (success){

        res.status(200);
        res.json(success);

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

