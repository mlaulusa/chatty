//================================================================
// Declare dependencies
//================================================================

var methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    express = require('express'),
    fs = require('fs');

app = express();

var server = require('https').createServer({
        key: fs.readFileSync('server/public/privatekey.pem'),
        cert: fs.readFileSync('server/public/certificate.pem')
    }, app),
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
app.use(express.static('server/public'));
app.use(methodOverride());
app.use(bodyParser.urlencoded(
    {
        'extended': 'true'
    }));
app.use(bodyParser.json());
app.config = require('./config');

//================================================================
// Web socket routes
//================================================================
require('./server/routes/socket')(io);

//================================================================
// API routes													||
//================================================================
require('./server/routes');

//================================================================
// Start server													||
//================================================================
server.listen(app.config.port || 8888, function (){
    app.log.info("Starting server on port %d in a %s environment", app.config.port || 8888, app.get('env'));
});
