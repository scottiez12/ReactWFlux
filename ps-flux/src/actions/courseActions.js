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
      actionType: actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}
