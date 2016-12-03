"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NavLink = React.createClass({
  render() {
    return <Link {...this.props} activeStyle={{ color: 'red' }} />
  }
});

module.exports = NavLink;
