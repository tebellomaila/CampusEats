var http = require("http");
var express = require('express');
var app = express();
var router = express.Router(); // this one and var app = express(); work the same way 

var bodyParser = require('body-parser');

// this will bring the code for database connection
var connection = require('../..//connection'); // this path goes out the current directory and goes to find connction  


//we are using app because of express
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//this is the server for 
var server = app.listen(3000, "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log(" listening at http://%s:%s", host, port)
 
});


//REST API TO GET ALL Orders
app.get('/order', function (req, res) {
   connection.query('select * from ordertable', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single ORDER data
app.get('/customer/:id', function (req, res) {
   connection.query('select * from ordertable where orderNo=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


//REST API TO DELETE ORDER
app.delete('/deleteOrder/:orderNo', function (req, res) {
   //console.log(req.body);
   connection.query('DELETE FROM ordertable where orderNo=?', [req.params.orderNo], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});




//REST API TO GET ORDERS WERE THE STATUS IS PENDING   ORDERS
app.get('/pendingOrder', function (req, res) {
   connection.query("select * from ordertable WHERE orderStatus = 'pending'", function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


//REST API TO GET ORDERS WERE THE STATUS IS WAITINNG COLECTION
app.get('/waitingOrder', function (req, res) {
   connection.query("select * from ordertable WHERE orderStatus = 'waiting'", function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


//REST API TO GET ORDERS WERE THE STATUS IS COLLECTED
app.get('/waitingOrder', function (req, res) {
   connection.query("select * from ordertable WHERE orderStatus = 'collected'", function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});



//rest api to create a new order into mysql database
app.post('/customerInsert', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO ordertable SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
