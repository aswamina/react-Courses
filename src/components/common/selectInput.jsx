"use strict";

var React = require('react');
var Select = require('react-select');

var selectInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        options: React.PropTypes.array,
        error: React.PropTypes.string
    },
    render: function() {
        var wrapperClass = 'form-group';
        if (this.props.errors && this.props.errors.length > 0) {
            wrapperClass += " " + 'has-error';
        }
        return (
            <div className={wrapperClass}>
               <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <Select
                        name={this.props.name}
                        options={this.props.options}
                        onChange={this.props.onChange}
                    />
                </div>
                <div className="input">{this.props.errors}</div>
            </div>
        );
    }
});

module.exports = selectInput;






