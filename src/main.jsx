"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var browserHistory = require("react-router").browserHistory;
var routes = require('./routes.jsx');

ReactDOM.render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
)



/*
Router.run(routes, function(Handler) {
    ReactDOM.render(<Handler/>, document.getElementByID('app'));
});
*/

/*
(function(win) {
    "use strict";


    function render() {
        var route = win.location.hash.substr(1);
        ReactDOM.render(<App route={route}/>, document.getElementById('app'));
    }

    win.addEventListener('hashchange', render);
    render();
})(window);
*/
// ReactDOM.render(<App/> , document.getElementById('app'));
