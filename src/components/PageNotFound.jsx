"use strict";

var React = require('react');
var Link = require('react-router').Link;

var PageNotFound = React.createClass({
   render: function() {
       return (
           <div>
               <h1>Page Not Found</h1>
               <p>Whoops! You must have typed an incorrect URL</p>
               <p><Link to="/">Back to Home</Link></p>
           </div>
       );
   }
});

module.exports = PageNotFound;
