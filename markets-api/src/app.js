var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// database
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'markets'
});

connection.connect();

// app
var app = express();
app.use(bodyParser());

// cross domain stuff
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, X-Requested-With");
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// markets
app.get('/markets', function(req, res) {
  connection.query('SELECT market.*, currency.name AS currency_name, location.name AS location_name FROM market LEFT OUTER JOIN currency ON currency.id = market.currency_id LEFT OUTER JOIN location ON location.id = market.location_id', function(err, rows) {
    res.json(200, rows);
  });
});

app.get('/markets/:id', function(req, res) {
  var id = req.params.id;
  
  connection.query('SELECT market.*, currency.name AS currency_name, location.name AS location_name FROM market LEFT OUTER JOIN currency ON currency.id = market.currency_id LEFT OUTER JOIN location ON location.id = market.location_id WHERE market.id = ?', [id], function(err, rows) {
    if (rows.length === 0) {
      res.send(404);
    } else {
      res.json(200, rows[0]);
    }
  });
});

app.post('/markets', function(req, res) {
  var params = req.body;
  
  connection.query('INSERT INTO market SET ?', params, function(err, result) {
    if (err) {
      res.send(500, {
        'error': err
      });
    } else {
      res.location('/markets/' + result.insertId)
      res.json(201, {
        id: result.insertId
      });
    }
  });
});

app.put('/markets/:id', function(req, res) {
  var id = req.params.id;
  var params = req.body;
  
  delete params.id;
  delete params.currency_name;
  delete params.location_name;
  
  connection.query('UPDATE market SET ? WHERE id = ?', [params, id], function(err, result) {
    if (err) {
      res.send(500, {
        'error': err
      });
    } else {
      res.json(200);
    }
  });
});

app.delete('/markets/:id', function(req, res) {
  var id = req.params.id;
  
  connection.query('DELETE FROM market WHERE id = ?', id, function(err, result) {
    if (err) {
      res.send(500, {
        'error': err
      });
    } else {
      res.json(200);
    }
  });
});

// locations
app.get('/locations', function(req, res) {
  connection.query('SELECT * FROM location', function(err, rows) {
    res.json(200, rows);
  });
});

// currencies
app.get('/currencies', function(req, res) {
  connection.query('SELECT * FROM currency', function(err, rows) {
    res.json(200, rows);
  });
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});