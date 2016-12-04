"use strict";

var React = require('react');
var TextInput = require('../common/textInput.jsx');

var AuthorForm = React.createClass({
   render: function() {
       return(
           <form>
               <TextInput
                   name="firstName"
                   label="First Name"
                   value={this.props.author.firstName}
                   onChange={this.props.onChange}
                />

               <TextInput
                   name="lastName"
                   label="Last Name"
                   value={this.props.author.lastName}
                   onChange={this.props.onChange}
               />

               <br></br>

               <input
                   type="submit"
                   value="Save"
                   className="btn btn-default"
                   onClick={this.props.onSave}
                />
           </form>
       );
   }
});

module.exports = AuthorForm;
