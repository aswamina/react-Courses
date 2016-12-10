"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NavLink = React.createClass({
  render: function() {
    return (
        <Link {...this.props} activeStyle={{ color: 'red' }} />
    );
  }
});

module.exports = NavLink;
