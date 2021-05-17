import React, { useState } from "react";
import CourseForm from "./CourseForm";
// import { Prompt } from "react-router-dom";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";
const ManageCoursePage = (props) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

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

  function handleSubmit(event) {
    event.preventDefault();
    courseApi.saveCourse(course).then(() => {
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
      />
    </>
  );
};

export default ManageCoursePage;
