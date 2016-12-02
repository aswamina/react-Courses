"use strict";

var React = require('react');

var Home = React.createClass({
    render: function() {
        return (
            <div className="jumbotron">
                <h1>My Courses</h1>
                <p>List my courses using awesome React</p>
            </div>
        );
    }
});

module.exports = Home;