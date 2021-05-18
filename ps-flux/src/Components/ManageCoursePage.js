import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
// import { Prompt } from "react-router-dom";

//we no longer need this courseApi reference, because the courseStore has all those methods now
//import * as courseApi from "../api/courseApi";
//so instead we import the course store
import courseStore from "../stores/courseStore";

//import flux actions courseActions
import * as courseActions from "../actions/courseActions";

import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  //store courses in state so if someone reloads it doesn't crash
  const [courses, setCourses] = useState(courseStore.getCourses);
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  //state for getting the data from the apis
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; //from the path '/course/:slug'
    //so if courses isn't populated, then we call the load courses
    //in which case the dependency array has a change, so useEffect runs again, this time seeing a slug in the url, so it knows which course to load
    //this makes sure that if the page is loaded directly, we get the expected result.
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      //so now this state () changes from using the courseApi to the store
      //courseApi.getCourseBySlug(slug).then((_course) => setCourse(_course));
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
    //this below is the dependency array of useEffect...
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  //so yeah it would be really tough if we had to do this for every single value in a form.. or a bunch of forms..
  //so we modify basically this below change handler to use on all inputs
  function handleTitleChange(event) {
    const updatedCourse = { ...course, title: event.target.value };
    setCourse(updatedCourse);
  }

  function handleChange(event) {
    //so by using the name convention on all your form inputs, then using this below, JS will assign the values to whatever the "name" attribute is
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required.";
    if (!course.authorId) _errors.authorId = "Author Id is required.";
    if (!course.category) _errors.category = "Category is required.";

    setErrors(_errors);
    //so the form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    //instead of calling the Api, we call the saveCourse flux action from courseAction
    //so we need to import courseActions
    //courseApi.saveCourse(course).then(() => {
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved!");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      {/* <Prompt when={true} message="Are you sure you want to leave?" />  */}
      {/* {props.match.params.slug} */}
      {/* <CourseForm course={course} onChange={handleTitleChange} /> */}
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default ManageCoursePage;
