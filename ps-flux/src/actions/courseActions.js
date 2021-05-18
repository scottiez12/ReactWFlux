import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

//this whole function is an action creater
export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    //so.. "hey dispatcher, go tell all the stores that a course was just created."
    dispatcher.dispatch({
      //this is the actual action
      //action types get stored in a constants file
      //so we need to make sure this save knows the difference between update course and create course...
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then((courses) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      course: courses,
    });
  });
}

export function deleteCourse(id) {
  //step 2 - call the action
  debugger;
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id,
    });
  });
}
