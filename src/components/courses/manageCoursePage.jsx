"use strict";

var React = require('react');
var ReactToastr = require('react-toastr');
var ToastContainer = ReactToastr.ToastContainer; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

var CourseForm = require('./courseForm.jsx');
var CourseActions = require('../../actions/courseActions.jsx');
var CourseStore = require('../../stores/courseStore.jsx');

var ManageCoursePage = React.createClass({
    getInitialState: function() {
        return {
            course: {
                id:'',
                title:'',
                author: {name: "", id: ""},
                category: '',
                length:''
            },
            authors: CourseStore.getAllAuthors(),
            errors: {},
            isSaved: false
        };
    },
    componentWillMount: function() {
        var courseId = this.props.params.id;

        if (courseId) {
            this.setState({
                course: CourseStore.getCourseById(courseId)
            });
        }
    },
    routerWillLeave: function(nextLocation) {
        // return false to prevent a transition w/o prompting the user,
        // or return a string to allow the user to decide:
        if (!this.state.isSaved) {
            return 'Your work is not saved! Are you sure you want to leave?';
        }
    },
    componentDidMount: function() {
        this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    },
    setCourseState: function(event) {
        var field=event.target.name;
        var value=event.target.value;

        if (field === "author") {
            var authorIndex=event.target.selectedIndex - 1;
            this.state.course[field] = {
                name: value,
                id: this.state.authors[authorIndex].id
            }
        } else {
            this.state.course[field] = value;
        }

        return this.setState({course: this.state.course, isSaved: false});
    },
    isCourseFormValid: function() {
        var formValid = true;
        this.state.errors = {};

        if (this.state.course.title.length == 0) {
            this.state.errors.title = "Title cannot be empty";
            formValid = false;
        }

        if (this.state.course.author.name.length == 0) {
            this.state.errors.author = "Author cannot be empty";
            formValid = false;
        }

        if (this.state.course.category.length == 0) {
            this.state.errors.category = "Category cannot be empty";
            formValid = false;
        }

        if (this.state.course.length.length == 0) {
            this.state.errors.length = "Length cannot be empty";
            formValid = false;
        }

        this.setState({errors: this.state.errors});

        return formValid;
    },
    saveCourse: function(event) {
        event.preventDefault();
        if (!this.isCourseFormValid()) {
            return;
        }

        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }

        this.sendFormData();
    },
    addAlert: function(message, condition) {
        this.refs.container.success(message, condition, {
            closeButton: true,
            handleOnClick: function() {
                //window.location.href = '/authors';
            }
        });
    },
    sendFormData: function () {
        var _alert = this;
        var postUrl = '/postCourse';

        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.course.id,
                title: this.state.course.title,
                author: this.state.course.author,
                category: this.state.course.category,
                length: this.state.course.length
            })
        }).then(function(responseObj) {
            if (responseObj.status === 200) {
                _alert.setState({isSaved: true});
                _alert.addAlert('Course Added', 'Success');
            } else if (responseObj.status > 400) {
                _alert.addAlert('Failed post to: ' + postUrl + ' - ' + responseObj.statusText, 'Error');
            }
        }).catch(function(err) {
	       _alert.addAlert('Failed to add Course', 'Error');
        });
    },
    render: function() {
       return (
            <div>
                <ToastContainer ref="container" toastMessageFactory={ToastMessageFactory} className="toast-top-right" />
                <h1>Manage Course Page</h1>
                <CourseForm course={this.state.course} authors={this.state.authors} onChange={this.setCourseState} onSave={this.saveCourse} errors={this.state.errors} />
            </div>
       );
    }
});

module.exports = ManageCoursePage;

