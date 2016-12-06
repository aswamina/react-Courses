"use strict";

var React = require('react');
var ReactToastr = require("react-toastr");
var ToastContainer = ReactToastr.ToastContainer; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

var AuthorForm = require('./authorForm.jsx');
var AuthorAPI = require('../../api/authorAPI.jsx');

var ManageAuthorPage = React.createClass({
    getInitialState: function() {
        return {
            author: {id:'', firstName:'', lastName:''},
            errors: {}
        };
    },
    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },
    isAuthorFormValid: function() {
        var formValid = true;
        this.state.errors = {};



        if (this.state.author.firstName.length == 0) {
            this.state.errors.firstName = "First name cannot be empty";
            formValid = false;
        }

        if (this.state.author.lastName.length == 0) {
            this.state.errors.lastName = "Last name cannot be empty";
            formValid = false;
        }

        this.setState({errors: this.state.errors});

        return formValid;
    },
    saveAuthor: function(event) {
        event.preventDefault();
        if (!this.isAuthorFormValid()) {
            return;
        }
        AuthorAPI.saveAuthor(this.state.author);
        this.sendFormData();
    },
    addAlert: function(message, condition) {
        this.refs.container.success(message, condition, {
            closeButton: true,
        });
    },
    sendFormData: function () {
        var _alert = this;
        var postUrl = '/postAuthor';

        fetch(postUrl, {
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
        }).then(function(responseObj) {
            console.log('response status =' + responseObj.status);
            if (responseObj.status == 200) {
                _alert.addAlert('Author Added', 'Success');
            } else if (responseObj.status > 400) {
                _alert.addAlert('Failed post to: ' + postUrl + ' - ' + responseObj.statusText, 'Error');
            }
        }).catch(function(err) {
	       _alert.addAlert('Failed to add Author', 'Error');
        });
        /*
            UNCOMMENT THIS SECTION. If you want the server to persist the latest data, you can
            create a new Response object and BODY as follows :
            With a Response you can configure:
                type - basic, cors
                url
                useFinalURL - Boolean for if url is the final URL
                status - status code (ex: 200, 404, etc.)
                ok - Boolean for successful response (status in the range 200-299)
                statusText - status code (ex: OK)
                headers - Headers object associated with the response.
            .then(function(responseObj) {
            window.location.href = '/authors';
        });
        */
    },
    render: function() {
        return(
            <div>
                <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
                <h1>Manage Author Page</h1>
                <AuthorForm author={this.state.author} onChange={this.setAuthorState} onSave={this.saveAuthor} errors={this.state.errors} />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;
