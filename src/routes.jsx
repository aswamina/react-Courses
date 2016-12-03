"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var App = require('./components/app.jsx');
var Home = require('./components/homePage.jsx');
var About = require('./components/about/aboutPage.jsx');
var Authors = require('./components/authors/authorPage.jsx');

var routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="authors" component={Authors} />
        <Route path="about" component={About} />
    </Route>
);

module.exports = routes;
