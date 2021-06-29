
var express = require('express');
var app = express();

// app.use(express.static('./assets'));
app.use(express.static(path.join(__dirname, '/')));
app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(8080, '127.0.0.1')