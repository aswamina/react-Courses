"use strict";

var React = require('react');
var CourseStore = require('../../stores/courseStore.jsx');
var CourseList = require('./courseList.jsx');

var Courses = React.createClass({
    getInitialState: function() {
        return {
            courses: CourseStore.getAllCourses()
        };
    },
    render: function() {
        return (
            <div>
                <h1>Courses</h1>
                <CourseList courses={this.state.courses}></CourseList>
            </div>
        );
    }
});

module.exports = Courses;
