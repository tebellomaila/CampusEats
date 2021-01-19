var http = require("http");
var express = require('express');
var app = express();
var router = express.Router(); // this one and var app = express(); work the same way 

var bodyParser = require('body-parser');

// this will bring the code for database connection
var connection = require('../..//connection'); // this path goes out the current directory and goes to find connction  


//this os for session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//we are using app because of express
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//this os for session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


//this is the server for 
var server = app.listen(3000, "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log(" listening at http://%s:%s", host, port)
 
});


//this will automatically take you to the login page
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});



// for action
app.post('/login', function(request, response) {
    var email = request.body.email;
    var password = request.body.password;
    if (username && password) {
// check if user exists
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.email = email;
				request.session.role = results[0].Roles;
				
				
				if(typeof req.session.message == 'customer')
				{
					response.redirect('/Customer');
				}else{
					response.redirect('/Admin');
				}
				 
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});