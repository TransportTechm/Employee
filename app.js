var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/Users');
var permission = require('./routes/Permission');
var eurekaclient = require('./eureka');

// Parsers for POST data
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//start body-parser configuration
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
//end body-parser configuration

app.use('/', routes);
app.use('/transportationapi/employee/1.0/users', users);
app.use('/transportationapi/employee/1.0/permission', permission);

//Setting up server
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

/* var server = app.listen(3000, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://%s:%s", host, port)
}); */


