"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;
var NotFoundRoute = require('react-router').NotFoundRoute;

var App = require('./components/app.jsx');
var Home = require('./components/homePage.jsx');
var About = require('./components/about/aboutPage.jsx');
var Authors = require('./components/authors/authorPage.jsx');
var FourOFour = require('./components/PageNotFound.jsx');
var ManageAuthorPage = require('./components/authors/manageAuthorPage.jsx');
var confirmTransition = ManageAuthorPage.confirmTransition;

var routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="authors" component={Authors} />
        <Route path="addAuthor" component={ManageAuthorPage} />
            <Route path="/authors/:id" component={ManageAuthorPage} />
        <Route path="about" component={About} />
        <Route path="*" component={FourOFour} />
        <Redirect from="/*" to="about" />
    </Route>
);

module.exports = routes;
