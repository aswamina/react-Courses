"use strict";

var React = require('react');
var Link = require('react-router').Link;
var AuthorStore = require('../../stores/authorStore.jsx');
var AuthorList = require('./authorList.jsx');

var AuthorPage = React.createClass({
    getInitialState: function() {
      return {
          authors: AuthorStore.getAllAuthors()
      };  
    },
    componentWillMount: function() {
        AuthorStore.addChangeListener(this._onChange);
    },
    componentWillUnMount: function() {
        AuthorStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState({authors: AuthorStore.getAllAuthors()});
    },
    render: function() {
        return (
            <div>
                <h1>Authors</h1>
                <AuthorList authors={this.state.authors}></AuthorList>
            </div>
        );
    }
});

module.exports = AuthorPage;
