// server.js
var express = require('express');
var path = require('path');

var app = express();

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../dist')))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
    // and drop 'public' in the middle of here
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});

var PORT = process.env.PORT || 5015
app.listen(PORT, function () {
    console.log('Express server running at localhost:' + PORT)
});
