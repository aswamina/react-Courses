"use strict";

var React = require('react');

var selectInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        error: React.PropTypes.string
    },
    render: function() {
        var createOptionRow = function(author) {
            return (
                <option key={author.id} label={author.id}>{author.firstName + " " + author.lastName}</option>
            );
        };
        var wrapperClass = 'form-group';
        if (this.props.errors && this.props.errors.length > 0) {
            wrapperClass += " " + 'has-error';
        }
        return (
            <div className={wrapperClass}>
               <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select className="form-control" name={this.props.name} onChange={this.props.onChange} defaultValue="">
                        <option value="" disabled>Select...</option>
                        {this.props.authors.map(createOptionRow, this)}
                    </select>
                </div>
                <div className="input">{this.props.errors}</div>
            </div>
        );
    }
});

module.exports = selectInput;






