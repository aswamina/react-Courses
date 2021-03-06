"use strict";

var React = require('react');

var textInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
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
                    <input
                        type="text"
                        name={this.props.name}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        ref={this.props.name}
                        onChange={this.props.onChange}
                        value={this.props.value}
                    />
                </div>
                <div className="input">{this.props.errors}</div>
            </div>
        );
    }
});

module.exports = textInput;
