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
    return res.send({ error: true, message: 'Welcome' })
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


// Retrieve all menu items 
app.get('/menu', function (req, res) {
    dbConn.query('SELECT * FROM menu', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Menu list.' });
    });
});


/*// Retrieve Menu with id 
app.get('/Menu/:itemNo', function (req, res) {

    let itemNo = req.params.itemNo;

    if (!itemNo) {
        return res.status(400).send({ error: true, message: 'Please provide itemNum' });
    }

    dbConn.query('SELECT * FROM menu where itemNo=?', itemNo, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'oredr list.' });
    });

});*/


// Add a new New item to menu 
app.post('/menu', function (req, res) {

    let item = req.body.item;

    if (!item) {
        return res.status(400).send({ error:true, message: 'Please provide order' });
    }

    dbConn.query("INSERT INTO menu SET ? ", { item: item }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New delicious food added successfully.' });
    });
});


//  Update menu by itemon the menu(price)
app.put('/menu', function (req, res) {

    let itemNo = req.body.itemNo;
    let price = req.body.price;

    if (!itemNo || !item) {
        return res.status(400).send({ error: price, message: 'Please provide price and itemNumber' });
    }

    dbConn.query("UPDATE menu SET price = ? WHERE itemNo = ?", [price, itemNo], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Item price updated successfully.' });
    });
});


//  Delete menu item
app.delete('/menu', function (req, res) {

    let itemNo = req.body.itemNo;

    if (!itemNo) {
        return res.status(400).send({ error: true, message: 'Please provide itemNo' });
    }
    dbConn.query('DELETE FROM menu WHERE itemNo = ?', [itemNo], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Item has been successfully Removed.' });
    });
}); 

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;