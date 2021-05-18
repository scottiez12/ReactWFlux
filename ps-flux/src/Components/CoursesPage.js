import React, { useState, useEffect } from "react";

//dont need this anymore because we're going to implement our flux store
//import { getCourses } from "../api/courseApi";

import courseStore from "../stores/courseStore";

import CourseList from "./CourseList";
import { Link } from "react-router-dom";

//need to load courses if this page is getting loaded for the first time, since the original state is an empty array
import { loadCourses } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses);

  useEffect(() => {
    //implement addChangeListener() to subscribe to courseStore
    courseStore.addChangeListener(onChange);
    //this is using api, update this to use flux store
    //getCourses().then((_courses) => setCourses(_courses));
    //this effectively says "if courses change, get courses" so we move this line of code down to our onChange method so we can use the addChangeListener for our Flux store
    //setCourses(courseStore.getCourses());

    //so no we need to check if there is any courses loaded, and if not, call our loadCourses action to initialize that first data set instead of an empty array
    if (courseStore.getCourses().length === 0) loadCourses();
    //so we need to clean the component up when it unmounts by returning a function (via useEffect syntax...)
    //so we add the change listener when we mount, check to see if there's courses loaded yet, if not, we load them, then we remove the change listener to unmount
    //FLUX lifecycle....
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} />
    </>
  );
}

export default CoursesPage;
