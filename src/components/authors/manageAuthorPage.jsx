"use strict";

var React = require('react');
var AuthorForm = require('./authorForm.jsx');
var AuthorAPI = require('../../api/authorAPI.jsx');

var ManageAuthorPage = React.createClass({
    getInitialState: function() {
        return { author: {id:'', firstName:'', lastName:''}};
    },
    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },
    saveAuthor: function(event) {
        event.preventDefault();
        AuthorAPI.saveAuthor(this.state.author);
        this.sendFormData();
        // Uncomment below to post the author data to the server for persistence
        // this.setState({type: 'hello' }, this.sendFormData);
    },
    sendFormData: function () {
        fetch('/postAuthor', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.author.id,
                firstName: this.state.author.firstName,
                lastName: this.state.author.lastName
            })
        });
        /*.then(function(responseObj) {
            window.location.href = '/authors';
        });
        */
    },
    render: function() {
        return(
            <div>
                <h1>Manage Author Page</h1>
                <AuthorForm author={this.state.author} onChange={this.setAuthorState} onSave={this.saveAuthor} />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;
