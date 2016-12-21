"use strict";

var React = require('react');
var Link = require('react-router').Link;
var ReactToastr = require('react-toastr');
var ToastContainer = ReactToastr.ToastContainer; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

var CourseActions = require('../../actions/courseActions.jsx');

var CourseList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },
    watchCourse: function(url, event) {
        event.preventDefault();
        this.refs.container.success('Click to leave site and open course in a new tab ...',
                                    'Success',
                                    {
                                        closeButton: true,
                                        handleOnClick: function () {
                                            window.open(url,'_blank');
                                        }
                                    });
    },
    deleteCourse: function(id, event) {
        event.preventDefault();
        CourseActions.deleteCourse(id);
        this.refs.container.success('Course Deleted', 'Success', { closeButton: true });
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
                    <td><button type="button" className="btn btn-info" onClick={this.watchCourse.bind(this, course.watchHref)}>Watch</button></td>
                    <td><button type="button" className="btn btn-danger" onClick={this.deleteCourse.bind(this, course.id)}>Delete</button></td>
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
