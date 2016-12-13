"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var NavLink = require('../NavLink.jsx');

var Header = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><img src="images/courses.jpeg" /></Link>
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><NavLink to="about">About</NavLink></li>
                        <li><NavLink to="authors">Authors</NavLink></li>
                        <li><NavLink to="courses">Courses</NavLink></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;
