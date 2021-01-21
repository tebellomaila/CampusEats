var http = require("http");
var express = require('express');
var app = express();
var router = express.Router(); // this one and var app = express(); work the same way 
// require the bcrypt module
///var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var session = require('express-session')
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
	var Roles = request.body.Roles;
	console.log(email);
	console.log(password);
	console.log(Roles);
	
	
    if (email && password) {
// check if user exists
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            if (results.length > 0) {
				
				response.send('Login Successful');
                /*request.session.loggedin = true;
                request.session.email = email;
				request.session.role = results[0].Roles;*/
				
				
				if(Roles == "customer")
				{
					//response.redirect('/Customer');
					response.send('Customer PAge');
					
				}else{
					//response.redirect('/Admin');
					response.send('Admin PAge');
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

app.post('/register', function(request, response) {
	
	
	var email = request.body.Email;
    var password = request.body.Password;
	var name = request.body.Name;
	var role = request.body.Roles;
	
	
	
	console.log(name);
	console.log(email);
	console.log(password);
	console.log(role);
	
	
	
    if (email && password && name && role) {
    // check if user exists
        connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
            if (results.length > 0)
			{
                response.send('User Already has an account');
            }else{
					var today = new Date();
					var user={
						"name":request.body.Name,
						"email":request.body.Email,
						"password":request.body.Password,
						"Roles":request.body.Roles,
						
					}
					
					
					
					connection.query('INSERT INTO users SET ?',[user], function (error, results, fields) {
					  if (error) {
						/*res.json({
							status:false,
							message:'there are some error with query'
							
						})*/
						response.send('there are some error with query');
						
					  }else{
						  /*res.json({
							status:true,
							data:results,
							message:'user registered sucessfully'
							
						})*/
						response.send('user registered sucessfully');
						
					  }
					});

			}				
	
		
 
		});
		
		
	} else{
	response.send('Please enter values');	
	}
	
});



app.delete('/deleteUser/:email', function (req, res) {
   //console.log(req.body);
   connection.query('DELETE FROM users where email=?', [req.params.email], function (error, results, fields) {
	  if (error) throw error;
	  res.end('User has been deleted!');
	});
});