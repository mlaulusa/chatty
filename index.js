//================================================================
// Declare dependencies
//================================================================

var methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    express = require('express');

app = express();

var server = require('http').createServer(app),
    io = require('socket.io').listen(server);

//================================================================
// Configure logs
//================================================================
require('./server/logs').setup();

//================================================================
// Set up sqlite3 database and variables
//================================================================
require('./server/db').setup();

//================================================================
// Middleware
//================================================================
app.use(express.static('app'));
app.use(express.static('public'));
app.use(methodOverride());
app.use(bodyParser.urlencoded(
    {
        'extended': 'true'
    }));
app.use(bodyParser.json());
app.config = require('./config');

//================================================================
// API routes													||
//================================================================
require('./server/routes');

require('./server/routes/socket')(io);

//================================================================
// Get Angular app												||
//================================================================
app.get('*', function (req, res){

    app.log.info('[%s] %s GET %s', req.ip, req.protocol, req.path);

    res.status(200);
    res.sendFile('./app/index.html');
});

//================================================================
// Start server													||
//================================================================
server.listen(app.config.port || 8888, function (){
    app.log.info("Starting server on port %d in a %s environment", app.config.port || 8888, app.get('env'));
});