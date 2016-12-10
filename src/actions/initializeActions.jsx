"use strict";

var Dispatcher = require('../dispatcher/appDispatcher.jsx');
var ActionTypes = require('../constants/actionTypes.jsx');
var AuthorAPI = require('../api/authorAPI.jsx');

var InitializeActions = {
    initApp: function() {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorAPI.getAllAuthors()
            }
        });
    }
};

module.exports = InitializeActions;
