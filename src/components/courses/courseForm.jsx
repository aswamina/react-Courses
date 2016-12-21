"use strict";

var React = require('react');
var TextInput = require('../common/textInput.jsx');
var SelectInput = require('../common/selectInput.jsx');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        authors: React.PropTypes.array.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },
    render: function() {
        return(
           <form>
                <TextInput name="title" label="Title" value={this.props.course.title} onChange={this.props.onChange} errors={this.props.errors.title} />
                <SelectInput name="author" label="Authors" authors={this.props.authors} onChange={this.props.onChange} errors={this.props.errors.author} />
                <TextInput name="category" label="Category" value={this.props.course.category} onChange={this.props.onChange} errors={this.props.errors.category} />
                <TextInput name="length" label="Length" value={this.props.course.length} onChange={this.props.onChange} errors={this.props.errors.length} />
                <br></br>
                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
           </form>
        );
    }
});

module.exports = CourseForm;
