"use strict";

var Dispatcher = require('../dispatcher/appDispatcher.jsx');
var AuthorAPI = require('../api/authorAPI.jsx');
var ActionTypes = require('../constants/actionTypes.jsx');

var AuthorActions = {
    createAuthor: function (author) {
        var newAuthor = AuthorAPI.saveAuthor(author);

        // Dispatcher to tell all the registered stores that an author has been created
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        })
    },
    updateAuthor: function (author) {
        var updatedAuthor = AuthorAPI.saveAuthor(author);

        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_AUTHOR,
            author: updatedAuthor
        })
    },
    deleteAuthor: function(id) {
        AuthorAPI.deleteAuthor(id);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_AUTHOR,
            id: id
        });
    }
};

module.exports = AuthorActions;
