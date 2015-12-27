var db = require('../db');

app.post('/message', function(req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    var data = {
        message: req.body.message,
        date: new Date()
    };

    db.storeMessage(data).then(function(success){

        res.status(200);
        res.json(success);

    }, function(err){

        res.status(401);
        res.json(err);

    });

});