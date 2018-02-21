var http = require("http");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/Users');
var permission = require('./routes/Permission');
var swaggerJSDoc = require('swagger-jsdoc');
//var eurekaclient = require('./eureka');

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Employee Micro Service API',
    version: '1.0',
    description: 'Demonstrating how to desribe a RESTful API with Swagger',
  },
  //host: 'employeeservicetechm.cfapps.io',
  host: 'localhost:3000',
  basePath: '/employee/1.0',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// Parsers for POST data
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
//start body-parser configuration
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
//end body-parser configuration

app.use('/', routes);
app.use('/employee/1.0/users', users);
app.use('/employee/1.0/permission', permission);
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(logErrors);

//Setting up server
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

function logErrors (err, req, res, next) {
  console.error('[Employee] - ['+req.originalUrl+'] - ['+req.method+'] - [Internal Server Error]')
  next(err);
}
/* var server = app.listen(3000, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://%s:%s", host, port)
}); */


