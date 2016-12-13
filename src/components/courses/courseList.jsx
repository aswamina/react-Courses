"use strict";

var React = require('react');
var Link = require('react-router').Link;
var ReactToastr = require('react-toastr');
var ToastContainer = ReactToastr.ToastContainer; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


var CourseList = React.createClass({
    propTypes: {
      courses: React.PropTypes.array.isRequired
    },
    render: function() {
        var createCourseRow = function(course) {
            return (
                <tr key={course.id}>
                    <td><Link to={{pathname:'/courses/'+course.id}}>{course.id}</Link></td>
                    <td>{course.title}</td>
                    <td>{course.author.name}</td>
                    <td>{course.category}</td>
                    <td>{course.length}</td>
                </tr>
            );
        };
        return (
            <div className="col-sm-10">
                <ToastContainer ref="container" toastMessageFactory={ToastMessageFactory} className="toast-top-right" />
                <table className="table">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Length</th>
                        <th><Link to="addCourse" className="btn btn-primary">Add Course</Link></th>
                    </tr>
                    {this.props.courses.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CourseList;
