// server.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../dist')));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
    // and drop 'public' in the middle of here
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});


// Processes the form submission.
app.post('/postAuthor', function (req, res) {
    var id = req.body.id;
    console.log('posted id=' + id);
    console.log('firstName=' + req.body.firstName);
    console.log('lastName=' + req.body.lastName);
    return res.send({
        status: 'OK'
    });
});

var PORT = process.env.PORT || 5015
app.listen(PORT, function () {
    console.log('Express server running at localhost:' + PORT)
});
