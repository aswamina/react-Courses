"use strict";

var React = require('react');
var Link = require('react-router').Link;
var ReactToastr = require('react-toastr');
var ToastContainer = ReactToastr.ToastContainer; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

var AuthorActions = require('../../actions/authorActions.jsx');

var AuthorList = React.createClass({
    propTypes: {
      authors: React.PropTypes.array.isRequired
    },
    deleteAuthor: function(id, event) {
        event.preventDefault();
        AuthorActions.deleteAuthor(id);
        this.refs.container.success('Author Deleted', 'Success', { closeButton: true });
    },
    render: function() {
        var createAuthorRow = function(author) {
            return (
                <tr key={author.id}>
                    <td><Link to={{pathname:'/authors/'+author.id}}>{author.id}</Link></td>
                    <td>{author.firstName} {author.lastName}</td>
                    <td><button type="button" className="btn btn-danger" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</button></td>
                </tr>
            );
        };
        return (
            <div className="col-sm-6">
                <ToastContainer ref="container" toastMessageFactory={ToastMessageFactory} className="toast-top-right" />
                <table className="table">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th><Link to="addAuthor" className="btn btn-primary">Add Author</Link></th>
                    </tr>
                    {this.props.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AuthorList;
