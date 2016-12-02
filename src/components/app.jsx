/*eslint-disable strict*/   //Disabling check for this one file

$ = jQuery = require('jquery');
var React = require('react');
var Router = require('react-router').Router;
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./common/header.jsx');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;