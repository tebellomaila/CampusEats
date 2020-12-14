var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Kota'
});

// connect to database
dbConn.connect(); 


// Retrieve all users 
app.get('/order', function (req, res) {
    dbConn.query('SELECT * FROM order', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});


// Retrieve user with id 
app.get('/order/:orderNo', function (req, res) {

    let order_No = req.params.orderNo;

    if (!order_No) {
        return res.status(400).send({ error: true, message: 'Please provide order_No' });
    }

    dbConn.query('SELECT * FROM order where id=?', order_No, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'oredr list.' });
    });

});


// Add a new user  
app.post('/order', function (req, res) {

    let order = req.body.order;

    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide order' });
    }

    dbConn.query("INSERT INTO order SET ? ", { order: order }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New order has been placed successfully.' });
    });
});


//  Update user with id NOT SURE IF USERS CAN UPDATTE ORDERS
app.put('/order', function (req, res) {

    let order_No = req.body.order_No;
    let order = req.body.order;

    if (!order_No || !order) {
        return res.status(400).send({ error: order, message: 'Please provide order and order_No' });
    }

    dbConn.query("UPDATE users SET orderStatus = ? WHERE order_No = ?", [orderStatus, order_No], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});


//  Delete user
app.delete('/order', function (req, res) {

    let order_No = req.body.order_No;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide order_No' });
    }
    dbConn.query('DELETE FROM order WHERE order_No = ?', [order_No], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Order has been deleted successfully.' });
    });
}); 

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;